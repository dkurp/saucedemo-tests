const { test, expect } = require('@playwright/test');
const { Login, Inventory } = require('../pages/')

test.describe('Inventory page', () =>{
    test.beforeEach(async({page}) => {
        await page.goto('/')
        const login = new Login(page)
        const inventory = new Inventory(page)

        login.login(process.env.STANDARD, process.env.PASSWORD)
        await expect(inventory.inventoryContainer).toBeVisible()
    })

    test('6 inventory items are present', async({page}) =>{
        const inventory = new Inventory(page)

        const count = await inventory.inventoryItem.count()

        expect(count).toEqual(6)
    })

    test("Sorting elements by name", async({page}) =>{
        const inventory = new Inventory(page)

        const itemTitles = await page.$$eval('.inventory_item_name', items =>
            items.map(item => item.textContent.trim())
        );

        await inventory.sortItems.selectOption('za')

        const itemTitlesZa = await page.$$eval('.inventory_item_name', items =>
            items.map(item => item.textContent.trim())
        );

        //check if sorting descending is working correctly
        await expect(inventory.areArraysReversed(itemTitles, itemTitlesZa)).toBe(true)
    })

    test("Sorting elements by price", async({page}) =>{
        const inventory = new Inventory(page)

        await inventory.sortItems.selectOption('lohi')
        const itemPricesLohi = await page.$$eval('.inventory_item_price', prices =>
            prices.map(price => price.textContent.trim())
        );

        await inventory.sortItems.selectOption('hilo')

        const itemTitlesHilo = await page.$$eval('.inventory_item_price', prices =>
            prices.map(price => price.textContent.trim())
        );

        //check if sorting descending is working correctly
        await expect(inventory.areArraysReversed(itemPricesLohi, itemTitlesHilo)).toBe(true)
    })

    test('Add items to cart', async({page}) =>{
        const inventory = new Inventory(page)

        let emptyCart = await inventory.shoppingCartBadge.count()
        await expect(emptyCart).toEqual(0)

        await inventory.cartAddBackpack.click()
        let add1 = await inventory.shoppingCartBadge.innerText()
        await expect(add1).toEqual('1')

        await inventory.cartAddJacket.click()
        let add2 = await inventory.shoppingCartBadge.innerText()
        await expect(add2).toEqual('2')

        await inventory.cartAddLight.click()
        let add3 = await inventory.shoppingCartBadge.innerText()
        await expect(add3).toEqual('3')

        await inventory.cartAddOnesie.click()
        let add4 = await inventory.shoppingCartBadge.innerText()
        await expect(add4).toEqual('4')

        await inventory.cartAddTShirt.click()
        let add5 = await inventory.shoppingCartBadge.innerText()
        await expect(add5).toEqual('5')

        await inventory.cartAddRed.click()
        let add6 = await inventory.shoppingCartBadge.innerText()
        await expect(add6).toEqual('6')
    })
})