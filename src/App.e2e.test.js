import puppeteer from 'puppeteer'
import url from 'url'
import fs from 'fs'
import { toMatchImageSnapshot } from 'jest-image-snapshot'

export function setConfig() {
    return {
        failureThreshold: '0.5',
        failureThresholdType: 'percent',
        customSnapshotsDir: `${__dirname}/__snapshots__/`,
        customSnapshotIdentifier: expect.getState().currentTestName.replace(/\s+/g, '-'),
        noColors: true
    }
}

async function waitForElementText(text,selector) {
    return page.waitForFunction(
        (selector, text) => {
            const e = document.querySelector(selector)
            return e && e.textContent == text
        },
        {},
        selector,
        text
    );
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
        await page.goto(url.pathToFileURL("build/index.html"));
        await page.waitForSelector(".side-pane-header");
        const text = await page.$eval(".side-pane-header > h2", (e) => e.textContent);
        expect(text).toContain("Nothing to show")
    });

    it("contains 100 rows", async () => {
        await page.goto(url.pathToFileURL("build/index.html")
            + "?defaultURL=https://raw.githubusercontent.com/tgve/example-data/main/casualties_100.geojson");
        await waitForElementText("100 rows",'.side-pane-header > h2')
    });

    it("wrong url includes Nothing to show", async () => {
        await page.goto(url.pathToFileURL("build/index.html")
            + "?defaultURL=https://rongurl.fail");
        await page.waitForSelector(".side-pane-header");
        const text = await page.$eval(".side-pane-header > h2", (e) => e.textContent);
        await waitForElementText("Nothing to show",'.side-pane-header > h2')
    });

    it("check screenshot", async () => {
        await page.goto(url.pathToFileURL("build/index.html"));
        await page.setViewport({ width: 600, height: 1000 });
        await page.$eval('.mapboxgl-map',e => e.setAttribute("style", "visibility: hidden"));
        await page.$eval('.loader',e => e.setAttribute("style", "visibility: hidden"));
        await page.waitForSelector(".side-pane-header");
        const image = await page.screenshot({ fullPage: true });
        expect(image).toMatchImageSnapshot(setConfig());
    });

    it("check screenshot with data uploaded", async () => {
        await page.goto(url.pathToFileURL("build/index.html")
        + "?defaultURL=https://raw.githubusercontent.com/tgve/example-data/main/casualties_100.geojson");
        await page.setViewport({ width: 800, height: 1400 });
        await page.$eval('.mapboxgl-map',e => e.setAttribute("style", "visibility: hidden"));
        await page.$eval('.loader',e => e.setAttribute("style", "visibility: hidden"));
        await page.waitForSelector(".side-pane-header");
        const image = await page.screenshot({ fullPage: true });
        expect(image).toMatchImageSnapshot(setConfig());
    });

})


afterAll(async () => browser.close());

// mapboxgl-map
//=> e.setAttribute("visibility", "hidden
//await page.$eval(' div.panel-footer > div > div > ul > li:nth-child(3) > a ',e => e.setAttribute("data-page","100"));