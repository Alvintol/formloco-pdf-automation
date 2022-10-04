const puppeteer = require('puppeteer');
require('dotenv').config()
const buildPdf = async () => {

  const { URL, EMAIL, PASSWORD } = process.env

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(URL)

  await page.waitForNetworkIdle()

  const isLoginPage = () => page.evaluate(() => {
    const html = document.querySelectorAll('.mat-form-field-infix .ng-tns-c91-1');
    const htmlTags = Array.from(html).map(tag => tag.innerHTML)
    return htmlTags
  });

  console.log('LOGGING IN...');
  await page.type('[formcontrolname=email]', EMAIL)
  await page.type('[formcontrolname=password]', PASSWORD)
  
  await page.click('mat-icon .mat-icon .notranslate .icon-169px-action .material-icons .mat-icon-no-color .ng-star-inserted')


  page.close()
};

buildPdf()