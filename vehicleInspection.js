const puppeteer = require("puppeteer");
require("dotenv").config();
(async () => {
  const { URL, EMAIL, PASSWORD } = process.env;

  const formController = {
    details: true,
  };

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

  console.log("SELECTING VEHICLE INSPECTION FORM");

  //SELECT VEHICLE INSPECTION
  await clickHandler(
    "/html/body/app-root/app-layout/div/div/div/app-home/div[3]/mat-card/mat-card-header/div[2]"
  );

  await page.waitForNetworkIdle();

  //FORM VARIABLES
  const firstAndLastName = "[id=mat-input-2]";
  const supervisorName = "[id=mat-input-3]";
  const licensePlate = "[id=mat-input-4]";
  const unitNumber = "[id=mat-input-5]";
  const vehicleMake = "[id=mat-input-6]";
  const vehicleModel = "[id=mat-input-7]";
  const vehicleMileage = "[id=mat-input-8]";

  //INPUT + SELECT FIRST AND LAST NAME VALUES
  await page.type(firstAndLastName, "Form Loco");
  await clickHandler("/html/body/div[2]/div/div/div/mat-option");

  //INPUT + SELECT SUPERVISOR NAME VALUE
  await page.type(supervisorName, "Alvin");
  await clickHandler('//*[@id="mat-option-138"]');

  //SELECT STAKEHOLDER VALUE
  await clickHandler('//*[@id="mat-select-value-1"]');
  await page.waitForXPath('//*[@id="mat-option-141"]');
  await clickHandler('//*[@id="mat-option-141"]');

  //SELECT DIVISION VALUE
  await clickHandler('//*[@id="mat-select-value-3"]');
  await clickHandler('//*[@id="mat-option-145"]');

  //INPUT LICENSE PLATE VALUE
  await page.type(licensePlate, "HLL420");

  //INPUT UNIT # VALUE
  await page.type(unitNumber, "**TEST**");

  //INPUT VEHICLE MAKE VALUE
  await page.type(vehicleMake, "Bentley");

  //SELECT VEHICLE MODEL YEAR VALUE 
  await clickHandler('//*[@id="mat-option-158"]');

  //INPUT VEHICLE MODEL VALUE 
  await page.type(vehicleModel, "F450");

  //SELECT VEHICLE YEAR VALUE
  await clickHandler('//*[@id="mat-option-164"]');
  await clickHandler('//*[@id="mat-select-value-5"]/span');

  //SELECT AND INPUT VEHICLE MILEAGE READING VALUE
  await clickHandler('//*[@id="mat-option-175"]');
  await page.type(vehicleMileage, "10000");

  //CLICK YES TO CURRENT REGISTRATION RADIO BUTTON
  await clickHandler('//*[@id="mat-radio-2"]/label/span[1]/span[1]');

  //CLICK NO TO CURRENT INSURANCE RADIO BUTTON
  await clickHandler('//*[@id="mat-radio-6"]/label/span[1]/span[1]');

  //CLICK INSURANCE EXPIRY DATE + CLICK DONE FOR DEFAULT 
  await page.click("[formcontrolname=RegistrationDate]");
  await page.waitForXPath('//*[@id="ion-overlay-1"]/div[2]/div[1]/div[2]');
  await clickHandler('//*[@id="ion-overlay-1"]/div[2]/div[1]/div[2]');

  //CLICK NEXT BUTTON 
  await clickHandler('//*[@id="cdk-accordion-child-0"]/div/div/button');

  //DETAILS SECTION -> CHECKS ALL BUTTONS 
  console.log("INPUTTING DETAILS SECTION");

  if (formController.details) {


    //<----------------IGNITION KEY SEQUENCE------------>
    await clickHandler('//*[@id="mat-checkbox-1"]/label/span[1]');

    //INPUT CORRECTIVE ACTION
    await page.type("[formcontrolname=comment]", "**TEST**");

    //CLICK CORRECTIVE ACTION BUTTON 
    await clickHandler(
      '//*[@id="mat-dialog-0"]/app-comment/div[2]/form/div[2]/div/button'
    );

    //CLICK AND SELECT DATE FOR CORRECTIVE ACTIONS 
    await page.click("[formcontrolname=DateCorrectiveActionToBeCompleted]");
    await page.waitForXPath('//*[@id="ion-overlay-2"]/div[2]/div[1]/div[2]');
    await clickHandler('//*[@id="ion-overlay-2"]/div[2]/div[1]/div[2]');

    //CLICK AND INPUT CORRECTIVE ACTION REQUIRED 
    await page.click("[formcontrolname=CorrectiveActionRequired]");
    await page.type("[formcontrolname=CorrectiveActionRequired]", "**TEST**");

    //SAVE FORM VALUES 
    await clickHandler(
      '//*[@id="mat-dialog-1"]/app-corrective-action/form/div[3]/mat-icon'
    );

    //SAVE FORM
    await page.waitForXPath(
      ' //*[@id="mat-dialog-0"]/app-comment/div[2]/div/button[3]'
    );
    await clickHandler(
      '//*[@id="mat-dialog-0"]/app-comment/div[2]/div/button[3]'
    );
    //<------------------------------------------------->

    //<-----------------OIL LEVEL SEQUENCE--------------->
    await clickHandler('//*[@id="mat-checkbox-2"]/label/span[1]');

     //INPUT CORRECTIVE ACTION
    await page.type("[formcontrolname=comment]", "**TEST**");

    //CLICK CORRECTIVE ACTION BUTTON
    await clickHandler(
      '//*[@id="mat-dialog-2"]/app-comment/div[2]/form/div[2]/div'
    );

    //CLICK AND SELECT DATE FOR CORRECTIVE ACTIONS 
    await page.click("[formcontrolname=DateCorrectiveActionToBeCompleted]");
    await page.waitForXPath('//*[@id="ion-overlay-3"]/div[2]/div[1]/div[2]');
    await clickHandler('//*[@id="ion-overlay-3"]/div[2]/div[1]/div[2]');

     //CLICK AND INPUT CORRECTIVE ACTION REQUIRED 
    await page.click("[formcontrolname=CorrectiveActionRequired]");
    await page.type("[formcontrolname=CorrectiveActionRequired]", "**TEST**");

    //SAVE FORM VALUES 
    await clickHandler(
      '//*[@id="mat-dialog-3"]/app-corrective-action/form/div[3]/mat-icon'
    );

    //SAVE FORM
    await page.waitForXPath(
      '//*[@id="mat-dialog-2"]/app-comment/div[2]/div/button[3]'
    );
    await clickHandler(
      '//*[@id="mat-dialog-2"]/app-comment/div[2]/div/button[3]'
    );
    //<------------------------------------------------->

    //<---------------Coolant level sequence----------->
    await clickHandler('//*[@id="mat-checkbox-3"]/label/span[1]');

     //INPUT CORRECTIVE ACTION
    await page.type("[formcontrolname=comment]", "**TEST**");

    //CLICK CORRECTIVE ACTION BUTTON 
    await clickHandler(
      '//*[@id="mat-dialog-4"]/app-comment/div[2]/form/div[2]/div'
    );

    //CLICK AND SELECT DATE FOR CORRECTIVE ACTIONS 
    await page.click("[formcontrolname=DateCorrectiveActionToBeCompleted]");
    await page.waitForXPath('//*[@id="ion-overlay-4"]/div[2]/div[1]/div[2]');
    await clickHandler('//*[@id="ion-overlay-4"]/div[2]/div[1]/div[2]');

     //CLICK AND INPUT CORRECTIVE ACTION REQUIRED 
    await page.click("[formcontrolname=CorrectiveActionRequired]");
    await page.type("[formcontrolname=CorrectiveActionRequired]", "**TEST**");

    //SAVE FORM VALUES 
    await clickHandler(
      '//*[@id="mat-dialog-5"]/app-corrective-action/form/div[3]/mat-icon'
    );

    //SAVE FORM
    await page.waitForXPath(
      '//*[@id="mat-dialog-4"]/app-comment/div[2]/div/button[3]'
    );
    await clickHandler(
      '//*[@id="mat-dialog-4"]/app-comment/div[2]/div/button[3]'
    );
    //<------------------------------------------------->

    //<------------Washer Fluid Level sequence---------->
    await clickHandler('//*[@id="mat-checkbox-4"]/label/span[1]');

     //INPUT CORRECTIVE ACTION
    await page.type("[formcontrolname=comment]", "**TEST**");

    //CLICK CORRECTIVE ACTION BUTTON 
    await clickHandler(
      '//*[@id="mat-dialog-6"]/app-comment/div[2]/form/div[2]/div'
    );

    //CLICK AND SELECT DATE FOR CORRECTIVE ACTIONS 
    await page.click("[formcontrolname=DateCorrectiveActionToBeCompleted]");
    await page.waitForXPath('//*[@id="ion-overlay-5"]/div[2]/div[1]/div[2]');
    await clickHandler('//*[@id="ion-overlay-5"]/div[2]/div[1]/div[2]');

     //CLICK AND INPUT CORRECTIVE ACTION REQUIRED 
    await page.click("[formcontrolname=CorrectiveActionRequired]");
    await page.type("[formcontrolname=CorrectiveActionRequired]", "**TEST**");

    //SAVE FORM VALUES 
    await clickHandler(
      '//*[@id="mat-dialog-7"]/app-corrective-action/form/div[3]/mat-icon'
    );

    //SAVE FORM
    await page.waitForXPath(
      '//*[@id="mat-dialog-6"]/app-comment/div[2]/div/button[3]'
    );
    await clickHandler(
      '//*[@id="mat-dialog-6"]/app-comment/div[2]/div/button[3]'
    );
    //<------------------------------------------------->

    //<-------Power Steering Fluid Level sequence------->
    await clickHandler('//*[@id="mat-checkbox-5"]/label/span[1]');

     //INPUT CORRECTIVE ACTION
    await page.type("[formcontrolname=comment]", "**TEST**");

    //CLICK CORRECTIVE ACTION BUTTON 

    await clickHandler(
      '//*[@id="mat-dialog-8"]/app-comment/div[2]/form/div[2]/div'
    );

    //CLICK AND SELECT DATE FOR CORRECTIVE ACTIONS 
    await page.click("[formcontrolname=DateCorrectiveActionToBeCompleted]");
    await page.waitForXPath('//*[@id="ion-overlay-6"]/div[2]/div[1]/div[2]');
    await clickHandler('//*[@id="ion-overlay-6"]/div[2]/div[1]/div[2]');

     //CLICK AND INPUT CORRECTIVE ACTION REQUIRED 
    await page.click("[formcontrolname=CorrectiveActionRequired]");
    await page.type("[formcontrolname=CorrectiveActionRequired]", "**TEST**");

    //SAVE FORM VALUES 
    await clickHandler(
      '//*[@id="mat-dialog-9"]/app-corrective-action/form/div[3]/mat-icon'
    );

    //SAVE FORM
    await page.waitForXPath(
      '//*[@id="mat-dialog-8"]/app-comment/div[2]/div/button[3]'
    );
    await clickHandler(
      '//*[@id="mat-dialog-8"]/app-comment/div[2]/div/button[3]'
    );
    //<------------------------------------------------->

    //<----------Check for Air Gauge sequence----------->
    await clickHandler('//*[@id="mat-checkbox-6"]/label/span[1]');

     //INPUT CORRECTIVE ACTION
    await page.type("[formcontrolname=comment]", "**TEST**");

    //CLICK CORRECTIVE ACTION BUTTON 
    await clickHandler(
      '//*[@id="mat-dialog-10"]/app-comment/div[2]/form/div[2]/div'
    );

    //CLICK AND SELECT DATE FOR CORRECTIVE ACTIONS 
    await page.click("[formcontrolname=DateCorrectiveActionToBeCompleted]");
    await page.waitForXPath('//*[@id="ion-overlay-7"]/div[2]/div[1]/div[2]');
    await clickHandler('//*[@id="ion-overlay-7"]/div[2]/div[1]/div[2]');

     //CLICK AND INPUT CORRECTIVE ACTION REQUIRED 
    await page.click("[formcontrolname=CorrectiveActionRequired]");
    await page.type("[formcontrolname=CorrectiveActionRequired]", "**TEST**");

    //SAVE FORM VALUES 
    await clickHandler(
      '//*[@id="mat-dialog-11"]/app-corrective-action/form/div[3]/mat-icon'
    );

    //SAVE FORM
    await page.waitForXPath(
      '//*[@id="mat-dialog-10"]/app-comment/div[2]/div/button[3]'
    );
    await clickHandler(
      '//*[@id="mat-dialog-10"]/app-comment/div[2]/div/button[3]'
    );
    //<------------------------------------------------->

    //<--------------Check Horn sequence--------------->
    await clickHandler('//*[@id="mat-checkbox-7"]/label/span[1]');

     //INPUT CORRECTIVE ACTION
    await page.type("[formcontrolname=comment]", "**TEST**");

    //CLICK CORRECTIVE ACTION BUTTON 
    await clickHandler(
      '//*[@id="mat-dialog-12"]/app-comment/div[2]/form/div[2]/div'
    );

    //CLICK AND SELECT DATE FOR CORRECTIVE ACTIONS 
    await page.click("[formcontrolname=DateCorrectiveActionToBeCompleted]");
    await page.waitForXPath('//*[@id="ion-overlay-8"]/div[2]/div[1]/div[2]');
    await clickHandler('//*[@id="ion-overlay-8"]/div[2]/div[1]/div[2]');

     //CLICK AND INPUT CORRECTIVE ACTION REQUIRED 
    await page.click("[formcontrolname=CorrectiveActionRequired]");
    await page.type("[formcontrolname=CorrectiveActionRequired]", "**TEST**");

    //SAVE FORM VALUES 
    await clickHandler(
      '//*[@id="mat-dialog-13"]/app-corrective-action/form/div[3]/mat-icon'
    );

    //SAVE FORM
    await page.waitForXPath(
      '//*[@id="mat-dialog-12"]/app-comment/div[2]/div/button[3]'
    );
    await clickHandler(
      '//*[@id="mat-dialog-12"]/app-comment/div[2]/div/button[3]'
    );
    //<------------------------------------------------->

    //Check Heater/Defroster sequence
    await clickHandler('//*[@id="mat-checkbox-8"]/label/span[1]');
    await page.type("[formcontrolname=comment]", "**TEST**");
    await clickHandler(
      '//*[@id="mat-dialog-14"]/app-comment/div[2]/form/div[2]/div'
    );
    await page.click("[formcontrolname=DateCorrectiveActionToBeCompleted]");
    await page.waitForXPath('//*[@id="ion-overlay-9"]/div[2]/div[1]/div[2]');
    await clickHandler('//*[@id="ion-overlay-9"]/div[2]/div[1]/div[2]');
    await page.click("[formcontrolname=CorrectiveActionRequired]");
    await page.type("[formcontrolname=CorrectiveActionRequired]", "**TEST**");
    await clickHandler(
      '//*[@id="mat-dialog-15"]/app-corrective-action/form/div[3]/mat-icon'
    );
    await page.waitForXPath(
      '//*[@id="mat-dialog-14"]/app-comment/div[2]/div/button[3]'
    );
    await clickHandler(
      '//*[@id="mat-dialog-14"]/app-comment/div[2]/div/button[3]'
    );

    //Check Windshield Wipers/Washers sequence
    await clickHandler('//*[@id="mat-checkbox-9"]/label/span[1]');
    await page.type("[formcontrolname=comment]", "**TEST**");
    await clickHandler(
      '//*[@id="mat-dialog-16"]/app-comment/div[2]/form/div[2]/div'
    );
    await page.click("[formcontrolname=DateCorrectiveActionToBeCompleted]");
    await page.waitForXPath('//*[@id="ion-overlay-10"]/div[2]/div[1]/div[2]');
    await clickHandler('//*[@id="ion-overlay-10"]/div[2]/div[1]/div[2]');
    await page.click("[formcontrolname=CorrectiveActionRequired]");
    await page.type("[formcontrolname=CorrectiveActionRequired]", "**TEST**");
    await clickHandler(
      '//*[@id="mat-dialog-17"]/app-corrective-action/form/div[3]/mat-icon'
    );
    await page.waitForXPath(
      '//*[@id="mat-dialog-16"]/app-comment/div[2]/div/button[3]'
    );
    await clickHandler(
      '//*[@id="mat-dialog-16"]/app-comment/div[2]/div/button[3]'
    );

    //Check All Signal Lights sequence
    await clickHandler('//*[@id="mat-checkbox-10"]/label/span[1]');
    await page.type("[formcontrolname=comment]", "**TEST**");
    await clickHandler(
      '//*[@id="mat-dialog-18"]/app-comment/div[2]/form/div[2]/div'
    );
    await page.click("[formcontrolname=DateCorrectiveActionToBeCompleted]");
    await page.waitForXPath('//*[@id="ion-overlay-11"]/div[2]/div[1]/div[2]');
    await clickHandler('//*[@id="ion-overlay-11"]/div[2]/div[1]/div[2]');
    await page.click("[formcontrolname=CorrectiveActionRequired]");
    await page.type("[formcontrolname=CorrectiveActionRequired]", "**TEST**");
    await clickHandler(
      '//*[@id="mat-dialog-19"]/app-corrective-action/form/div[3]/mat-icon'
    );
    await page.waitForXPath(
      '//*[@id="mat-dialog-18"]/app-comment/div[2]/div/button[3]'
    );
    await clickHandler(
      '//*[@id="mat-dialog-18"]/app-comment/div[2]/div/button[3]'
    );

    //Check Interior Lights sequence
    await clickHandler('//*[@id="mat-checkbox-11"]/label/span[1]');
    await page.type("[formcontrolname=comment]", "**TEST**");
    await clickHandler(
      '//*[@id="mat-dialog-20"]/app-comment/div[2]/form/div[2]/div'
    );
    await page.click("[formcontrolname=DateCorrectiveActionToBeCompleted]");
    await page.waitForXPath('//*[@id="ion-overlay-12"]/div[2]/div[1]/div[2]');
    await clickHandler('//*[@id="ion-overlay-12"]/div[2]/div[1]/div[2]');
    await page.click("[formcontrolname=CorrectiveActionRequired]");
    await page.type("[formcontrolname=CorrectiveActionRequired]", "**TEST**");
    await clickHandler(
      '//*[@id="mat-dialog-21"]/app-corrective-action/form/div[3]/mat-icon'
    );
    await page.waitForXPath(
      '//*[@id="mat-dialog-20"]/app-comment/div[2]/div/button[3]'
    );
    await clickHandler(
      '//*[@id="mat-dialog-20"]/app-comment/div[2]/div/button[3]'
    );

    //Check Mirrors for Damage and Adjustments
    await clickHandler('//*[@id="mat-checkbox-12"]/label/span[1]');
    await page.type("[formcontrolname=comment]", "**TEST**");
    await clickHandler(
      '//*[@id="mat-dialog-22"]/app-comment/div[2]/form/div[2]/div'
    );
    await page.click("[formcontrolname=DateCorrectiveActionToBeCompleted]");
    await page.waitForXPath('//*[@id="ion-overlay-13"]/div[2]/div[1]/div[2]');
    await clickHandler('//*[@id="ion-overlay-13"]/div[2]/div[1]/div[2]');
    await page.click("[formcontrolname=CorrectiveActionRequired]");
    await page.type("[formcontrolname=CorrectiveActionRequired]", "**TEST**");
    await clickHandler(
      '//*[@id="mat-dialog-23"]/app-corrective-action/form/div[3]/mat-icon'
    );
    await page.waitForXPath(
      '//*[@id="mat-dialog-22"]/app-comment/div[2]/div/button[3]'
    );
    await clickHandler(
      '//*[@id="mat-dialog-22"]/app-comment/div[2]/div/button[3]'
    );

    //Windshield Clear Visibility, No Cracks sequence
    await clickHandler('//*[@id="mat-checkbox-13"]/label/span[1]');
    await page.type("[formcontrolname=comment]", "**TEST**");
    await clickHandler(
      '//*[@id="mat-dialog-24"]/app-comment/div[2]/form/div[2]/div'
    );
    await page.click("[formcontrolname=DateCorrectiveActionToBeCompleted]");
    await page.waitForXPath('//*[@id="ion-overlay-14"]/div[2]/div[1]/div[2]');
    await clickHandler('//*[@id="ion-overlay-14"]/div[2]/div[1]/div[2]');
    await page.click("[formcontrolname=CorrectiveActionRequired]");
    await page.type("[formcontrolname=CorrectiveActionRequired]", "**TEST**");
    await clickHandler(
      '//*[@id="mat-dialog-25"]/app-corrective-action/form/div[3]/mat-icon'
    );
    await page.waitForXPath(
      '//*[@id="mat-dialog-24"]/app-comment/div[2]/div/button[3]'
    );
    await clickHandler(
      '//*[@id="mat-dialog-24"]/app-comment/div[2]/div/button[3]'
    );

    //Visual Inspection for Exterior Damage/ Leaks Under Vehicle
    await clickHandler('//*[@id="mat-checkbox-14"]/label/span[1]');
    await page.type("[formcontrolname=comment]", "**TEST**");
    await clickHandler(
      '//*[@id="mat-dialog-26"]/app-comment/div[2]/form/div[2]/div'
    );
    await page.click("[formcontrolname=DateCorrectiveActionToBeCompleted]");
    await page.waitForXPath('//*[@id="ion-overlay-15"]/div[2]/div[1]/div[2]');
    await clickHandler('//*[@id="ion-overlay-15"]/div[2]/div[1]/div[2]');
    await page.click("[formcontrolname=CorrectiveActionRequired]");
    await page.type("[formcontrolname=CorrectiveActionRequired]", "**TEST**");
    await clickHandler(
      '//*[@id="mat-dialog-27"]/app-corrective-action/form/div[3]/mat-icon'
    );
    await page.waitForXPath(
      '//*[@id="mat-dialog-26"]/app-comment/div[2]/div/button[3]'
    );
    await clickHandler(
      '//*[@id="mat-dialog-26"]/app-comment/div[2]/div/button[3]'
    );

    //Check Inside Engine Compartment for Leaks/Loose Items
    await clickHandler('//*[@id="mat-checkbox-15"]/label/span[1]');
    await page.type("[formcontrolname=comment]", "**TEST**");
    await clickHandler(
      '//*[@id="mat-dialog-28"]/app-comment/div[2]/form/div[2]/div'
    );
    await page.click("[formcontrolname=DateCorrectiveActionToBeCompleted]");
    await page.waitForXPath('//*[@id="ion-overlay-16"]/div[2]/div[1]/div[2]');
    await clickHandler('//*[@id="ion-overlay-16"]/div[2]/div[1]/div[2]');
    await page.click("[formcontrolname=CorrectiveActionRequired]");
    await page.type("[formcontrolname=CorrectiveActionRequired]", "**TEST**");
    await clickHandler(
      '//*[@id="mat-dialog-29"]/app-corrective-action/form/div[3]/mat-icon'
    );
    await page.waitForXPath(
      '//*[@id="mat-dialog-28"]/app-comment/div[2]/div/button[3]'
    );
    await clickHandler(
      '//*[@id="mat-dialog-28"]/app-comment/div[2]/div/button[3]'
    );

    //Start Engine & Check Transmission Fluid Level (Fluid should be hot) sequence
    await clickHandler('//*[@id="mat-checkbox-16"]/label/span[1]');
    await page.type("[formcontrolname=comment]", "**TEST**");
    await clickHandler(
      '//*[@id="mat-dialog-30"]/app-comment/div[2]/form/div[2]/div'
    );
    await page.click("[formcontrolname=DateCorrectiveActionToBeCompleted]");
    await page.waitForXPath('//*[@id="ion-overlay-17"]/div[2]/div[1]/div[2]');
    await clickHandler('//*[@id="ion-overlay-17"]/div[2]/div[1]/div[2]');
    await page.click("[formcontrolname=CorrectiveActionRequired]");
    await page.type("[formcontrolname=CorrectiveActionRequired]", "**TEST**");
    await clickHandler(
      '//*[@id="mat-dialog-31"]/app-corrective-action/form/div[3]/mat-icon'
    );
    await page.waitForXPath(
      '//*[@id="mat-dialog-30"]/app-comment/div[2]/div/button[3]'
    );
    await clickHandler(
      '//*[@id="mat-dialog-30"]/app-comment/div[2]/div/button[3]'
    );

    //Check Highlight/Signal lights/4way flashes/Tail Lights/ Backup Lights
    await clickHandler('//*[@id="mat-checkbox-17"]/label/span[1]');
    await page.type("[formcontrolname=comment]", "**TEST**");
    await clickHandler(
      '//*[@id="mat-dialog-32"]/app-comment/div[2]/form/div[2]/div'
    );
    await page.click("[formcontrolname=DateCorrectiveActionToBeCompleted]");
    await page.waitForXPath('//*[@id="ion-overlay-18"]/div[2]/div[1]/div[2]');
    await clickHandler('//*[@id="ion-overlay-18"]/div[2]/div[1]/div[2]');
    await page.click("[formcontrolname=CorrectiveActionRequired]");
    await page.type("[formcontrolname=CorrectiveActionRequired]", "**TEST**");
    await clickHandler(
      '//*[@id="mat-dialog-33"]/app-corrective-action/form/div[3]/mat-icon'
    );
    await page.waitForXPath(
      '//*[@id="mat-dialog-32"]/app-comment/div[2]/div/button[3]'
    );
    await clickHandler(
      '//*[@id="mat-dialog-32"]/app-comment/div[2]/div/button[3]'
    );

    //Check Fuel Level (Should not be less that 1/2 Tank)
    await clickHandler('//*[@id="mat-checkbox-18"]/label/span[1]');
    await page.type("[formcontrolname=comment]", "**TEST**");
    await clickHandler(
      '//*[@id="mat-dialog-34"]/app-comment/div[2]/form/div[2]/div'
    );
    await page.click("[formcontrolname=DateCorrectiveActionToBeCompleted]");
    await page.waitForXPath('//*[@id="ion-overlay-19"]/div[2]/div[1]/div[2]');
    await clickHandler('//*[@id="ion-overlay-19"]/div[2]/div[1]/div[2]');
    await page.click("[formcontrolname=CorrectiveActionRequired]");
    await page.type("[formcontrolname=CorrectiveActionRequired]", "**TEST**");
    await clickHandler(
      '//*[@id="mat-dialog-35"]/app-corrective-action/form/div[3]/mat-icon'
    );
    await page.waitForXPath(
      '//*[@id="mat-dialog-34"]/app-comment/div[2]/div/button[3]'
    );
    await clickHandler(
      '//*[@id="mat-dialog-34"]/app-comment/div[2]/div/button[3]'
    );

    //Check First Aid Kit Available and Full (Check expiry dates on Contents)
    await clickHandler('//*[@id="mat-checkbox-19"]/label/span[1]');
    await page.type("[formcontrolname=comment]", "**TEST**");
    await clickHandler(
      '//*[@id="mat-dialog-36"]/app-comment/div[2]/form/div[2]/div'
    );
    await page.click("[formcontrolname=DateCorrectiveActionToBeCompleted]");
    await page.waitForXPath('//*[@id="ion-overlay-20"]/div[2]/div[1]/div[2]');
    await clickHandler('//*[@id="ion-overlay-20"]/div[2]/div[1]/div[2]');
    await page.click("[formcontrolname=CorrectiveActionRequired]");
    await page.type("[formcontrolname=CorrectiveActionRequired]", "**TEST**");
    await clickHandler(
      '//*[@id="mat-dialog-37"]/app-corrective-action/form/div[3]/mat-icon'
    );
    await page.waitForXPath(
      '//*[@id="mat-dialog-36"]/app-comment/div[2]/div/button[3]'
    );
    await clickHandler(
      '//*[@id="mat-dialog-36"]/app-comment/div[2]/div/button[3]'
    );

    //Check Fire Extinguisher is Available: Gauge showing charged, proper seal, pin and inspection
    await clickHandler('//*[@id="mat-checkbox-20"]/label/span[1]');
    await page.type("[formcontrolname=comment]", "**TEST**");
    await clickHandler(
      '//*[@id="mat-dialog-38"]/app-comment/div[2]/form/div[2]/div'
    );
    await page.click("[formcontrolname=DateCorrectiveActionToBeCompleted]");
    await page.waitForXPath('//*[@id="ion-overlay-21"]/div[2]/div[1]/div[2]');
    await clickHandler('//*[@id="ion-overlay-21"]/div[2]/div[1]/div[2]');
    await page.click("[formcontrolname=CorrectiveActionRequired]");
    await page.type("[formcontrolname=CorrectiveActionRequired]", "**TEST**");
    await clickHandler(
      '//*[@id="mat-dialog-39"]/app-corrective-action/form/div[3]/mat-icon'
    );
    await page.waitForXPath(
      '//*[@id="mat-dialog-38"]/app-comment/div[2]/div/button[3]'
    );
    await clickHandler(
      '//*[@id="mat-dialog-38"]/app-comment/div[2]/div/button[3]'
    );

    //Survival Kit Available: Candles, Emergency, Blanket, Tow Rope, Booster Cables, Light Sticks, Water
    await clickHandler('//*[@id="mat-checkbox-21"]/label/span[1]');
    await page.type("[formcontrolname=comment]", "**TEST**");
    await clickHandler(
      '//*[@id="mat-dialog-40"]/app-comment/div[2]/form/div[2]/div'
    );
    await page.click("[formcontrolname=DateCorrectiveActionToBeCompleted]");
    await page.waitForXPath('//*[@id="ion-overlay-22"]/div[2]/div[1]/div[2]');
    await clickHandler('//*[@id="ion-overlay-22"]/div[2]/div[1]/div[2]');
    await page.click("[formcontrolname=CorrectiveActionRequired]");
    await page.type("[formcontrolname=CorrectiveActionRequired]", "**TEST**");
    await clickHandler(
      '//*[@id="mat-dialog-41"]/app-corrective-action/form/div[3]/mat-icon'
    );
    await page.waitForXPath(
      '//*[@id="mat-dialog-40"]/app-comment/div[2]/div/button[3]'
    );
    await clickHandler(
      '//*[@id="mat-dialog-40"]/app-comment/div[2]/div/button[3]'
    );

    // Fuel Key, Check Used
    await clickHandler('//*[@id="mat-checkbox-22"]/label/span[1]');
    await page.type("[formcontrolname=comment]", "**TEST**");
    await clickHandler(
      '//*[@id="mat-dialog-42"]/app-comment/div[2]/form/div[2]/div'
    );
    await page.click("[formcontrolname=DateCorrectiveActionToBeCompleted]");
    await page.waitForXPath('//*[@id="ion-overlay-23"]/div[2]/div[1]/div[2]');
    await clickHandler('//*[@id="ion-overlay-23"]/div[2]/div[1]/div[2]');
    await page.click("[formcontrolname=CorrectiveActionRequired]");
    await page.type("[formcontrolname=CorrectiveActionRequired]", "**TEST**");
    await clickHandler(
      '//*[@id="mat-dialog-43"]/app-corrective-action/form/div[3]/mat-icon'
    );
    await page.waitForXPath(
      '//*[@id="mat-dialog-42"]/app-comment/div[2]/div/button[3]'
    );
    await clickHandler(
      '//*[@id="mat-dialog-42"]/app-comment/div[2]/div/button[3]'
    );

    //Check Radio (Two-Way Check), if required
    await clickHandler('//*[@id="mat-checkbox-23"]/label/span[1]');
    await page.type("[formcontrolname=comment]", "**TEST**");
    await clickHandler(
      '//*[@id="mat-dialog-44"]/app-comment/div[2]/form/div[2]/div'
    );
    await page.click("[formcontrolname=DateCorrectiveActionToBeCompleted]");
    await page.waitForXPath('//*[@id="ion-overlay-24"]/div[2]/div[1]/div[2]');
    await clickHandler('//*[@id="ion-overlay-24"]/div[2]/div[1]/div[2]');
    await page.click("[formcontrolname=CorrectiveActionRequired]");
    await page.type("[formcontrolname=CorrectiveActionRequired]", "**TEST**");
    await clickHandler(
      '//*[@id="mat-dialog-45"]/app-corrective-action/form/div[3]/mat-icon'
    );
    await page.waitForXPath(
      '//*[@id="mat-dialog-44"]/app-comment/div[2]/div/button[3]'
    );
    await clickHandler(
      '//*[@id="mat-dialog-44"]/app-comment/div[2]/div/button[3]'
    );

    //Check Tires for Wear and Pressure (as per manufacturer)
    await clickHandler('//*[@id="mat-checkbox-24"]/label/span[1]');
    await page.type("[formcontrolname=comment]", "**TEST**");
    await clickHandler(
      '//*[@id="mat-dialog-46"]/app-comment/div[2]/form/div[2]/div'
    );
    await page.click("[formcontrolname=DateCorrectiveActionToBeCompleted]");
    await page.waitForXPath('//*[@id="ion-overlay-25"]/div[2]/div[1]/div[2]');
    await clickHandler('//*[@id="ion-overlay-25"]/div[2]/div[1]/div[2]');
    await page.click("[formcontrolname=CorrectiveActionRequired]");
    await page.type("[formcontrolname=CorrectiveActionRequired]", "**TEST**");
    await clickHandler(
      '//*[@id="mat-dialog-47"]/app-corrective-action/form/div[3]/mat-icon'
    );
    await page.waitForXPath(
      '//*[@id="mat-dialog-46"]/app-comment/div[2]/div/button[3]'
    );
    await clickHandler(
      '//*[@id="mat-dialog-46"]/app-comment/div[2]/div/button[3]'
    );

    //Check Spill Kit, if required sequence
    await clickHandler('//*[@id="mat-checkbox-25"]/label/span[1]');
    await page.type("[formcontrolname=comment]", "**TEST**");
    await clickHandler(
      '//*[@id="mat-dialog-48"]/app-comment/div[2]/form/div[2]/div'
    );
    await page.click("[formcontrolname=DateCorrectiveActionToBeCompleted]");
    await page.waitForXPath('//*[@id="ion-overlay-26"]/div[2]/div[1]/div[2]');
    await clickHandler('//*[@id="ion-overlay-26"]/div[2]/div[1]/div[2]');
    await page.click("[formcontrolname=CorrectiveActionRequired]");
    await page.type("[formcontrolname=CorrectiveActionRequired]", "**TEST**");
    await clickHandler(
      '//*[@id="mat-dialog-49"]/app-corrective-action/form/div[3]/mat-icon'
    );
    await page.waitForXPath(
      '//*[@id="mat-dialog-48"]/app-comment/div[2]/div/button[3]'
    );
    await clickHandler(
      '//*[@id="mat-dialog-48"]/app-comment/div[2]/div/button[3]'
    );

    //Finish Details Section and Click Next
    await clickHandler('//*[@id="cdk-accordion-child-1"]/div/div/button[2]');

    //Look over discrepancies and click next
    await clickHandler('//*[@id="cdk-accordion-child-2"]/div/div/button[2]');
  } else {
    await clickHandler('//*[@id="cdk-accordion-child-1"]/div/div/button[2]');
    await clickHandler('//*[@id="cdk-accordion-child-2"]/div/div/button[2]');
  }
})();
