import puppeteer from "puppeteer";

describe("App.js", () => {
    let browser;
    let page;

    beforeAll(async () => {
        browser = await puppeteer.launch();
        page = await browser.newPage();
    });

    it("contains the welcome text", async () => {
        await page.goto("http://localhost:3000");
        await page.waitForSelector(".side-pane-header");
        const text = await page.$eval("h2", (e) => e.textContent);
        expect(text).toContain("Nothing to show");
    });

    it("contains the welcome text", async () => {
        await page.goto("http://localhost:3000?defaultURL=https://raw.githubusercontent.com/tgve/example-data/main/casualties_100.geojson");
        await page.waitForSelector(".side-pane-header");
        const text = await page.$eval("h2", (e) => e.textContent);
        expect(text).toContain("100 rows");
    });

    afterAll(() => browser.close());
})
