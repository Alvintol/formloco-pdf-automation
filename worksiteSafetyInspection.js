const puppeteer= require("puppeteer")
require("dotenv").config();
(async () => {

  const { URL, EMAIL, PASSWORD } = process.env;

  const browser = await puppeteer.launch({ headless: false });

  const page = await browser.newPage();
  await page.evaluateOnNewDocument(function() {
    navigator.geolocation.getCurrentPosition = function (cb) {
      setTimeout(() => {
        cb({
          'coords': {
            accuracy: 21,
            altitude: null,
            altitudeAccuracy: null,
            heading: null,
            latitude: 23.129163,
            longitude: 113.264435,
            speed: null
          }
        })
      }, 1000)
    }
  });
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
  
  console.log('SELECTION WORKSITE-SAFETY-INSPECTION');
  
  await clickHandler('/html/body/app-root/app-layout/div/div/div/app-home/div[4]/mat-card/mat-card-header')
  
  await page.waitForNetworkIdle();


  //INPUTTING WORK SITE INFO
  console.log('INPUTTING WORKSITE INFO...');

  const workerCompletingInspection = "[id=mat-input-2]"
  const supervisorName = "[id=mat-input-3]"
  const supervisorPhone = "[id=mat-input-4]"
  const worksiteLocation = "[id=mat-input-6]"
  const lsdUwi = "[id=mat-input-7]"
  const jobProjectNumber = "[id=mat-input-10]"
  const starsSiteNumber = "[id=mat-input-11]"

  await page.type(workerCompletingInspection, 'Form Loco')
  await clickHandler('//*[@id="mat-option-87"]/span')
  await page.type(supervisorName, 'Alvin')
  await clickHandler('//*[@id="mat-option-137"]/span')
  await page.type(supervisorPhone, '000-000-0000')
  await clickHandler('//*[@id="mat-input-5"]')
  await page.waitForXPath('//*[@id="mat-option-139"]/span')
  await clickHandler('//*[@id="mat-option-139"]/span')
  await page.type(worksiteLocation, 'Canada')
  await page.type(lsdUwi, '4638-hsjd')
  await page.type(jobProjectNumber, '87654')
  await clickHandler('//*[@id="mat-select-value-1"]/span')
  await page.waitForXPath('//*[@id="mat-option-255"]/span')
  await clickHandler('//*[@id="mat-option-255"]/span')
  await page.type(starsSiteNumber, '8329304')
  await page.type('[formcontrolname=ScopeOfWork]', 'check-up and registration')

  await clickHandler('//*[@id="cdk-accordion-child-0"]/div')

  await clickHandler('//*[@id="cdk-accordion-child-0"]/div/div/button')
  
  

  //HAZARD INDICATION & COMMUNICATION 
  console.log('FILLING OUT HAZARD INDICATION & COMMUNICATION');

  //Site hazard assessment completed - YES 
  await clickHandler('//*[@id="mat-radio-2"]/label/span[1]')

  //Scope of work for the project clearly defined - NO 
  await clickHandler('//*[@id="mat-radio-6"]/label/span[1]/span[1]')
  await page.type('[formcontrolname=comment]', '**TEST**')
  await clickHandler('//*[@id="mat-dialog-0"]/app-comment/div[2]/form/div[2]/div')
  await page.click('[formcontrolname=DateCorrectiveActionToBeCompleted]')
  await page.waitForXPath('//*[@id="ion-overlay-1"]/div[2]/div[1]/div[2]')
  await clickHandler('//*[@id="ion-overlay-1"]/div[2]/div[1]/div[2]')
  await page.click('[formcontrolname=CorrectiveActionRequired]')
  await page.type('[formcontrolname=CorrectiveActionRequired]', '**TEST**')
  await clickHandler('//*[@id="mat-dialog-1"]/app-corrective-action/form/div[3]/mat-icon')
  await page.waitForXPath('//*[@id="mat-dialog-0"]/app-comment/div[2]/div/button[3]')
  await clickHandler('//*[@id="mat-dialog-0"]/app-comment/div[2]/div/button[3]')

  //Potential hazards.... - YES 
  await clickHandler('//*[@id="mat-radio-8"]/label/span[1]/span[1]')

  //Summit health... - NO 
  await clickHandler('//*[@id="mat-radio-12"]/label/span[1]/span[1]')
  await page.type('[formcontrolname=comment]', '**TEST**')
  await clickHandler('//*[@id="mat-dialog-2"]/app-comment/div[2]/form/div[2]/div')
  await page.click('[formcontrolname=DateCorrectiveActionToBeCompleted]')
  await page.waitForXPath('//*[@id="ion-overlay-2"]/div[2]/div[1]/div[2]')
  await clickHandler('//*[@id="ion-overlay-2"]/div[2]/div[1]/div[2]')
  await page.click('[formcontrolname=CorrectiveActionRequired]')
  await page.type('[formcontrolname=CorrectiveActionRequired]', '**TEST**')
  await clickHandler('//*[@id="mat-dialog-3"]/app-corrective-action/form/div[3]/mat-icon')
  await page.waitForXPath('//*[@id="mat-dialog-2"]/app-comment/div[2]/div/button[3]')
  await clickHandler('//*[@id="mat-dialog-2"]/app-comment/div[2]/div/button[3]')

  //Occupational Health - YES 
  await clickHandler('//*[@id="mat-radio-14"]/label/span[1]')

  //Daily safety meetings... NO 
  await clickHandler('//*[@id="mat-radio-18"]/label/span[1]/span[1]')
  await page.type('[formcontrolname=comment]', '**TEST**')
  await clickHandler('//*[@id="mat-dialog-4"]/app-comment/div[2]/form/div[2]/div')
  await page.click('[formcontrolname=DateCorrectiveActionToBeCompleted]')
  await page.waitForXPath('//*[@id="ion-overlay-3"]/div[2]/div[1]/div[2]')
  await clickHandler('//*[@id="ion-overlay-3"]/div[2]/div[1]/div[2]')
  await page.click('[formcontrolname=CorrectiveActionRequired]')
  await page.type('[formcontrolname=CorrectiveActionRequired]', '**TEST**')
  await clickHandler('//*[@id="mat-dialog-5"]/app-corrective-action/form/div[3]/mat-icon')
  await page.waitForXPath('//*[@id="mat-dialog-4"]/app-comment/div[2]/div/button[3]')
  await clickHandler('//*[@id="mat-dialog-4"]/app-comment/div[2]/div/button[3]')

  //All site personal have the appropriate training and safety tickets - YES 
  await clickHandler('//*[@id="mat-radio-20"]/label/span[1]/span[1]')

  //All site personnel are wearing site-specific PPE -- NO 
  await clickHandler('//*[@id="mat-radio-24"]/label/span[1]/span[1]')
  await page.type('[formcontrolname=comment]', '**TEST**')
  await clickHandler('//*[@id="mat-dialog-6"]/app-comment/div[2]/form/div[2]/div')
  await page.click('[formcontrolname=DateCorrectiveActionToBeCompleted]')
  await page.waitForXPath('//*[@id="ion-overlay-4"]/div[2]/div[1]/div[2]')
  await clickHandler('//*[@id="ion-overlay-4"]/div[2]/div[1]/div[2]')
  await page.click('[formcontrolname=CorrectiveActionRequired]')
  await page.type('[formcontrolname=CorrectiveActionRequired]', '**TEST**')
  await clickHandler('//*[@id="mat-dialog-7"]/app-corrective-action/form/div[3]/mat-icon')
  await page.waitForXPath('//*[@id="mat-dialog-6"]/app-comment/div[2]/div/button[3]')
  await clickHandler('//*[@id="mat-dialog-6"]/app-comment/div[2]/div/button[3]')

  //Finish HAZARD INDICATION & COMMUNICATION section 
  await clickHandler('//*[@id="cdk-accordion-child-1"]/div/div/button[2]')

  //JOB SITE MANAGEMENT 
  console.log('FILLING OUT JOB SITE MANAGEMENT');

  //Work area is clearly defined -- YES
  await clickHandler('//*[@id="mat-radio-26"]/label/span[1]/span[1]')

  //Site is free of trip hazards and other housekeeping concerns -- NO 
  await clickHandler('//*[@id="mat-radio-31"]/label/span[1]/span[1]')
  await page.type('[formcontrolname=comment]', '**TEST**')
  await clickHandler('//*[@id="mat-dialog-8"]/app-comment/div[2]/form/div[2]/div')
  await page.click('[formcontrolname=DateCorrectiveActionToBeCompleted]')
  await page.waitForXPath('//*[@id="ion-overlay-5"]/div[2]/div[1]/div[2]')
  await clickHandler('//*[@id="ion-overlay-5"]/div[2]/div[1]/div[2]')
  await page.click('[formcontrolname=CorrectiveActionRequired]')
  await page.type('[formcontrolname=CorrectiveActionRequired]', '**TEST**')
  await clickHandler('//*[@id="mat-dialog-9"]/app-corrective-action/form/div[3]/mat-icon')
  await page.waitForXPath('//*[@id="mat-dialog-8"]/app-comment/div[2]/div/button[3]')
  await clickHandler('//*[@id="mat-dialog-8"]/app-comment/div[2]/div/button[3]')

  //All open excavations are clearly marked -- N/A
  await clickHandler('//*[@id="mat-radio-35"]/label/span[1]/span[1]')

  //Public access to the site controlled -- YES 
  await clickHandler('//*[@id="mat-radio-37"]/label/span[1]/span[1]')

  //Prime contractor clearly identified with signage -- NO 
  await clickHandler('//*[@id="mat-radio-42"]/label/span[1]/span[1]')
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

  //Is there emergency equipment on site? -- N/A
  await clickHandler('//*[@id="mat-radio-47"]/label/span[1]/span[1]')
  
  //First aid kit available and stocked -- YES 
  await clickHandler('//*[@id="mat-radio-49"]/label/span[1]/span[1]')

  //Blankets and stretcher available -- NO 
  await clickHandler('//*[@id="mat-radio-53"]/label/span[1]/span[1]')
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

  //Eye wash bottle available -- YES 
  await clickHandler('//*[@id="mat-radio-56"]/label/span[1]/span[1]')

  //Spill kit available -- N/A 
  await clickHandler('//*[@id="mat-radio-62"]/label/span[1]/span[1]')

  //The H2S personal gas monitors onsite have been bumped -- NO
  await clickHandler('//*[@id="mat-radio-65"]/label/span[1]/span[1]')
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

  //finish JOB SITE MANAGEMENT 
  await clickHandler('//*[@id="cdk-accordion-child-2"]/div/div/button[2]')

  //FIRE EXTINGUISHER(S) SECTION 

  console.log("INPUTTING FIRE EXTINGUISHER(S) INFO...");

  //20 lb minimum fire extinguisher available -- YES
  await clickHandler('//*[@id="mat-radio-68"]/label/span[1]/span[1]')

  //Fire extinguisher(s) tag attached Inspected monthly and recorded -- NO
  await clickHandler('//*[@id="mat-radio-137"]/label/span[1]/span[1]')
  await page.type("[formcontrolname=comment]", '**TEST**');
  await clickHandler('//*[@id="mat-dialog-16"]/app-comment/div[2]/form/div[2]/div')
  await page.click('[formcontrolname=DateCorrectiveActionToBeCompleted]')
  await page.waitForXPath('//*[@id="ion-overlay-9"]/div[2]/div[1]/div[2]')
  await clickHandler('//*[@id="ion-overlay-9"]/div[2]/div[1]/div[2]')
  await page.click('[formcontrolname=CorrectiveActionRequired]')
  await page.type('[formcontrolname=CorrectiveActionRequired]', '**TEST**')
  await clickHandler('//*[@id="mat-dialog-17"]/app-corrective-action/form/div[3]/mat-icon')
  await page.waitForXPath('//*[@id="mat-dialog-16"]/app-comment/div[2]/div/button[3]')
  await clickHandler('//*[@id="mat-dialog-16"]/app-comment/div[2]/div/button[3]')

  //Fire extinguisher(s) visible and unobstructed -- YES
  await clickHandler('//*[@id="mat-radio-139"]/label/span[1]/span[1]')

  //Fire extinguishers showing charge (gauge indicator must be in the green zone indicating it is) -- NO 
  await clickHandler('//*[@id="mat-radio-143"]/label/span[1]/span[1]')
  await page.type("[formcontrolname=comment]", '**TEST**');
  await clickHandler('//*[@id="mat-dialog-18"]/app-comment/div[2]/form/div[2]/div')
  await page.click('[formcontrolname=DateCorrectiveActionToBeCompleted]')
  await page.waitForXPath('//*[@id="ion-overlay-10"]/div[2]/div[1]/div[2]')
  await clickHandler('//*[@id="ion-overlay-10"]/div[2]/div[1]/div[2]')
  await page.click('[formcontrolname=CorrectiveActionRequired]')
  await page.type('[formcontrolname=CorrectiveActionRequired]', '**TEST**')
  await clickHandler('//*[@id="mat-dialog-19"]/app-corrective-action/form/div[3]/mat-icon')
  await page.waitForXPath('//*[@id="mat-dialog-18"]/app-comment/div[2]/div/button[3]')
  await clickHandler('//*[@id="mat-dialog-18"]/app-comment/div[2]/div/button[3]')

  //Fire extinguisher safety pins are in place and secured to prevent an accidental discharge -- YES
  await clickHandler('//*[@id="mat-radio-145"]/label/span[1]/span[1]')

  //Fire extinguishers operating instructions on the name plate are legible and face outwardss -- NO
  await clickHandler('//*[@id="mat-radio-149"]/label/span[1]/span[1]')
  await page.type("[formcontrolname=comment]", '**TEST**');
  await clickHandler('//*[@id="mat-dialog-20"]/app-comment/div[2]/form/div[2]/div')
  await page.click('[formcontrolname=DateCorrectiveActionToBeCompleted]')
  await page.waitForXPath('//*[@id="ion-overlay-11"]/div[2]/div[1]/div[2]')
  await clickHandler('//*[@id="ion-overlay-11"]/div[2]/div[1]/div[2]')
  await page.click('[formcontrolname=CorrectiveActionRequired]')
  await page.type('[formcontrolname=CorrectiveActionRequired]', '**TEST**')
  await clickHandler('//*[@id="mat-dialog-21"]/app-corrective-action/form/div[3]/mat-icon')
  await page.waitForXPath('//*[@id="mat-dialog-20"]/app-comment/div[2]/div/button[3]')
  await clickHandler('//*[@id="mat-dialog-20"]/app-comment/div[2]/div/button[3]')

  //No signs of visible damage to fire extinguisher (rust, dents or other signs of damage) -- YES
  await clickHandler('//*[@id="mat-radio-151"]/label/span[1]/span[1]')

  //External fire extinguisher certification within 12 months (must be certified by 3rd party annually) -- NO
  await clickHandler('//*[@id="mat-radio-155"]/label/span[1]/span[1]')
  await page.type("[formcontrolname=comment]", '**TEST**');
  await clickHandler('//*[@id="mat-dialog-22"]/app-comment/div[2]/form/div[2]/div')
  await page.click('[formcontrolname=DateCorrectiveActionToBeCompleted]')
  await page.waitForXPath('//*[@id="ion-overlay-12"]/div[2]/div[1]/div[2]')
  await clickHandler('//*[@id="ion-overlay-12"]/div[2]/div[1]/div[2]')
  await page.click('[formcontrolname=CorrectiveActionRequired]')
  await page.type('[formcontrolname=CorrectiveActionRequired]', '**TEST**')
  await clickHandler('//*[@id="mat-dialog-23"]/app-corrective-action/form/div[3]/mat-icon')
  await page.waitForXPath('//*[@id="mat-dialog-22"]/app-comment/div[2]/div/button[3]')
  await clickHandler('//*[@id="mat-dialog-22"]/app-comment/div[2]/div/button[3]')
  
  //Finish Fire Extinguisher(s) section m
  await clickHandler('//*[@id="cdk-accordion-child-3"]/div/div/button[2]')











})()