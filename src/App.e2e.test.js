import puppeteer from 'puppeteer'
import url from 'url'
import fs from 'fs'
import { toMatchImageSnapshot } from 'jest-image-snapshot'

const timeout = 60000

export function setConfig() {
    return {
        failureThreshold: '0.5',
        failureThresholdType: 'percent',
        customSnapshotsDir: `${__dirname}/__snapshots__/`,
        customSnapshotIdentifier: expect.getState().currentTestName.replace(/\s+/g, '-'),
        noColors: true
    }
}

// Wait until at least one element matches selector and has specified text.
async function waitForElementText(selector, text) {
    await page.waitForFunction(
        (selector, text) => {
            const es = [...document.querySelectorAll(selector)]
            console.log(`Found ${es.length} nodes matching ${selector}`)
            return es.some(e => e.textContent == text)
        },
        { timeout },
        selector,
        text
    )
}

async function screenshot() {
    await page.$eval('.mapboxgl-map', e => e.setAttribute("style", "visibility: hidden"));
    await page.$eval('.loader', e => e.setAttribute("style", "visibility: hidden"));
    return page.screenshot({ fullPage: true });
}

let browser;
let page;

beforeAll(async () => {
    jest.setTimeout(timeout)
    browser = await puppeteer.launch({
        dumpio: true // if true then formidable amount of console logging
    })
    page = await browser.newPage()
    await page.setViewport({ width: 800, height: 1400 })
    expect.extend({ toMatchImageSnapshot })
});

afterAll(async () => browser.close());

describe("App.js", () => {
    if (!fs.existsSync("build")) {
        fail("No build found; 'yarn build-local' first")
    }

    it("no URL: includes Nothing to show", async () => {
        await page.goto("http://localhost:3000/app");
        return waitForElementText('.side-panel > div > h2', "Nothing to show")
    }, timeout);

    it("casualties_100: includes 100 rows", async () => {
        await page.goto("http://localhost:3000/app"
            + "?defaultURL=https://raw.githubusercontent.com/tgve/example-data/main/casualties_100.geojson");
        return waitForElementText('.side-panel > div > h2', "100 rows")
    }, timeout);


    it("wrong URL: includes Nothing to show", async () => {
        await page.goto("http://localhost:3000/app"
            + "?defaultURL=https://wrongurl.fail");
        return waitForElementText('.side-panel > div > h2', "Nothing to show")
    });

    it("check screenshot", async () => {
        await page.goto("http://localhost:3000/app");
        await waitForElementText('.side-panel > div > h2', "Nothing to show")
        const image = await screenshot();
        expect(image).toMatchImageSnapshot(setConfig());
    }, timeout);

    it("check screenshot with data uploaded", async () => {
        await page.goto("http://localhost:3000/app"
            + "?defaultURL=https://raw.githubusercontent.com/tgve/example-data/main/casualties_100.geojson");
        await waitForElementText('.side-panel > div > h2', "100 rows")
        const image = await screenshot();
        expect(image).toMatchImageSnapshot(setConfig());
    }, timeout);

    it("check screenshot with filter", async () => {
        await page.goto("http://localhost:3000/app"
            + "?defaultURL=https://raw.githubusercontent.com/tgve/example-data/main/casualties_100.geojson")
        await waitForElementText('.side-panel > div > h2', "100 rows")
        await waitForElementText('.side-panel-body-content > div > div > div > span', "Slight")

        const xp = "//div[contains(@class, 'side-panel-body-content')]//div"
            + "/span[contains(text(),'Slight')]/.."
        const [e] = await page.$x(xp)
        await e.click()

        const image = await screenshot()
        expect(image).toMatchImageSnapshot(setConfig())
    }, timeout)
})
