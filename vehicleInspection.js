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

  //Details section 

  //Ignition Key sequence
  await clickHandler('//*[@id="mat-checkbox-1"]/label/span[1]')
  await page.type("[formcontrolname=comment]", "**TEST**")
  await clickHandler('//*[@id="mat-dialog-0"]/app-comment/div[2]/form/div[2]/div/button')
  await page.click('[formcontrolname=DateCorrectiveActionToBeCompleted]')
  await page.waitForXPath('//*[@id="ion-overlay-1"]/div[2]/div[1]/div[2]')
  await clickHandler('//*[@id="ion-overlay-1"]/div[2]/div[1]/div[2]')
  await page.click('[formcontrolname=CorrectiveActionRequired]')
  await page.type('[formcontrolname=CorrectiveActionRequired]', '**TEST**')
  await clickHandler('//*[@id="mat-dialog-1"]/app-corrective-action/form/div[3]/mat-icon')
  await page.waitForXPath(' //*[@id="mat-dialog-0"]/app-comment/div[2]/div/button[3]')
  await clickHandler('//*[@id="mat-dialog-0"]/app-comment/div[2]/div/button[3]')

  //Oil Level sequence
  await clickHandler('//*[@id="mat-checkbox-2"]/label/span[1]')
  await page.type("[formcontrolname=comment]", '**TEST**');
  await clickHandler('//*[@id="mat-dialog-2"]/app-comment/div[2]/form/div[2]/div')
  await page.click('[formcontrolname=DateCorrectiveActionToBeCompleted]')
  await page.waitForXPath('//*[@id="ion-overlay-2"]/div[2]/div[1]/div[2]')
  await clickHandler('//*[@id="ion-overlay-2"]/div[2]/div[1]/div[2]')
  await page.click('[formcontrolname=CorrectiveActionRequired]')
  await page.type('[formcontrolname=CorrectiveActionRequired]', '**TEST**')
  await clickHandler('//*[@id="mat-dialog-3"]/app-corrective-action/form/div[3]/mat-icon')
  await page.waitForXPath('//*[@id="mat-dialog-2"]/app-comment/div[2]/div/button[3]')
  await clickHandler('//*[@id="mat-dialog-2"]/app-comment/div[2]/div/button[3]')

  //Coolant level sequence
  await clickHandler('//*[@id="mat-checkbox-3"]/label/span[1]')
  await page.type("[formcontrolname=comment]", '**TEST**');
  await clickHandler('//*[@id="mat-dialog-4"]/app-comment/div[2]/form/div[2]/div')
  await page.click('[formcontrolname=DateCorrectiveActionToBeCompleted]')
  await page.waitForXPath('//*[@id="ion-overlay-3"]/div[2]/div[1]/div[2]')
  await clickHandler('//*[@id="ion-overlay-3"]/div[2]/div[1]/div[2]')
  await page.click('[formcontrolname=CorrectiveActionRequired]')
  await page.type('[formcontrolname=CorrectiveActionRequired]', '**TEST**')
  await clickHandler('//*[@id="mat-dialog-5"]/app-corrective-action/form/div[3]/mat-icon')
  await page.waitForXPath('//*[@id="mat-dialog-4"]/app-comment/div[2]/div/button[3]')
  await clickHandler('//*[@id="mat-dialog-4"]/app-comment/div[2]/div/button[3]')

  //Washer Fluid Level sequence 
  await clickHandler('//*[@id="mat-checkbox-4"]/label/span[1]')
  await page.type("[formcontrolname=comment]", '**TEST**');
  await clickHandler('//*[@id="mat-dialog-6"]/app-comment/div[2]/form/div[2]/div')
  await page.click('[formcontrolname=DateCorrectiveActionToBeCompleted]')
  await page.waitForXPath('//*[@id="ion-overlay-4"]/div[2]/div[1]/div[2]')
  await clickHandler('//*[@id="ion-overlay-4"]/div[2]/div[1]/div[2]')
  await page.click('[formcontrolname=CorrectiveActionRequired]')
  await page.type('[formcontrolname=CorrectiveActionRequired]', '**TEST**')
  await clickHandler('//*[@id="mat-dialog-7"]/app-corrective-action/form/div[3]/mat-icon')
  await page.waitForXPath('//*[@id="mat-dialog-6"]/app-comment/div[2]/div/button[3]')
  await clickHandler('//*[@id="mat-dialog-6"]/app-comment/div[2]/div/button[3]')

  // Power Steering Fluid Level sequence
  await clickHandler('//*[@id="mat-checkbox-5"]/label/span[1]')
  await page.type("[formcontrolname=comment]", '**TEST**');
  await clickHandler('//*[@id="mat-dialog-8"]/app-comment/div[2]/form/div[2]/div')
  await page.click('[formcontrolname=DateCorrectiveActionToBeCompleted]')
  await page.waitForXPath('//*[@id="ion-overlay-5"]/div[2]/div[1]/div[2]')
  await clickHandler('//*[@id="ion-overlay-5"]/div[2]/div[1]/div[2]')
  await page.click('[formcontrolname=CorrectiveActionRequired]')
  await page.type('[formcontrolname=CorrectiveActionRequired]', '**TEST**')
  await clickHandler('//*[@id="mat-dialog-9"]/app-corrective-action/form/div[3]/mat-icon')
  await page.waitForXPath('//*[@id="mat-dialog-8"]/app-comment/div[2]/div/button[3]')
  await clickHandler('//*[@id="mat-dialog-8"]/app-comment/div[2]/div/button[3]')

  //Check for Air Gauge sequence 
  await clickHandler('//*[@id="mat-checkbox-6"]/label/span[1]')
  await page.type("[formcontrolname=comment]", '**TEST**');
  await clickHandler('//*[@id="mat-dialog-10"]/app-comment/div[2]/form/div[2]/div')
  await page.click('[formcontrolname=DateCorrectiveActionToBeCompleted]')
  await page.waitForXPath('//*[@id="ion-overlay-6"]/div[2]/div[1]/div[2]')
  await clickHandler('//*[@id="ion-overlay-6"]/div[2]/div[1]/div[2]')
  await page.click('[formcontrolname=CorrectiveActionRequired]')
  await page.type('[formcontrolname=CorrectiveActionRequired]', '**TEST**')
  await clickHandler('//*[@id="mat-dialog-11"]/app-corrective-action/form/div[3]/mat-icon')
  await page.waitForXPath('//*[@id="mat-dialog-10"]/app-comment/div[2]/div/button[3]')
  await clickHandler('//*[@id="mat-dialog-10"]/app-comment/div[2]/div/button[3]')

  //Check Horn sequence 
  await clickHandler('//*[@id="mat-checkbox-7"]/label/span[1]')
  await page.type("[formcontrolname=comment]", '**TEST**');
  await clickHandler('//*[@id="mat-dialog-12"]/app-comment/div[2]/form/div[2]/div')
  await page.click('[formcontrolname=DateCorrectiveActionToBeCompleted]')
  await page.waitForXPath('//*[@id="ion-overlay-7"]/div[2]/div[1]/div[2]')
  await clickHandler('//*[@id="ion-overlay-7"]/div[2]/div[1]/div[2]')
  await page.click('[formcontrolname=CorrectiveActionRequired]')
  await page.type('[formcontrolname=CorrectiveActionRequired]', '**TEST**')
  await clickHandler('//*[@id="mat-dialog-13"]/app-corrective-action/form/div[3]/mat-icon')
  await page.waitForXPath('//*[@id="mat-dialog-12"]/app-comment/div[2]/div/button[3]')
  await clickHandler('//*[@id="mat-dialog-12"]/app-comment/div[2]/div/button[3]')

  //Check Heater/Defroster sequence 
  await clickHandler('//*[@id="mat-checkbox-8"]/label/span[1]')
  await page.type("[formcontrolname=comment]", '**TEST**');
  await clickHandler('//*[@id="mat-dialog-14"]/app-comment/div[2]/form/div[2]/div')
  await page.click('[formcontrolname=DateCorrectiveActionToBeCompleted]')
  await page.waitForXPath('//*[@id="ion-overlay-8"]/div[2]/div[1]/div[2]')
  await clickHandler('//*[@id="ion-overlay-8"]/div[2]/div[1]/div[2]')
  await page.click('[formcontrolname=CorrectiveActionRequired]')
  await page.type('[formcontrolname=CorrectiveActionRequired]', '**TEST**')
  await clickHandler('//*[@id="mat-dialog-15"]/app-corrective-action/form/div[3]/mat-icon')
  await page.waitForXPath('//*[@id="mat-dialog-14"]/app-comment/div[2]/div/button[3]')
  await clickHandler('//*[@id="mat-dialog-14"]/app-comment/div[2]/div/button[3]')







})();
