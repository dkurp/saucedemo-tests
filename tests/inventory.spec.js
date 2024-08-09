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

    test('Burger menu elements', async({page}) => {
        const inventory = new Inventory(page)

        await inventory.burgerMenu.click()

        await expect(inventory.menuAllItems).toHaveText('All Items')        
        await expect(inventory.menuAbout).toHaveText('About')
        await expect(inventory.menuLogout).toHaveText('Logout')
        await expect(inventory.menuResetApp).toHaveText('Reset App State')
    });

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

        let count = async() => {return await inventory.shoppingCartBadge.innerText()}

        let emptyCart = await inventory.shoppingCartBadge.count()
        await expect(emptyCart).toEqual(0)

        await inventory.cartAddBackpack.click()
        await expect(await count()).toEqual('1')

        await inventory.cartAddJacket.click()
        await expect(await count()).toEqual('2')

        await inventory.cartAddLight.click()
        await expect(await count()).toEqual('3')

        await inventory.cartAddOnesie.click()
        await expect(await count()).toEqual('4')

        await inventory.cartAddTShirt.click()
        await expect(await count()).toEqual('5')

        await inventory.cartAddRed.click()
        await expect(await count()).toEqual('6')
    })
})