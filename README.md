# saucedemo-tests
this reposirory showcases my approach to writing tests using Playwright

# installing project and first run of tests
1. run `npm install`
2. run `npx playwright install` to install playwright's internal dependencies
3. run `npx playwright test` to run all tests

# different launching options
Playwright provides UI nand debug modes, to use each You need to add `--ui` or `--debug` for respective mode
Playwright also provides trace files on errors (it can be configured in) `playwright.config.js` file

# environment variables
There is an `.env.example` file, copy it, remove `.example` and fill it with data from saucedemo.com login screen
