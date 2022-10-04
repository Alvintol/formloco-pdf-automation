const puppeteer = require('puppeteer');
require('dotenv').config()
const buildPdf = async () => {

  const { URL, EMAIL, PASSWORD } = process.env

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();


  await page.goto(URL)

  page.close()
};

buildPdf()