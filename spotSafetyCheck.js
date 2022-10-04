const puppeteer = require('puppeteer');
require('dotenv').config()
const buildPdf = async () => {

  const { URL, EMAIL, PASSWORD } = process.env

  const browser = await puppeteer.launch({ headless: true });
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

  

  page.close()
};

buildPdf()