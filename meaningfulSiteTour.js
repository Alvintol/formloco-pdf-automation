const puppeteer = require('puppeteer');
require('dotenv').config();
(async () => {

  const { URL, EMAIL, PASSWORD } = process.env;

  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage();
  await page.goto(URL);

  await page.waitForNetworkIdle();

  console.log('LOGGING IN...');

  //Login w/ .env credentials
  await page.type("[formcontrolname=email]", EMAIL);
  await page.type("[formcontrolname=password]", PASSWORD);

  //clicks login button
  await page.click('[role=img]')

  await page.waitForNetworkIdle();

  
})();
