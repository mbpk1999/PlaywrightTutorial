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

test('ExtractMultipleElements', async ({page}) =>
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

test('LoginTestRadioBtn', async ({browser}) =>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log('Page Title:', await page.title());
    await page.locator('#username').fill('rahulshettyacademy');
    await page.locator("input[name='password']").fill('Learning@830$3mK2');
    await page.locator('.radiotextsty').nth(1).click();
    await page.locator('#okayBtn').click();
    console.log('Is Radio Button Selected:' , await page.locator('.radiotextsty').nth(1).isChecked());
    await page.locator("select[data-style='btn-info']").selectOption('Teacher');
    await page.pause();
    expect(await page.locator('#terms').isChecked()).toBeFalsy();
    await page.locator('#terms').check();
    console.log('Is Terms checked:' , await page.locator('#terms').isChecked());
    await page.locator('#signInBtn').click();
    await expect(page).toHaveURL('https://rahulshettyacademy.com/angularpractice/shop');
})

test('Check Blinking Text', async ({page}) =>
{
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const AllBlinkingTexts = page.locator('.float-right a');
    await AllBlinkingTexts.first().waitFor();
    for (const BlinkingText of await AllBlinkingTexts.all())
    {
        console.log('Blinking Text:', await BlinkingText.textContent());
        expect(BlinkingText).toHaveClass('blinkingText');
        expect(BlinkingText).toHaveAttribute('class', 'blinkingText');
    }
})

test.only('Child Window Handling', async ({browser}) =>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        page.locator("[href*='document']").click()
    ]);

    console.log('Child Window Title:', await newPage.title());
    const textInChildWindow = await newPage.locator('p.red').textContent();
    console.log('Text in Child Window:', textInChildWindow);
    const ExtractedEmail = textInChildWindow.split('@')[1].split(' ')[0];
    console.log('Extracted Email:', ExtractedEmail);

    await page.locator('#username').fill(ExtractedEmail.split('.')[0]);
    console.log('Username Filled:', await page.locator('#username').inputValue());
    await page.locator("input[name='password']").fill('Learning@830$3mK2');
    console.log('Password Filled:', await page.locator("input[name='password']").inputValue());
    await page.locator('#terms').check();
    await page.locator('#signInBtn').click();
    await expect(page).toHaveURL('https://rahulshettyacademy.com/angularpractice/shop');
})
