// tests/origin.spec.ts

import { test } from '@playwright/test';
import PricingPage from '../pages/PricingPage';
import { PlanDetailsPage } from '../pages/PlanDetailsPage';
import { validatePdfContainsGas } from '../lib/pdfHelper';
import { testData } from '../data/test-data';



test.describe('Origin Energy - Pricing Flow', () => {

  test('Validate Gas plan PDF from pricing page', async ({ page, context }) => {

    const pricingPage = new PricingPage(page);

    // Step 1: Navigate
    await pricingPage.navigate();

    // Step 2–3: Search & select address
    await pricingPage.searchAddress(
      testData.address,
      testData.suggestion
    );

  // Step 6: Verify plans displayed
    await pricingPage.verifyPlansDisplayed();
    await pricingPage.verifyPlanslistNameDisplayed(testData.planName);
    await pricingPage.verifyPlanslistDisplayed();

    // Step 5: Uncheck electricity
    await pricingPage.uncheckElectricity();

    // Step 6: Verify plans still displayed
    await pricingPage.verifyPlansDisplayed();
    await pricingPage.verifyPlanslistNameDisplayed(testData.planName);
    await pricingPage.verifyPlanslistDisplayed();
    
    // Step 7–8: Open plan in new tab
  
    const newTab = await pricingPage.clickFirstPlan(context);
    
    const planDetailsPage = new PlanDetailsPage(newTab);

    await planDetailsPage.verifyPageOpened();

    // Step 9: Download PDF
    const filePath = await planDetailsPage.downloadPdfFromUrl();

    // Step 10: Validate PDF content
    await validatePdfContainsGas(filePath);
  

  });

});