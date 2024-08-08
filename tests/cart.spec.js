const { test, expect } = require('@playwright/test');
const { Login, Inventory } = require('../pages/')

test('Open empty cart', async() => {
    await page.goto('/')
    const login = new Login(page)
    const inventory = new Inventory(page)

    login.login(process.env.STANDARD, process.env.PASSWORD)
    await expect(inventory.inventoryContainer).toBeVisible()
    await inventory.shoppingCart.click()
    
});
test.describe('Inventory page', () =>{
    test.beforeEach(async({page}) => {
        await page.goto('/')
        const login = new Login(page)
        const inventory = new Inventory(page)

        login.login(process.env.STANDARD, process.env.PASSWORD)
        await expect(inventory.inventoryContainer).toBeVisible()
        await inventory.addAllItemsToCart.addAllItemsToCart()
        await inventory.shoppingCart.click()
    })

    test('check if', () => {
        
    });
})