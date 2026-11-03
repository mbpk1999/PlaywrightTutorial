import {test, expect} from '@playwright/test';

test.only('ShoppingE2E', async ({page}) => {

    // Login to the application
     const Email = page.locator('#userEmail');
     const Password = page.locator('#userPassword');
     const LoginButton = page.locator('#login');

    await page.goto('https://rahulshettyacademy.com/client');
    await Email.fill('gojo.satoru@example.com');
    await Password.fill('Password123');
    await LoginButton.click();
    await expect(page).toHaveURL('https://rahulshettyacademy.com/client/#/dashboard/dash');

    // Add product to cart
    await page.waitForLoadState('networkidle');
    await page.locator('.container .card-body').first().waitFor();
    const CardItems = page.locator('.container .card-body');
    console.log('All Card Titles:' , await CardItems.locator('b').allTextContents());
    const SearchItem = 'iphone 13 pro';
    const count = await CardItems.count();
    for(let i=0; i<count; i++)
    {
        const cardTitle = await CardItems.nth(i).locator('b').textContent();
        if(cardTitle.trim() === SearchItem)
        {
            await CardItems.nth(i).locator('text= Add To Cart').click();
            break;
        }
    }

    // Go to cart and verify the product is added
    await page.locator('[routerlink*="cart"]').click();
    await page.locator('div li').first().waitFor();
    const cartItemCheck = await page.locator('h3:has-text("iphone 13 pro")').isVisible();
    console.log('Cart Item Check:', cartItemCheck);
    expect(cartItemCheck).toBeTruthy();
    await page.locator('text=Checkout').click();

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
    await page.locator("[placeholder*='Country']").pressSequentially("Ind");
    await page.locator('section .ta-item').first().waitFor();
    const CountryList = await page.locator('section .ta-item').all();
    for(const country of CountryList)
    {
        const countryName = await country.textContent();
        if(countryName.trim() === 'India')
        {
            await country.click();
            break;
        }
    }
    await page.locator('text=Place Order').click();
    await page.pause();

});


test('ShoppingE2E_Alt', async ({page}) => {

    // Login to the application
     const Email = page.locator('#userEmail');
     const Password = page.locator('#userPassword');
     const LoginButton = page.locator('#login');

    await page.goto('https://rahulshettyacademy.com/client');
    await Email.fill('gojo.satoru@example.com');
    await Password.fill('Password123');
    await LoginButton.click();
    await expect(page).toHaveURL('https://rahulshettyacademy.com/client/#/dashboard/dash');

    // Add list of product to cart
    let SearchItems = ['iphone 13 pro', 'ZARA COAT 3'];
    await page.waitForLoadState('networkidle');
    await page.locator('.container .card-body').first().waitFor();
    const CardItems = page.locator('.container .card-body');
    console.log('All Card Titles:' , await CardItems.locator('b').allTextContents());
    for(const card of await CardItems.all())
    {
        const cardTitle = await card.locator('b').textContent();
        if(SearchItems.includes(cardTitle.trim()))
        {
            await card.locator('text= Add To Cart').click();
            SearchItems = SearchItems.filter(item => item !== cardTitle.trim());
            if(SearchItems.length === 0)
            {
                break;
            }
        }
    }
    await page.pause();

});