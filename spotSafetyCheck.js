const puppeteer = require("puppeteer");
require("dotenv").config();
(async () => {
  const { URL, EMAIL, PASSWORD } = process.env;

  const formController = {
    hazardIdentification: true,
    rulesWorksProcedure: true,
    incidentReporting: true,
    communicationAndTraining: true,
    personalProtectiveEquipment: true,
    safetyEquipment: true,
  };

  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(URL);

  await page.waitForNetworkIdle();

  console.log("LOGGING IN...");
  await page.type("[formcontrolname=email]", EMAIL);
  await page.type("[formcontrolname=password]", PASSWORD);

  // Signs in with provided credntials
  await page.click("[role=img]");

  await page.waitForNetworkIdle();
  const isLoginPage = await page.evaluate(() => {
    const search = document.querySelectorAll(
      ".mat-form-field-infix .ng-tns-c91-1"
    );
    const html = Array.from(search).map((tag) => tag.innerHTML);
    return html;
  });

  if (isLoginPage.length === 0) {
    console.log("LOGIN SUCCESSFUL");
  } else {
    console.log("******* ERROR WITH LOGIN *******");
    console.log(isLoginPage.length);
  }

  const clickHandler = async (path) => {
    const target = await page.$x(path);
    await page.waitForNetworkIdle();
    await target[0].click();
    await page.waitForNetworkIdle();
  };

  console.log("SELECTING SPOT CHECK FORM...");

  // Spot Check Inspection Button
  await clickHandler(
    "/html/body/app-root/app-layout/div/div/div/app-home/div[2]/mat-card/mat-card-header/div[2]/mat-card-title"
  );

  const formControlComment = "[formcontrolname=comment]";
  const formControlDate = "[formcontrolname=DateCorrectiveActionToBeCompleted]";
  const formControlCorAct = "[formcontrolname=CorrectiveActionRequired]";
  const dateButtonPath = "/html/body/ion-picker/div[2]/div[1]/div[2]/button";

  const correctiveActionDate = async () => {
    await page.click(formControlDate);
    await page.waitForXPath(dateButtonPath);
    await clickHandler(dateButtonPath);
  };

  // WORKSITE SAFETY MANAGEMENT REVIEW

  console.log("ENTERING WORKSITE SAFETY MANAGEMENT REVIEW DATA...");

  await page.type("[formcontrolname=CompanyName]", "***COMPANY TEST NAME***");
  await page.type("[formcontrolname=EmployeeName]", "***TEST EMPLOYEE NAME***");
  await page.type(
    "[formcontrolname=JobDescription]",
    "***TEST JOB DESCRIPTION***"
  );
  await page.type("[formcontrolname=Location]", "***LOCATION TEST***");

  // Opening Evaluator List
  await clickHandler('//*[@id="mat-input-6"]');

  // Choosing Evaluator
  await clickHandler('//*[@id="mat-option-87"]/span');

  // Opening Supervisor List
  await clickHandler('//*[@id="mat-input-7"]');

  // Choosing Supervisor
  await clickHandler('//*[@id="mat-option-137"]/span');

  // Worksite Safety Management Review Button
  await clickHandler('//*[@id="cdk-accordion-child-0"]/div/div/button');

  console.log("WORKSITE SAFETY MANAGEMENT REVIEW PAGE COMPLETE");

  // HAZARD IDENTIFICATION & CONTROL

  console.log("ENTERING HAZARD IDENTIFICATION & CONTROL DATA...");

  if (formController.hazardIdentification) {
    // Satisfactory Hazard Identification & Control radio
    await clickHandler('//*[@id="mat-radio-2"]/label/span[1]');

    await page.type(formControlComment, "***SATISFACTORY COMMENT HAZARD***");

    // Save Satisfactory Hazard Comment
    await clickHandler(
      '//*[@id="mat-dialog-0"]/app-comment/div[2]/div/button[3]'
    );
    console.log("HAZARD COMMENT COMPLETE");

    // Unsatisfactory Hazard Identification & Control radio
    await clickHandler('//*[@id="mat-radio-7"]/label/span[1]');
    await page.type(
      formControlComment,
      "***UNSATISFACTORY DISCREPANCY HAZARD***"
    );

    // Hazard Corrective Action Button
    await clickHandler(
      '//*[@id="mat-dialog-1"]/app-comment/div[2]/form/div[2]/div/button'
    );

    // Save Hazard Corrective Action Date
    await correctiveActionDate();

    await page.type(formControlCorAct, "***HAZARD CORRECTIVE ACTION TEST***");

    // Save Hazard Corrective Action
    await clickHandler(
      '//*[@id="mat-dialog-2"]/app-corrective-action/form/div[3]/mat-icon'
    );

    // Save Hazard Discrepancy
    await clickHandler(
      '//*[@id="mat-dialog-1"]/app-comment/div[2]/div/button[3]'
    );
    console.log("HAZARD DISCREPANCY COMPLETE");

    await page.type(
      "[formcontrolname=HazardComments]",
      "***HAZARD ADDITIONAL COMMENTS***"
    );

    // Hazard Identification & Control Next Button
    await clickHandler(
      "/html/body/app-root/app-layout/div/div/div/app-form/div[2]/div/app-spot-check-safety/mat-accordion/mat-expansion-panel[2]/div/div/div/button[2]"
    );

    console.log("HAZARD IDENTIFICATION & CONTROL COMPLETE");
  } else {


    await clickHandler('//*[@id="cdk-accordion-child-1"]/div/div/button[2]');
  }

  // RULES & WORK PROCEDURES

  console.log("ENTERING RULES & WORK PROCEDURES DATA...");

  if (formController.rulesWorksProcedure) {
    // Satisfactory Rules & Work Procedures Radio
    await clickHandler('//*[@id="mat-radio-10"]/label/span[1]/span[1]');

    // Unsatisfactory Rules & Work Procedures Radio
    await clickHandler(
      '//*[@id="mat-radio-15"]/label/span[1]/span[1]'
    );

    // await page.waitForSelector(formControlComment)
    await page.type(formControlComment, "****RULES DISCREPANCY****");

    // Rules Corrective Action Button
    await clickHandler(
      '//*[@id="mat-dialog-3"]/app-comment/div[2]/form/div[2]/div'
    );

    // //Save Rules Corrective Action Date
    await correctiveActionDate();

    await page.type(formControlCorAct, "***RULES CORRECTIVE ACTION TEST***");

    // Save Rules Corrective Action
    await clickHandler(
      '//*[@id="mat-dialog-4"]/app-corrective-action/form/div[3]/mat-icon'
    );

    // Save Rules Discrepancy
    await clickHandler(
      '//*[@id="mat-dialog-3"]/app-comment/div[2]/div/button[3]'
    );

    console.log("RULES DISCREPANCY COMPLETE");

    await page.type(
      "[formcontrolname=RulesComments]",
      "***RULES ADDITIONAL COMMENTS***"
    );

    // Rules & Work Procedures Next Button
    await clickHandler('//*[@id="cdk-accordion-child-2"]/div/div/button[2]');

    console.log("RULES & WORK PROCEDURES COMPLETE");
  } else {
    await clickHandler('//*[@id="cdk-accordion-child-2"]/div/div/button[2]');
  }

  // INCIDENT REPORTING
  console.log("ENTERING INCIDENT REPORTING DATA...");

  if (formController.incidentReporting) {
    // Satisfactory Incident Reporting Radio Button 1
    await clickHandler(
      '//*[@id="mat-radio-18"]/label/span[1]/span[1]'
    );

    // Satisfactory Incident Reporting Radio Button 2
    await clickHandler(
      '//*[@id="mat-radio-21"]/label/span[1]/span[1]'
    );

    // Satisfactory Incident Reporting Radio Button 3
    await clickHandler(
      '//*[@id="mat-radio-24"]/label/span[1]/span[1]'
    );

    // Unsatisfactory Incident Reporting Radio Button
    await clickHandler(
      '//*[@id="mat-radio-29"]/label/span[1]/span[1]'
    );

    await page.type(formControlComment, "***INCIDENT REPORTING DISCREPANCY***");

    // Incident Reporting Correction Action Button
    await clickHandler(
      '//*[@id="mat-dialog-5"]/app-comment/div[2]/form/div[2]/div'
    );

    // Save Incident Reporting Date
    await correctiveActionDate();

    await page.type(
      "[formcontrolname=CorrectiveActionRequired]",
      "***INCIDENT REPORTING CORRECTIVE ACTION***"
    );

    // Save Incident Corrective Action
    await clickHandler(
      '//*[@id="mat-dialog-6"]/app-corrective-action/form/div[3]/mat-icon'
    );

    // Save Incident Discrepancy
    await clickHandler(
      '//*[@id="mat-dialog-5"]/app-comment/div[2]/div/button[3]'
    );

    await page.type(
      "[formcontrolname=IncidentComments]",
      "***INCIDENT REPORTING ADDITIONAL COMMENTS***"
    );

    // Incident Reporting Next Button
    await clickHandler('//*[@id="cdk-accordion-child-3"]/div/div/button[2]');
    console.log("INCIDENT REPORTING COMPLETE");
  } else {
    await clickHandler('//*[@id="cdk-accordion-child-3"]/div/div/button[2]');
  }

  // COMMUNICATION & TRAINING

  console.log("ENTERING COMMUNICATION & TRAINING DATA...");

  if (formController.communicationAndTraining) {
    // Satisfactory Communication Radio Button 1
    await clickHandler('//*[@id="mat-radio-32"]/label/span[1]');

    await page.type(
      formControlComment,
      "***SATISFACTORY COMMUNICATION COMMENT TEST***"
    );

    // Save Communication Comment
    await clickHandler(
      '//*[@id="mat-dialog-7"]/app-comment/div[2]/form/div[2]/div'
    );

    // Save Incident Reporting Date
    await correctiveActionDate();

    // input corrective action required field 
    await page.type(
      "[formcontrolname=CorrectiveActionRequired]",
      "***INCIDENT REPORTING CORRECTIVE ACTION***"
    );

    //save corrections form 
    await clickHandler('//*[@id="mat-dialog-8"]/app-corrective-action/form/div[3]/mat-icon')
    
    //save communication and trading 
    await clickHandler('//*[@id="mat-dialog-7"]/app-comment/div[2]/div/button[3]')

    // Satisfactory Communication Radio Buttons 2-9
    await clickHandler('//*[@id="mat-radio-36"]/label/span[1]');
    await clickHandler('//*[@id="mat-radio-39"]/label/span[1]');
    await clickHandler('//*[@id="mat-radio-104"]/label/span[1]');
    await clickHandler('//*[@id="mat-radio-107"]/label/span[1]');
    await clickHandler('//*[@id="mat-radio-110"]/label/span[1]');
    await clickHandler('//*[@id="mat-radio-113"]/label/span[1]');
    await clickHandler('//*[@id="mat-radio-116"]/label/span[1]');

    // Unsatisfactory Communication Radio Button 10
    await clickHandler('//*[@id="mat-radio-121"]/label/span[1]');

    await page.type(
      formControlComment,
      "***COMMUNICATION & TRAINING DISCREPANCY***"
    );

    // Communication  Corrective Action Button
    await clickHandler(
      '//*[@id="mat-dialog-9"]/app-comment/div[2]/form/div[2]/div'
    );

    // Saves Communications Corrective Action Date
    await correctiveActionDate();

    await page.type(
      formControlCorAct,
      "***COMMUNICATIONS & TRAINING CORRECTIVE ACTION***"
    );

    // Saves Communications Corrective Action
    await clickHandler(
      '//*[@id="mat-dialog-10"]/app-corrective-action/form/div[3]/mat-icon'
    );

    // Saves Communication Discrepancy
    await clickHandler(
      '//*[@id="mat-dialog-9"]/app-comment/div[2]/div/button[3]'
    );

    // Satisfactory Communication Radio Button 11
    await clickHandler('//*[@id="mat-radio-124"]/label/span[1]/span[1]');

    await page.type(
      "[formcontrolname=CommunicationComments]",
      "***COMMUNICATIONS & TRAINING ADDITIONAL COMMENTS***"
    );

    // Communications & Training Next Button
    await clickHandler('//*[@id="cdk-accordion-child-4"]/div/div/button[2]');
    
    console.log("COMMUNICATIONS & TRAINING COMPLETE");
  } else {

    await clickHandler('//*[@id="cdk-accordion-child-4"]/div/div/button[2]');
  }

  // PERSONAL PROTECTIVE EQUIPMENT

  console.log("ENTERING PERSONAL PROTECTIVE EQUIPMENT DATA...");

  if (formController.personalProtectiveEquipment) {
    // Satisfactory PPE Radio Buttons 1-8
    await clickHandler('//*[@id="mat-radio-42"]/label/span[1]');
    await clickHandler('//*[@id="mat-radio-45"]/label/span[1]');
    await clickHandler('//*[@id="mat-radio-48"]/label/span[1]');
    await clickHandler('//*[@id="mat-radio-51"]/label/span[1]');
    await clickHandler('//*[@id="mat-radio-54"]/label/span[1]');
    await clickHandler('//*[@id="mat-radio-57"]/label/span[1]');
    await clickHandler('//*[@id="mat-radio-61"]/label/span[1]');
    await clickHandler('//*[@id="mat-radio-65"]/label/span[1]');

    // Unsatisfactory PPE Radio Button
    await clickHandler('//*[@id="mat-radio-70"]/label/span[1]/span[1]');

    await page.type(formControlComment, "***PPE DISCREPANCY TEST***");

    // PPE CORRECTIVE ACTION BUTTON
    await clickHandler(
      '//*[@id="mat-dialog-11"]/app-comment/div[2]/form/div[2]/div'
    );

    // Saves PPE Corrective ACtion Date
    await correctiveActionDate();

    await page.type(formControlCorAct, "***PPE CORRECTIVE ACTION***");

    // Saves PPE Corrective ACtion
    await clickHandler(
      '//*[@id="mat-dialog-12"]/app-corrective-action/form/div[3]/mat-icon'
    );

    // Saves PPE Discrepancy
    await clickHandler(
      '//*[@id="mat-dialog-11"]/app-comment/div[2]/div/button[3]'
    );
    console.log("PERSONAL PROTECTIVE EQUIPMENT DISCREPANCY COMPLETED");

    // N/A PPE Radio Button
    await clickHandler('//*[@id="mat-radio-75"]/label/span[1]/span[1]');

    await page.type(
      "[formcontrolname=PersonalEquipmentComments]",
      "***PPE ADDITIONAL COMMENTS TEST***"
    );

    // PPE Next Button
    await clickHandler('//*[@id="cdk-accordion-child-5"]/div/div/button[2]');
    console.log("PERSONAL PROTECTIVE EQUIPMENT COMPLETE");
  } else {
    await clickHandler('//*[@id="cdk-accordion-child-5"]/div/div/button[2]');
  }

  // SAFETY EQUIPMENT

  console.log("ENTERING SAFETY EQUIPMENT DATA...");

  if (formController.safetyEquipment) {
    // Satisfactory Safety Equipment Radio Buttons 1-5
    await clickHandler('//*[@id="mat-radio-77"]/label/span[1]');
    await clickHandler('//*[@id="mat-radio-81"]/label/span[1]');
    await clickHandler('//*[@id="mat-radio-85"]/label/span[1]');
    await clickHandler('//*[@id="mat-radio-89"]/label/span[1]');
    await clickHandler('//*[@id="mat-radio-92"]/label/span[1]');

    // Unsatisfactory Safety Equipment Radio Button
    await clickHandler('//*[@id="mat-radio-97"]/label/span[1]');

    await page.type(
      formControlComment,
      "***SAFETY EQUIPMENT DISCREPANCY TEST***"
    );

    //Safety Equipment Corrective Action Button
    await clickHandler(
      '//*[@id="mat-dialog-13"]/app-comment/div[2]/form/div[2]/div'
    );

    // Saves Safety Equipment Corrective Action Date
    await correctiveActionDate();

    await page.type(
      formControlCorAct,
      "***SAFETY EQUIPMENT CORRECTIVE ACTION***"
    );

    // Saves Safety Equipment Corrective Action
    await clickHandler(
      '//*[@id="mat-dialog-14"]/app-corrective-action/form/div[3]/mat-icon'
    );

    // Saves Safety Equipment Discrepancy
    await clickHandler(
      '//*[@id="mat-dialog-13"]/app-comment/div[2]/div/button[3]'
    );
    console.log("SAFETY EQUIPMENT DISCREPANCY COMPLETE");

    // N/A Safety Equipment Radio Button
    await clickHandler('//*[@id="mat-radio-102"]/label/span[1]/span[1]');

    await page.type(
      "[formcontrolname=SafetyEquipmentComments]",
      "***SAFETY EQUIPMENT ADDITIONAL COMMENTS TEST***"
    );

    //click next button
    await clickHandler('//*[@id="cdk-accordion-child-6"]/div/div/button[2]');

    console.log("SAFETY EQUIPMENT COMPLETE");
  } else {
    await clickHandler('//*[@id="cdk-accordion-child-6"]/div/div/button[2]');
  }

  //Clicks next on discrepancies
  await clickHandler('//*[@id="cdk-accordion-child-7"]/div/div/button[2]');

  //click next on comments
  await clickHandler('//*[@id="cdk-accordion-child-8"]/div/div/button[2]');

  //Clicks Signature Tab
  await clickHandler(
    "/html/body/app-root/app-layout/div/div/div/app-form/div[2]/div/app-spot-check-safety/mat-accordion/mat-expansion-panel[10]"
  );

  // Completes forms and generates pdf
  // await clickHandler('//*[@id="cdk-accordion-child-9"]/div/div/mat-icon');

  // page.close()
})();
