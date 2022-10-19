const puppeteer = require("puppeteer");
require("dotenv").config();
(async () => {
  const { URL, EMAIL, PASSWORD } = process.env;

  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(URL);

  await page.waitForNetworkIdle();

  console.log("LOGGING IN...");

  //Login w/ .env credentials
  await page.type("[formcontrolname=email]", EMAIL);
  await page.type("[formcontrolname=password]", PASSWORD);

  //clicks login button
  await page.click("[role=img]");

  await page.waitForNetworkIdle();

  const clickHandler = async (path) => {
    const target = await page.$x(path);
    await page.waitForNetworkIdle();
    await target[0].click();
    await page.waitForNetworkIdle();
  };

  console.log('SELECTING VEHICLE INSPECTION');
  
  //SELECT VEHICLE INSPECTION 
  await clickHandler('/html/body/app-root/app-layout/div/div/div/app-home/div[3]/mat-card/mat-card-header/div[2]')

  await page.waitForNetworkIdle();
  
  //VEHICLE

  const firstAndLastName = "[id=mat-input-2]"
  const supervisorName = "[id=mat-input-3]"
  const licensePlate = "[id=mat-input-4]"
  const unitNumber = "[id=mat-input-5]"
  const vehicleMake = "[id=mat-input-6]"
  const vehicleModel = "[id=mat-input-7]"
  const vehicleMileage = "[id=mat-input-8]"

  await page.type(firstAndLastName, 'Form Loco')
  await clickHandler('/html/body/div[2]/div/div/div/mat-option')
  await page.type(supervisorName, 'Alvin')
  await clickHandler('//*[@id="mat-option-137"]')
  await clickHandler('//*[@id="cdk-accordion-child-0"]/div/app-header/form/mat-form-field[3]/div/div[1]/div')
  await clickHandler('//*[@id="mat-option-139"]')
  await clickHandler('//*[@id="cdk-accordion-child-0"]/div/app-header/form/mat-form-field[4]/div/div[1]/div')
  await clickHandler('//*[@id="mat-option-143"]')
  await page.type(licensePlate, 'HLL420')
  await page.type(unitNumber, '**TEST**')
  await page.type(vehicleMake, 'Bentley')
  await clickHandler('//*[@id="mat-option-156"]')
  await page.type(vehicleModel, 'F450')
  await clickHandler('//*[@id="mat-option-162"]')
  await clickHandler('//*[@id="cdk-accordion-child-0"]/div/app-header/form/mat-form-field[9]/div/div[1]/div')
  await clickHandler('//*[@id="mat-option-175"]')
  await page.type(vehicleMileage, '10000')
  await clickHandler('//*[@id="mat-radio-2"]/label/span[1]/span[1]')
  await clickHandler('//*[@id="mat-radio-6"]/label/span[1]/span[1]')
  await clickHandler('//*[@id="cdk-accordion-child-0"]/div/div/button')



})();
