const puppeteer = require("puppeteer");
require("dotenv").config();
(async () => {
  const { URL, EMAIL, PASSWORD } = process.env;

  const formController = {
    thingsToDoCheck: true,

  }

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

  console.log("SELECTING MEANINGFUL SITE TOUR");

  //Meaningful site tour inspection button
  await clickHandler(
    "/html/body/app-root/app-layout/div/div/div/app-home/div[1]/mat-card/mat-card-header"
  );
  
  await page.waitForNetworkIdle();

  const formControlName = "[formcontrolname=Name]"; //included in Tour field*
  const formControlLocation = "[formcontrolname=Location]";
  const formControlFirstAndLastName = "[id=mat-input-4]";
  const formControlSupervisorName = "[id=mat-input-5]";

  console.log("INPUTTING FORM INFO...");

  //Conducting Your Tour
  await page.type(formControlName, "**TEST**");
  await page.type(formControlLocation, "**CANADA**");
  await page.type(formControlFirstAndLastName, "Form Loco");
  await clickHandler('//*[@id="mat-option-87"]/span');
  await page.type(formControlSupervisorName, "Alvin");
  await clickHandler('//*[@id="mat-option-138"]');
  await clickHandler('//*[@id="cdk-accordion-child-0"]/div/div/button');

  if (formController.thingsToDoCheck) {

    //Things To Do/Check
  await clickHandler('//*[@id="mat-checkbox-1"]/label/span[1]');
  await clickHandler('//*[@id="mat-checkbox-2"]/label/span[1]');
  await clickHandler('//*[@id="mat-checkbox-3"]/label/span[1]');
  await clickHandler('//*[@id="mat-checkbox-4"]/label/span[1]');
  await clickHandler('//*[@id="mat-checkbox-5"]/label/span[1]');
  await clickHandler('//*[@id="mat-checkbox-6"]/label/span[1]');
  await clickHandler('//*[@id="mat-checkbox-7"]/label/span[1]');
  await clickHandler('//*[@id="mat-checkbox-8"]/label/span[1]');
  await clickHandler('//*[@id="mat-checkbox-9"]/label/span[1]');
  await clickHandler('//*[@id="mat-checkbox-10"]/label/span[1]');
  await clickHandler('//*[@id="mat-checkbox-11"]/label/span[1]');
  await clickHandler('//*[@id="mat-checkbox-12"]/label/span[1]');
  await clickHandler('//*[@id="mat-checkbox-13"]/label/span[1]');

  //click next button
  await clickHandler('//*[@id="cdk-accordion-child-1"]/div/div/button');
  } else {

    //click next button 
    await clickHandler('//*[@id="cdk-accordion-child-1"]/div/div/button');

  }

  //Tour Etiquette Plan for Success -> clicks next
  await clickHandler('//*[@id="cdk-accordion-child-2"]/div/div/button');

  //Observations, Improvement & Feedback
  const formControlPO = "[formcontrolname=PositiveObservations]";
  const formControlIO = "[formcontrolname=ImprovementOpportunities]";
  const formControlFS = "[formcontrolname=FeedbackSummary]";


  await page.type(formControlPO, "**TEST**");
  await page.type(formControlIO, "**TEST**");
  await page.type(formControlFS, "**TEST**");

  //click next button 
  await clickHandler('//*[@id="cdk-accordion-child-3"]/div/div/button[2]');
})();
