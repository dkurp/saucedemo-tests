const { test, expect } = require('@playwright/test');
const { Login, Inventory } = require('../pages/')

test.describe('Inventory page elements check', () =>{
    test.beforeEach(async({page}) => {
        await page.goto('/')
        const login = new Login(page)
        const inventory = new Inventory(page)

        login.login(process.env.STANDARD, process.env.PASSWORD)
        await expect(inventory.inventoryContainer).toBeVisible()
    })

    test('6 elements are present', async({page}) =>{
        const inventory = new Inventory(page)

        const count = await inventory.inventoryItem.count()

        expect(count).toEqual(6)
    })

})