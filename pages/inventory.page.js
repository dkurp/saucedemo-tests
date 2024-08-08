export class Inventory {

    /**
     * @param {import('@playwright/test').Page} page
     */

    constructor(page) {
        this.page = page;

        this.inventoryContainer = page.getByTestId('inventory-container')
        this.inventoryList = page.getByTestId('inventory-list')
        this.inventoryItem = page.getByTestId('inventory-item')

        this.sortItems = page.getByTestId('product-sort-container')

        this.burgerMenu = page.locator('#react-burger-menu-btn')
        this.menuAllItems = page.getByTestId('inventory-sidebar-link')
        this.menuAbout = page.getByTestId('about-sidebar-link')
        this.menuLogout = page.getByTestId('logout-sidebar-link')
        this.menuResetApp = page.getByTestId('reset-sidebar-link')

        this.addToCartBtn = page.locator('.btn.btn_primary.btn_small.btn_inventory ')
        this.inventoryItemName = page.getByTestId('inventory-item-name')
        this.inventoryItemDesc = page.getByTestId('inventory-item-desc')
        this.inventoryItemPrice = page.getByTestId('inventory-item-price')

        this.shoppingCart = page.getByTestId('shopping-cart-link')
        this.shoppingCartBadge = page.getByTestId('shopping-cart-badge')
        this.cartAddBackpack = page.getByTestId('add-to-cart-sauce-labs-backpack')
        this.cartAddLight = page.getByTestId('add-to-cart-sauce-labs-bike-light')
        this.cartAddTShirt = page.getByTestId('add-to-cart-sauce-labs-bolt-t-shirt')
        this.cartAddJacket = page.getByTestId('add-to-cart-sauce-labs-fleece-jacket')
        this.cartAddOnesie = page.getByTestId('add-to-cart-sauce-labs-onesie')
        this.cartAddRed = page.getByTestId('add-to-cart-test.allthethings()-t-shirt-(red)')
      }

    areArraysReversed(arr1, arr2) {
        if (arr1.length !== arr2.length) {
            return false;
        }
    
        for (let i = 0; i < arr1.length; i++) {
            if (arr1[i] !== arr2[arr2.length - 1 - i]) {
                return false;
            }
        }
    
        return true;
    }

    async addAllItemsToCart(){
        await inventory.cartAddBackpack.click()
        await inventory.cartAddJacket.click()
        await inventory.cartAddLight.click()
        await inventory.cartAddOnesie.click()
        await inventory.cartAddTShirt.click()
        await inventory.cartAddRed.click()
    }
}