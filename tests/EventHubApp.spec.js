import {test, expect} from '@playwright/test';

test('Register User', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://eventhub.rahulshettyacademy.com/login');
    await page.locator('text=Register').click();
    await expect(page).toHaveURL('https://eventhub.rahulshettyacademy.com/register');
    await page.getByPlaceholder('you@email.com').fill('gojo.sataru@example.com');
    await page.locator('#register-password').fill('Password@123');
    const metGuidelines = page.locator(
        '#password-guidelines li:has(path[d="M5 13l4 4L19 7"])'
    );
    const unmetGuidelines = page.locator(
        '#password-guidelines li:has(path[d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0-8 0"])'
    );

    await expect(metGuidelines).toHaveCount(4);
    await expect(unmetGuidelines).toHaveCount(0);
    await page.getByPlaceholder('Repeat your password').fill('Password@123');
    await page.getByRole('button', { name: 'Create Account' }).click();
    await expect(page).toHaveURL('https://eventhub.rahulshettyacademy.com/');


    await context.close();
});

test('Login User', async ({ page }) => {
    await page.goto('https://eventhub.rahulshettyacademy.com/login');
    await page.getByPlaceholder('you@email.com').fill('gojo.sataru@example.com');
    await page.getByPlaceholder('••••••').fill('Password@123');
    await page.getByRole('button').click();
    await expect(page).toHaveURL('https://eventhub.rahulshettyacademy.com/');
    await expect(page.locator('#user-email-display')).toHaveText('gojo.sataru@example.com');
});

test('Create Event', async ({ page }) => {
    // Login User
    await page.goto('https://eventhub.rahulshettyacademy.com/login');
    await page.getByPlaceholder('you@email.com').fill('gojo.sataru@example.com');
    await page.getByPlaceholder('••••••').fill('Password@123');
    await page.getByRole('button').click();
    await expect(page).toHaveURL('https://eventhub.rahulshettyacademy.com/');
    await expect(page.locator('#user-email-display')).toHaveText('gojo.sataru@example.com');

    await page.getByRole('button', { name: 'Explore All Events' }).click();
    await page.locator('button:has-text("Add New Event")').click();
    await page.getByLabel('Title').fill('Playwright Test Event');
    await page.locator('textarea').fill('This is a test event created using Playwright.');
    await page.locator('#category').selectOption('Workshop');
    await page.getByLabel('city').fill('Test City');
    await page.getByLabel('venue').fill('Test Venue');
    await page.locator("input[id='event-date-&-time']").fill('2026-11-25T15:44');
    await page.locator("input[id^='price']").fill('50');
    await page.locator("input[id='total-seats']").fill('100');
    await page.getByRole('button', { name: 'Add Event' }).click();
    await expect(page.locator("div.overflow-hidden p")).toBeVisible();
    await expect(page.locator("div.overflow-hidden p")).toHaveText('Event created!');
    await page.locator('a span').click();
    await expect(page.locator('article div a h3').filter({ hasText: 'Playwright Test Event' })).toBeVisible();

})

test.only('Login and Create Event and Book an Event', async ({ page }) => {
    const username = 'Gojo Sataru';
    const URL = 'https://eventhub.rahulshettyacademy.com/login';
    const email = 'gojo.sataru@example.com';
    const password = 'Password@123';
    const eventName = 'Playwright Test Event1';
    const eventDescription = 'This is a test event created using Playwright.';
    const category = 'Workshop';
    const city = 'Test City';
    const venue = 'Test Venue';
    const eventDate = '2026-11-25T15:44';
    const price = '50';
    const seats = '100';
    const ticketCount = 4;
    const phno = '1234567890';
    await loginUser(page, URL, email, password);
    await createEvent(page, eventName, eventDescription, category, city, venue, eventDate, price, seats);
    await page.locator('article div a h3').filter({ hasText: eventName}).click();
    const ticketDisplay = page.locator('#ticket-count');
    const addTicketButton = page.getByRole('button', {name: '+' });
    let currentCount = Number(await ticketDisplay.innerText());
    while(currentCount < ticketCount)
    {
        await addTicketButton.click();
        currentCount +=1;
        await expect(ticketDisplay).toHaveText(String(currentCount));
    }
    await expect(ticketDisplay).toHaveText(String(ticketCount));

    await page.locator('#customerName').fill(username);
    await page.locator('#customer-email').fill(email);
    await page.locator('#phone').fill(phno);
    await page.getByRole('button', {name : 'Confirm Booking'}).click();
    await expect(page.locator('div h3.text-xl')).toContainText('Booking Confirmed!');
    await page.getByRole('button', { name: 'View My Bookings' }).click();
    await expect(page.locator('#booking-card').filter({ hasText: eventName }).locator('span.bg-emerald-100')).toHaveText('confirmed');
    await page.locator('a span').click();
    await page.locator('article div a h3').filter({ hasText: eventName }).click();
    await page.locator('div p').first().waitFor();
    await page.reload();
    await page.waitForTimeout(5000);
    await page.reload();
    const availableSeats = await page.locator('div p').filter({hasText: /seats$/}).textContent();
    const availableSeatsCount = Number(availableSeats.trim().split(" ")[0]);
    console.log(availableSeats+ "Available Seats: "+availableSeatsCount);
    expect(availableSeatsCount).toBe(Number(seats) - ticketCount);

});


async function loginUser(page, URL, email, password) {
    await page.goto(URL);
    await page.getByPlaceholder('you@email.com').fill(email);
    await page.getByPlaceholder('••••••').fill(password);
    await page.getByRole('button').click();
    await expect(page).toHaveURL('https://eventhub.rahulshettyacademy.com/');
    await expect(page.locator('#user-email-display')).toHaveText('gojo.sataru@example.com');
};

async function createEvent(page, eventName, eventDescription, category, city, venue, date, price, seats) {

    await page.getByRole('button', { name: 'Explore All Events' }).click();
    await page.locator('button:has-text("Add New Event")').click();
    await page.getByLabel('Title').fill(eventName);
    await page.locator('textarea').fill(eventDescription);
    await page.locator('#category').selectOption(category);
    await page.getByLabel('city').fill(city);
    await page.getByLabel('venue').fill(venue);
    await page.locator("input[id='event-date-&-time']").fill(date);
    await page.locator("input[id^='price']").fill(price);
    await page.locator("input[id='total-seats']").fill(seats);
    await page.getByRole('button', { name: 'Add Event' }).click();
    await expect(page.locator("div.overflow-hidden p")).toBeVisible();
    await expect(page.locator("div.overflow-hidden p")).toHaveText('Event created!');
    await page.locator('a span').click();
    await expect(page.locator('article div a h3').filter({ hasText: eventName })).toBeVisible();
}