const { test, expect } = require('@playwright/test');
const { Login, Inventory, Cart } = require('../pages/')


test.describe('Cart page with items in cart', () =>{
    test.beforeEach(async({page}) => {
        await page.goto('/')
        const login = new Login(page)
        const inventory = new Inventory(page)

        login.login(process.env.STANDARD, process.env.PASSWORD)
        await expect(inventory.inventoryContainer).toBeVisible()
        await inventory.shoppingCart.click()
    });

    test('Burger menu elements', async({page}) => {
        const cart = new Cart(page)

        await cart.burgerMenu.click()

        await expect(cart.menuAllItems).toHaveText('All Items')        
        await expect(cart.menuAbout).toHaveText('About')
        await expect(cart.menuLogout).toHaveText('Logout')
        await expect(cart.menuResetApp).toHaveText('Reset App State')
    });
})

test.describe('Cart page with items in cart', () =>{
    test.beforeEach(async({page}) => {
        await page.goto('/')
        const login = new Login(page)
        const inventory = new Inventory(page)

        login.login(process.env.STANDARD, process.env.PASSWORD)
        await expect(inventory.inventoryContainer).toBeVisible()
        await inventory.addAllItemsToCart()
        await inventory.shoppingCart.click()
    })


    test('check if number of elements in cart matches badge number', async({page}) => {
        const cart = new Cart(page)

        const count = await cart.cartItem.count()
        const cartNumber = await cart.cartBadge.textContent()

        expect(count).toBe(parseInt(cartNumber))

    });

    test('check if cart number decreases with deleting items from cart', async({page}) => {
        const cart = new Cart(page)
        
        let count = async() => {return await cart.cartItem.count()}
        let cartNumber = async() => {return await cart.cartBadge.innerText()}

        expect(await count()).toBe(parseInt(await cartNumber()))

        await cart.cartRemoveBackpack.click()
        expect(await count()).toBe(parseInt(await cartNumber()))

        await cart.cartRemoveLight.click()
        expect(await count()).toBe(parseInt(await cartNumber()))

        await cart.cartRemoveTShirt.click()
        expect(await count()).toBe(parseInt(await cartNumber()))

        await cart.cartRemoveJacket.click()
        expect(await count()).toBe(parseInt(await cartNumber()))

        await cart.cartRemoveOnesie.click()
        expect(await count()).toBe(parseInt(await cartNumber()))

        await cart.cartRemoveRed.click()
        expect(await cart.cartBadge.count()).toEqual(0)

    })
})