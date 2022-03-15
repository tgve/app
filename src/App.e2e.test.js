import puppeteer from 'puppeteer'
import url from 'url'
import fs from 'fs'
import { toMatchImageSnapshot } from 'jest-image-snapshot'

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
        const text = await page.$eval("h2", (e) => e.textContent);
        expect(text).toContain("Nothing to show")
    });

    it("contains the 100 rows", async () => {
        await page.goto(url.pathToFileURL("build/index.html")
            + "?defaultURL=https://raw.githubusercontent.com/tgve/example-data/main/casualties_100.geojson");
        await page.waitForSelector(".side-pane-header");
        const text = await page.$eval("h2", (e) => e.textContent);
        expect(text).toContain("100 rows")
    });

    it("wrong url includes Nothing to show", async () => {
        await page.goto(url.pathToFileURL("build/index.html")
            + "?defaultURL=https://rongurl.fail");
        await page.waitForSelector(".side-pane-header");
        const text = await page.$eval("h2", (e) => e.textContent);
        expect(text).toContain("Nothing to show")
    });
})

afterAll(async () => browser.close());
