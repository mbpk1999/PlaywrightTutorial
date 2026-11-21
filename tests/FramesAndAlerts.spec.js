const {test, expect} =  require('@playwright/test')


test('NavigationTest', async({page})=>
{
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    await page.goto('https://playwright.dev/docs/input');
    await page.goBack();
    await expect(page).toHaveTitle('Practice Page');
    await page.goForward();
    await expect(page).toHaveTitle('Actions | Playwright');

})


test('ElementVisibleTest', async({page})=>
{
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    await expect(page.locator('#displayed-text')).toBeVisible();
    await page.locator('#hide-textbox').click();
    await expect(page.locator('#displayed-text')).toBeHidden();
})

test('SigleActionAlertsTest', async({page})=>
{
    /*
    page.on() keeps each dialog listener registered. 
    So when the confirm dialog appears, both the old accept() listener and the new dismiss() listener run, 
    causing the “already handled” error.

   I changed both handlers to page.once(), 
   so each applies only to its next dialog
*/
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    page.once('dialog', dialog => dialog.accept());
    await page.locator('#alertbtn').click();
    page.once('dialog', dialog => dialog.dismiss());
    await page.locator('#confirmbtn').click();

})

test('MultipleAlertHandlingusingSingleListener', async({page})=>
{
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    page.on('dialog', dialog => dialog.accept());
    await page.locator('#alertbtn').click();
    await page.locator('#confirmbtn').click();
    await page.pause();
    
})

test('MultiCommandAlertHandling', async({page})=>
{
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');

    const dialog1Promise = page.waitForEvent('dialog');
    const click1Promise = page.locator('#alertbtn').click();
    const dialog1 = await dialog1Promise;

    console.log('Dialog1: '+ dialog1.message());
    await dialog1.accept();
    await click1Promise;

    const dialog2Promise = page.waitForEvent('dialog');
    const click2Promise = page.locator('#confirmbtn').click();
    const dialog2 = await dialog2Promise;

    console.log('Dialog2: '+ dialog2.message());
    await dialog2.dismiss();
    await click2Promise;
})

test('MouseHoverTest', async({page})=>
{
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    await page.locator('#mousehover').hover();
    await expect(page.locator("[href*='top']")).toBeVisible();
    await page.locator("[href*='top']").click();
})

test.only('iFrameTest', async({page})=>
{
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    const iFramePage = page.frameLocator('#courses-iframe');

    await iFramePage.locator("li [href*='lifetime']:visible").click();
    const msg = await iFramePage.locator('.content-side h2').textContent();
    console.log("No. of subscribers: "+msg.trim().split(' ')[1]);

})

