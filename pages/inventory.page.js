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
      }
}