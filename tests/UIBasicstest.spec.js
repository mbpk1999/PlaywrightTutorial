const {test, expect} = require('@playwright/test');

test('BrowserCheck', async ({browser}) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(await page.title());
    console.log(await page.url());
})

test('DefaultPage', async ({page}) => {
    await page.goto('https://google.com/');
    console.log(await page.title());
    await expect(page).toHaveTitle('Google');
    console.log(await page.url());
    //await page.pause();
})

test.only('InvalidLoginTest', async ({browser}) =>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log('Page Title:', await page.title());

    await page.locator('#username').fill('rahulshetty');
    await page.locator("input[name='password']").fill('learning');
    await page.locator('#terms').check();
    await page.locator('#signInBtn').click();
    
    console.log(await page.locator("div[style*='block']").textContent());
    await expect(page.locator("div[style*='block']")).toContainText('Incorrect');
})