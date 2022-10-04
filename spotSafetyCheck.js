const puppeteer = require('puppeteer');

const buildPdf = async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

};

buildPdf()