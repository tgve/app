import puppeteer from 'puppeteer'
import url from 'url'
import fs from 'fs'
import { toMatchImageSnapshot } from 'jest-image-snapshot'

export function setConfig(filename) {
    return {
        failureThreshold: '0',
        failureThresholdType: 'percent',
        customSnapshotsDir: `${__dirname}/__snapshots__/`,
        customSnapshotIdentifier: filename,
        noColors: true
    }
}

let browser;
let page;

beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    expect.extend({ toMatchImageSnapshot });
});

describe("App.js", () => {
    if(!fs.existsSync("build")) {
        fail("No build found; 'yarn build-local' first")
    }

    it("no url includes Nothing to show", async () => {
        await page.goto(url.pathToFileURL("build/index.html"),{
            waitUntil: "networkidle0",
        });
        await page.waitForSelector(".side-pane-header");
        const text = await page.$eval(".side-pane-header > h2", (e) => e.textContent);
        expect(text).toContain("Nothing to show")
    });

    it("contains the 100 rows", async () => {
        await page.goto(url.pathToFileURL("build/index.html")
            + "?defaultURL=https://raw.githubusercontent.com/tgve/example-data/main/casualties_100.geojson",{
                waitUntil: "networkidle0",
            });
        await page.waitForSelector(".side-pane-header");
        const text = await page.$eval(".side-pane-header > h2", (e) => e.textContent);
        expect(text).toContain("100 rows")
    });

    it("wrong url includes Nothing to show", async () => {
        await page.goto(url.pathToFileURL("build/index.html")
            + "?defaultURL=https://rongurl.fail",{
                waitUntil: "networkidle0",
            });
        await page.waitForSelector(".side-pane-header");
        const text = await page.$eval(".side-pane-header > h2", (e) => e.textContent);
        expect(text).toContain("Nothing to show")
    });

    it("check screenshot", async () => {
        await page.goto(url.pathToFileURL("build/index.html"), {
            waitUntil: "networkidle0",
            });
        await page.$eval('.mapboxgl-map',e => e.setAttribute("style", "visibility: hidden"));
        await page.$eval('.loader',e => e.setAttribute("style", "visibility: hidden"));
        await page.waitForSelector(".side-pane-header");  
        const image = await page.screenshot({ fullPage: true }); 
        expect(image).toMatchImageSnapshot(setConfig('image-name'));
    });

    
})




afterAll(async () => browser.close());

// mapboxgl-map
//=> e.setAttribute("visibility", "hidden
//await page.$eval(' div.panel-footer > div > div > ul > li:nth-child(3) > a ',e => e.setAttribute("data-page","100"));