const puppeteer = require('puppeteer');
require('dotenv').config()
  ; (async () => {

    const { URL, EMAIL, PASSWORD } = process.env

    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(URL)

    await page.waitForNetworkIdle()

    console.log('LOGGING IN...');
    await page.type('[formcontrolname=email]', EMAIL)
    await page.type('[formcontrolname=password]', PASSWORD)

    await page.click('[role=img]');

    await page.waitForNetworkIdle()

    const isLoginPage = await page.evaluate(() => {
      const search = document.querySelectorAll('.mat-form-field-infix .ng-tns-c91-1');
      const html = Array.from(search).map(tag => tag.innerHTML)
      return html
    })

    if (isLoginPage.length === 0) {
      console.log('LOGIN SUCCESSFUL')
    } else {
      console.log('******* ERROR WITH LOGIN *******')
      console.log(isLoginPage.length)
    }

    console.log('SELECTING SPOT CHECK FORM...')
    const spotLink = await page.$x('/html/body/app-root/app-layout/div/div/div/app-home/div[2]/mat-card/mat-card-header/div[2]/mat-card-title')

    await spotLink[0].click()

    await page.waitForNetworkIdle()

    const mstLink = await page.$x('/html/body/app-root/app-layout/div/div/div/app-home/div[1]/mat-card/mat-card-header/div[2]/mat-card-title')

    if (typeof (await mstLink[0]?.getProperty('innerText'))?.jsonValue() !== 'object') {
      console.log('SUCESSFUL ACCESS TO SPOT CHECK INSPECTION FORM')
    } else {
      console.log('******* ERROR WITH ACCESSING SPOT CHECK INSPECTION FORM *******')
    }



    await page.type('[formcontrolname=CompanyName]', '***COMPANY TEST NAME***')

    await page.type('[formfontrolname=]')

    page.close()
  })()