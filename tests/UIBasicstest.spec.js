const {test} = require('@playwright/test');

test('BrowserCheck', async ({browser}) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(await page.title());
    console.log(await page.url());
})

test.only('DefaultPage', async ({page}) => {
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(await page.title());
    console.log(await page.url());
    //await page.pause();
})