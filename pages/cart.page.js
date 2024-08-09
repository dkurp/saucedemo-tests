export class Cart {

    /**
     * @param {import('@playwright/test').Page} page
     */

    constructor(page) {
        this.page = page;

        this.cartItem = page.getByTestId('inventory-item')
        this.cartBadge = page.getByTestId('shopping-cart-badge')

        this.cartRemoveBackpack = page.getByTestId('remove-sauce-labs-backpack')
        this.cartRemoveLight = page.getByTestId('remove-sauce-labs-bike-light')
        this.cartRemoveTShirt = page.getByTestId('remove-sauce-labs-bolt-t-shirt')
        this.cartRemoveJacket = page.getByTestId('remove-sauce-labs-fleece-jacket')
        this.cartRemoveOnesie = page.getByTestId('remove-sauce-labs-onesie')
        this.cartRemoveRed = page.getByTestId('remove-test.allthethings()-t-shirt-(red)')

        this.continueShopping = page.getByTestId('continue-shopping')
        this.checkout = page.getByTestId('checkout')

        this.burgerMenu = page.locator('#react-burger-menu-btn')
        this.menuAllItems = page.getByTestId('inventory-sidebar-link')
        this.menuAbout = page.getByTestId('about-sidebar-link')
        this.menuLogout = page.getByTestId('logout-sidebar-link')
        this.menuResetApp = page.getByTestId('reset-sidebar-link')
    }
}