const {test, expect} = require('@playwright/test');

test('RegisterUser', async ({browser}) => {
    const context = await browser.newContext();
    const page  = await context.newPage();

    const RegisterUserLink = page.locator('.text-reset');
    const FirstName = page.locator("input[placeholder='First Name']");
    const LastName = page.locator("input[placeholder='Last Name']");
    const Email = page.locator('#userEmail');
    const Phno = page.locator('#userMobile');
    const OccupationDD = page.locator("[formcontrolname='occupation']");
    const MaleGenderRadio = page.locator("[value='Male']");
    const FemaleGenderRadio = page.locator("[value='Female']");
    const Password = page.locator('#userPassword');
    const ConfirmPassword = page.locator('#confirmPassword');
    const AgeCheckbox = page.locator("[type='checkbox']");
    const RegisterBtn = page.locator("[type='submit']");
    const SuccessMsg = page.locator('h1.headcolor');
    const TempLoginButton = page.locator("button[tabindex='0']");
    const LoginButton = page.locator('#login');


    await page.goto('https://rahulshettyacademy.com/client');
    await RegisterUserLink.click();
    await FirstName.fill('Gojo');
    await LastName.fill('Satoru');
    await Email.fill('gojo.satoru1@example.com');
    await Phno.fill('1234567890');
    await OccupationDD.selectOption('Engineer');
    await page.pause();
    await MaleGenderRadio.click();
    await Password.fill('Password123');
    await ConfirmPassword.fill('Password123');
    await AgeCheckbox.click();
    await RegisterBtn.click();

    console.log('Message:', await SuccessMsg.textContent());
    expect(await SuccessMsg.textContent()).toContain('Account Created Successfully');
    await TempLoginButton.click();

    await Email.fill('gojo.satoru@example.com');
    await Password.fill('Password123');
    await LoginButton.click();
    await expect(page).toHaveURL('https://rahulshettyacademy.com/client/#/dashboard/dash');
});


test('ExistingUserError', async ({browser}) => {
    const context = await browser.newContext();
    const page  = await context.newPage();

    const RegisterUserLink = page.locator('.text-reset');
    const FirstName = page.locator("input[placeholder='First Name']");
    const LastName = page.locator("input[placeholder='Last Name']");
    const Email = page.locator('#userEmail');
    const Phno = page.locator('#userMobile');
    const OccupationDD = page.locator("[formcontrolname='occupation']");
    const MaleGenderRadio = page.locator("[value='Male']");
    const FemaleGenderRadio = page.locator("[value='Female']");
    const Password = page.locator('#userPassword');
    const ConfirmPassword = page.locator('#confirmPassword');
    const AgeCheckbox = page.locator("[type='checkbox']");
    const RegisterBtn = page.locator("[type='submit']");
    const AlertMsg = page.locator("div[role='alert']");

    await page.goto('https://rahulshettyacademy.com/client');
    await RegisterUserLink.click();
    await FirstName.fill('Gojo');
    await LastName.fill('Satoru');
    await Email.fill('gojo.satoru@example.com');
    await Phno.fill('1234567890');
    await OccupationDD.selectOption('Engineer');
    //await page.pause();
    await MaleGenderRadio.click();
    await Password.fill('Password123');
    await ConfirmPassword.fill('Password123');
    await AgeCheckbox.click();
    await RegisterBtn.click();

    await expect(AlertMsg).toBeVisible();
    console.log('Alert Message:', await AlertMsg.textContent());
});

test('LoginTest', async ({page}) => {

     const Email = page.locator('#userEmail');
     const Password = page.locator('#userPassword');
     const LoginButton = page.locator('#login');

    await page.goto('https://rahulshettyacademy.com/client');
    await Email.fill('gojo.satoru@example.com');
    await Password.fill('Password123');
    await LoginButton.click();
    await expect(page).toHaveURL('https://rahulshettyacademy.com/client/#/dashboard/dash');

});

test.only('DynamicElementWait', async ({page}) => {

     const Email = page.locator('#userEmail');
     const Password = page.locator('#userPassword');
     const LoginButton = page.locator('#login');
     const CardTitles = page.locator('.card-body b');

    await page.goto('https://rahulshettyacademy.com/client');
    await Email.fill('gojo.satoru@example.com');
    await Password.fill('Password123');
    await LoginButton.click();
    await expect(page).toHaveURL('https://rahulshettyacademy.com/client/#/dashboard/dash');
    await CardTitles.first().waitFor();
    console.log('All Card Titles:' , await CardTitles.allTextContents());

});

test('DynamicAPIWait', async ({page}) => {

     const Email = page.locator('#userEmail');
     const Password = page.locator('#userPassword');
     const LoginButton = page.locator('#login');
     const CardTitles = page.locator('.card-body b');

    await page.goto('https://rahulshettyacademy.com/client');
    await Email.fill('gojo.satoru@example.com');
    await Password.fill('Password123');
    await LoginButton.click();
    await expect(page).toHaveURL('https://rahulshettyacademy.com/client/#/dashboard/dash');
    await page.waitForLoadState('networkidle');
    console.log('All Card Titles:' , await CardTitles.allTextContents());

});