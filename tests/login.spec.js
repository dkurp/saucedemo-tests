const { test, expect } = require('@playwright/test');
const { Login, Inventory } = require('../pages/')

test.describe('Login Page elements', () => {
    test.beforeEach(async({page}) => {
        await page.goto('/')
    });
    test('Username field is present', async ({page}) =>{
        const login = new Login(page)

        const placeholderUsername = await login.username.getAttribute('placeholder')
        await expect(placeholderUsername).toBe("Username")
    })

    test('Password field is present', async ({page}) =>{
        const login = new Login(page)

        const placeholderPassword = await login.password.getAttribute('placeholder')
        await expect(placeholderPassword).toBe("Password")
    })

    test("Login logo is present", async ({page}) => {
        const login = new Login(page)

        await expect(login.logo).toHaveText('Swag Labs')
    })

})

test.describe('Logging in logic', () =>{
    test.beforeEach(async({page}) => {
        await page.goto('/')
    });

    test('User logs in without issue', async ({page})=>{
        const login = new Login(page) 
        const inventory = new Inventory(page)

        await login.login(process.env.STANDARD, 'secret_sauce')
        await expect(inventory.inventoryContainer).toBeVisible()
    })

    test('User logs out', async ({page})=>{
        const login = new Login(page) 
        const inventory = new Inventory(page)

        await login.login(process.env.STANDARD, 'secret_sauce')
        await expect(inventory.inventoryContainer).toBeVisible()
        await inventory.burgerMenu.click()
        await inventory.menuLogout.click()

        await expect(login.loginBtn).toBeVisible()
    })

    test('Blocked user cannot log in, error present', async ({page})=>{
        const login = new Login(page) 

        await login.login(process.env.LOCKED, 'secret_sauce')

        await expect(login.errorContainer).toBeVisible()
        await expect(login.error).toHaveText('Epic sadface: Sorry, this user has been locked out.')
    })

    test('User can close error message', async ({page})=>{
        const login = new Login(page) 

        await login.login(process.env.LOCKED, 'secret_sauce')

        await expect(login.errorContainer).toBeVisible()
        await login.closeError.click()
        const count = await login.errorContainer.count()
        expect(count).toEqual(0)
    })

    test('Error present for missing username', async ({page})=>{
        const login = new Login(page) 

        await login.loginBtn.click()

        await expect(login.errorContainer).toBeVisible()
        await expect(login.error).toHaveText('Epic sadface: Username is required')
    })

    test('Error present for missing password', async ({page})=>{
        const login = new Login(page) 

        await login.username.fill(process.env.STANDARD)
        await login.loginBtn.click()

        await expect(login.errorContainer).toBeVisible()
        await expect(login.error).toHaveText('Epic sadface: Password is required')
    })

    test('Error present for wrong username/password', async ({page})=>{
        const login = new Login(page) 

        await login.login('test', 'test')

        await expect(login.errorContainer).toBeVisible()
        await expect(login.error).toHaveText('Epic sadface: Username and password do not match any user in this service')
    })

    // test('User keeps session', async ({page, context}) => {
    //     await context.addCookies([{
    //         name: 'session-username',
    //         value: 'standard_user',
    //         domain: 'www.saucedemo.com',
    //         path: '/'}]);
    //     await page.goto('/')
    // })
})