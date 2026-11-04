import {test, expect} from '@playwright/test';

test('Playwright Special Locators', async ({page}) => 
{
    
    await page.goto('https://rahulshettyacademy.com/angularpractice/');
    await page.locator("div.form-group input[name='name']").fill('Gojo Satoru');
    await page.locator("div.form-group input[name='email']").fill('GojoSatoru@example.com');
    await page.getByPlaceholder('Password').fill('Password123');
    await page.getByLabel('Check me out if you Love IceCreams!').check();
    await page.getByLabel('Student').check();
    await page.getByLabel('Gender').selectOption('Female');
    await page.getByRole('button', {name: 'Submit'}).click();
    await expect(page.getByText(' The Form has been submitted successfully!.')).toBeVisible({timeout: 10000});

    await page.getByRole('link', {name: 'Shop'}).click();
    await page.locator('app-card-list app-card').filter({hasText: 'Blackberry'}).getByRole('button', {name: 'Add'}).click();
})


test.only('CodegenTest', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/angularpractice/');
  await page.locator('form input[name="name"]').click();
  await page.locator('form input[name="name"]').fill('Gojo');
  await page.locator('input[name="email"]').click();
  await page.locator('input[name="email"]').fill('gojo.sataru@example.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('Password123');
  await page.getByRole('checkbox', { name: 'Check me out if you Love' }).check();
  await page.getByRole('radio', { name: 'Student' }).check();
  await page.locator('input[name="bday"]').fill('2020-01-01');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByText('× Success! The Form has been')).toBeVisible();
  await page.getByRole('link', { name: 'Shop' }).click();
  await page.locator('app-card').filter({ hasText: 'Blackberry $24.99 Lorem ipsum' }).getByRole('button').click();
  await page.getByText('Checkout ( 1 ) (current)').click();
  await page.getByRole('button', { name: 'Checkout' }).click();
  await page.getByRole('textbox', { name: 'Please choose your delivery' }).click();
  await page.getByRole('textbox', { name: 'Please choose your delivery' }).pressSequentially('India');
  await page.getByText('India').click({timeout: 15000});
  await page.getByText('I agree with the term &').click();
  await page.getByRole('checkbox', { name: 'I agree with the term &' }).check();
  await page.getByRole('button', { name: 'Purchase' }).click();
  await expect(page.getByText('× Success! Thank you! Your')).toBeVisible();
});

test('Assertion Timeouts', async ({page}) => 
{
    test.setTimeout(20000);
    const slowexpect = expect.configure({timeout: 12000});
    page.setDefaultTimeout(10000);
    await page.goto('https://rahulshettyacademy.com/angularpractice/');
    await page.locator("div.form-group input[name='name']").fill('Gojo Satoru');
    await page.locator("div.form-group input[name='email']").fill('GojoSatoru@example.com');
    await page.getByPlaceholder('Password').fill('Password123');
    await page.getByLabel('Check me out if you Love IceCreams!').check({timeout: 5000});
    await page.getByLabel('Student').check();
    await page.getByLabel('Gender').selectOption('Female');
    await page.getByRole('button', {name: 'Submit'}).click();
    //Line level TimeOut
    //await expect(page.locator('.my-4')).toHaveText('Shop', {timeout: 10000});
    await expect(page.getByText(' The Form has been submitted successfully!.')).toBeVisible({timeout: 10000});

    await page.getByRole('link', {name: 'Shop'}).click();
    
    await slowexpect(page.locator('h1.my-4')).toContainText('Shop');
    await page.locator('app-card-list app-card').filter({hasText: 'Blackberry'}).getByRole('button', {name: 'Add'}).click();
})

test('E2E Shopping App using Special Locators', async ({page}) =>
{
    //Login to the application
    await page.goto('https://rahulshettyacademy.com/client');
    await page.getByPlaceholder('email@example.com').fill('gojo.satoru@example.com');
    await page.getByPlaceholder('enter your passsword').fill('Password123');
    await page.getByRole('button', {name: 'Login'}).click();

    //Add product to cart
    await page.waitForLoadState('networkidle');
    await page.locator('.row .card').first().waitFor();
    await page.locator('.row .card').filter({hasText: 'ZARA COAT 3'}).getByRole('button', {name: 'Add To Cart'}).click();
    await page.locator('[routerlink*="cart"]').click();

    //Confirm the product is added to cart and proceed to checkout
    await expect(page.getByText('ZARA COAT 3')).toBeVisible();
    await page.getByRole('button', {name: 'Checkout'}).click();

    //Add Payment details and place order
        //Personal Information
    await page.waitForLoadState('networkidle');
    await page.locator('div.field').filter({hasText: 'Credit Card Number '}).locator('input').fill('1234 5678 9012 3456');
    await page.locator('div.field').filter({hasText: 'Expiry Date '}).locator('select').first().selectOption('12');
    await page.locator('div.field').filter({hasText: 'Expiry Date '}).locator('select').last().selectOption('30');
    await page.locator('div.field').filter({hasText: 'CVV Code '}).locator('input').fill('123');
    await page.locator('div.field').filter({hasText: 'Name on Card '}).locator('input').fill('Gojo Satoru');
    await page.locator('div.field').filter({hasText: 'Apply Coupon '}).locator('input').fill('rahulshettyacademy');
    await page.locator('button:has-text("Apply Coupon")').click();
    await page.locator('div.field').filter({hasText: 'Apply Coupon '}).locator('p').waitFor();
    console.log('Coupon Status:', await page.locator('div.field').filter({hasText: 'Apply Coupon '}).locator('p').textContent());
    await expect(page.locator('div.field').filter({hasText: 'Apply Coupon '}).locator('p')).toHaveText('* Coupon Applied');

        //Address Information
    await expect(page.locator(".details__user label")).toHaveText('gojo.satoru@example.com');
    await page.getByPlaceholder('Select Country').pressSequentially("Ind");
    await page.locator('section .ta-item').first().waitFor();
    await page.locator('section .ta-item').filter({hasText: /^ India$/}).click({timeout: 10000});
    await page.locator('text=Place Order').click();

    // Verify order confirmation
    await expect(page.getByText('Thankyou for the order.')).toBeVisible();
    const RawOrderId = await page.locator('.em-spacer-1 .ng-star-inserted').textContent();
    const OrderId = RawOrderId.split('|')[1].trim();
    console.log('Order ID:', OrderId);

    // Go to Orders page and verify the order is listed
    await page.getByText(' Orders History Page ').click();
    await page.locator('table.ng-star-inserted tr').first().waitFor();
    await page.locator('table.ng-star-inserted tbody tr').filter({hasText: OrderId}).getByRole('button', {name: 'View'}).click();
    
    // Validate Order Summary
    await expect(page.locator('.col-md-6 .-main')).toContainText(OrderId);
})