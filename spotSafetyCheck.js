const puppeteer = require('puppeteer');
require('dotenv').config()
  ; (async () => {

    const { URL, EMAIL, PASSWORD } = process.env

    const browser = await puppeteer.launch({ headless: false });
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

    console.log('SELECTING SPOT CHECK FORM...');
    const spotLink = await page.$x('/html/body/app-root/app-layout/div/div/div/app-home/div[2]/mat-card/mat-card-header/div[2]/mat-card-title');

    await spotLink[0].click();

    await page.waitForNetworkIdle();

    const mstLink = await page.$x('/html/body/app-root/app-layout/div/div/div/app-home/div[1]/mat-card/mat-card-header/div[2]/mat-card-title');

    if (typeof (await mstLink[0]?.getProperty('innerText'))?.jsonValue() !== 'object') {
      console.log('SUCESSFUL ACCESS TO SPOT CHECK INSPECTION FORM')
    } else {
      console.log('******* ERROR WITH ACCESSING SPOT CHECK INSPECTION FORM *******')
    }

    // WORKSITE SAFETY MANAGEMENT REVIEW

    console.log('ENTERING WORKSITE SAFETY MANAGEMENT REVIEW DATA...')

    await page.type('[formcontrolname=CompanyName]', '***COMPANY TEST NAME***');
    await page.type('[formcontrolname=EmployeeName]', '***TEST EMPLOYEE NAME***');
    await page.type('[formcontrolname=JobDescription]', '***TEST JOB DESCRIPTION***');
    await page.type('[formcontrolname=Location]', '***LOCATION TEST***');

    const evaluatorList = await page.$x('//*[@id="mat-input-6"]');
    await evaluatorList[0].click();

    await page.waitForXPath('//*[@id="mat-option-87"]/span');

    const evaluator = await page.$x('//*[@id="mat-option-87"]/span');
    await evaluator[0].click();


    const supervisorList = await page.$x('//*[@id="mat-input-7"]');
    await supervisorList[0].click();

    await page.waitForXPath('//*[@id="mat-option-137"]/span');

    const supervisor = await page.$x('//*[@id="mat-option-137"]/span');
    await supervisor[0].click();

    const wsmrNextButton = await page.$x('//*[@id="cdk-accordion-child-0"]/div/div/button');
    await wsmrNextButton[0].click();

    await page.waitForNetworkIdle();

    console.log('WORKSITE SAFETY MANAGEMENT REVIEW PAGE COMPLETE')

    // HAZARD IDENTIFICATION & CONTROL

    console.log('ENTERING HAZARD IDENTIFICATION & CONTROL DATA...')

    const satHazard = await page.$x('//*[@id="mat-radio-2"]/label/span[1]');
    await satHazard[0].click();
    await page.waitForNetworkIdle();
    await page.type('[formcontrolname=comment]', "***SATISFACTORY COMMENT HAZARD***");
    const commentSave1 = await page.$x('//*[@id="mat-dialog-0"]/app-comment/div[2]/div/button[3]');
    await commentSave1[0].click();
    await page.waitForNetworkIdle();
    console.log('HAZARD COMMENT COMPLETE')

    const unsatHazard = await page.$x('//*[@id="mat-radio-7"]/label/span[1]');
    await unsatHazard[0].click();
    await page.waitForNetworkIdle();
    await page.type('[formcontrolname=comment]', "***UNSATISFACTORY DISCREPANCY HAZARD***");

    const hazardCorActButton = await page.$x('//*[@id="mat-dialog-1"]/app-comment/div[2]/form/div[2]/div/button');
    await hazardCorActButton[0].click();
    await page.waitForXPath('//*[@id="mat-dialog-2"]/app-corrective-action/form/ion-datetime[1]');
    await page.waitForNetworkIdle();

    await page.click('[formcontrolname=DateCorrectiveActionToBeCompleted]');
    await page.waitForNetworkIdle();

    const dateButtonPath = '/html/body/ion-picker/div[2]/div[1]/div[2]/button';
    const corActDateDone1 = await page.$x(dateButtonPath);
    await corActDateDone1[0].click();
    await page.waitForNetworkIdle();

    await page.type('[formcontrolname=CorrectiveActionRequired]', '***HAZARD CORRECTIVE ACTION TEST***')

    const corActSave1 = await page.$x('//*[@id="mat-dialog-2"]/app-corrective-action/form/div[3]/mat-icon');
    await corActSave1[0].click();
    await page.waitForNetworkIdle();

    const discrepancySave1 = await page.$x('//*[@id="mat-dialog-1"]/app-comment/div[2]/div/button[3]');
    await discrepancySave1[0].click();
    await page.waitForNetworkIdle();
    console.log('HAZARD DISCREPANCY COMPLETE')

    await page.type('[formcontrolname=HazardComments]', '***HAZARD ADDITIONAL COMMENTS***');
    const hazardNextButton = await page.$x('//*[@id="cdk-accordion-child-1"]/div/div/button[2]');
    await hazardNextButton[0].click();
    await page.waitForNetworkIdle();
    console.log('HAZARD IDENTIFICATION & CONTROL COMPLETE');

    // RULES & WORK PROCEDURES

    console.log('ENTERING RULES & WORK PROCEDURES DATA...');

    const satRules = await page.$x('/html/body/app-root/app-layout/div/div/div/app-form/div[2]/div/app-spot-check-safety/mat-accordion/mat-expansion-panel[3]/div/div/app-rules-work-procedures/div/form/div[3]/mat-radio-group/mat-radio-button[1]');
    await satRules[0].click();

    const unsatRules = await page.$x('/html/body/app-root/app-layout/div/div/div/app-form/div[2]/div/app-spot-check-safety/mat-accordion/mat-expansion-panel[3]/div/div/app-rules-work-procedures/div/form/div[5]/mat-radio-group/mat-radio-button[2]');
    await unsatRules[0].click();
    await page.waitForNetworkIdle();

    await page.type('[formcontrolname=comment]', '****RULES DISCREPANCY****');

    const rulesCorActButton = await page.$x('//*[@id="mat-dialog-3"]/app-comment/div[2]/form/div[2]/div/button');
    await rulesCorActButton[0].click();
    await page.waitForNetworkIdle();

    await page.click('[formcontrolname=DateCorrectiveActionToBeCompleted]');
    await page.waitForNetworkIdle();

    const corActDateDone2 = await page.$x(dateButtonPath);
    await corActDateDone2[0].click();
    await page.waitForNetworkIdle();

    await page.type('[formcontrolname=CorrectiveActionRequired]', '***RULES CORRECTIVE ACTION TEST***')
    const corActSave2 = await page.$x('//*[@id="mat-dialog-4"]/app-corrective-action/form/div[3]/mat-icon');
    await corActSave2[0].click();
    await page.waitForNetworkIdle();

    const discrepancySave2 = await page.$x('//*[@id="mat-dialog-3"]/app-comment/div[2]/div/button[3]')
    await discrepancySave2[0].click();
    console.log('RULES DISCREPANCY COMPLETE');

    await page.type('[formcontrolname=RulesComments]', '***RULES ADDITIONAL COMMENTS***');
    const rulesNextButton = await page.$x('//*[@id="cdk-accordion-child-2"]/div/div/button[2]');
    await rulesNextButton[0].click();
    await page.waitForNetworkIdle();
    console.log('RULES & WORK PROCEDURES COMPLETE');
    
    // INCIDENT REPORTING
    console.log('ENTERING INCIDENT REPORT DATA...');

    




    // await page.waitForNetworkIdle();
    // page.close()
  })()