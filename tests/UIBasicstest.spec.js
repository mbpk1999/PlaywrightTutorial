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

test('InvalidLoginTest', async ({browser}) =>
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

test('ValidLoginTest', async ({browser}) =>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log('Page Title:', await page.title());
    await page.locator('#username').fill('rahulshettyacademy');
    await page.locator("input[name='password']").fill('Learning@830$3mK2');
    await page.locator('#terms').check();
    await page.locator('#signInBtn').click();
    await expect(page).toHaveURL('https://rahulshettyacademy.com/angularpractice/shop');
})

test.only('ExtractMultipleElements', async ({page}) =>
{
    const username = page.locator('#username');
    const password = page.locator("input[name='password']");
    const terms = page.locator('#terms');
    const signInBtn = page.locator('#signInBtn');
    const cardTitles = page.locator('.card-body a');

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
     console.log('Page Title:', await page.title());
    await username.fill('rahulshettyacademy');
    await password.fill('Learning@830$3mK2');
    await terms.check();
    await signInBtn.click();
    await expect(page).toHaveURL('https://rahulshettyacademy.com/angularpractice/shop');
    console.log('First Card Title:', await cardTitles.first().textContent());
    console.log('All Card Titles:');
    console.log(await cardTitles.allTextContents());
})