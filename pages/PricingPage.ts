
import { Page, expect, BrowserContext } from '@playwright/test';


export default class PricingPage {
  constructor(private page: Page) {}

  private addressInput = () =>
    this.page.getByRole('combobox', { name: 'Your address' });

  private suggestionItem = (text: string) =>
    this.page.locator('li', { hasText: text }).first();

   private plansTable = () =>
    this.page.getByRole('table'); // preferred

  private tableHeaders = () =>
    this.plansTable().locator('thead tr th');

  private tableRows = () =>
    this.plansTable().locator('tr');
  private electricityCheckbox = () =>
    this.page.getByLabel('Electricity').first();

  private planLink = () =>
    this.tableRows().nth(2).locator('a');


  async navigate() {
    await this.page.goto('https://www.originenergy.com.au/pricing.html', {
      waitUntil: 'networkidle',
    });
    // Wait for address input to be ready
    //await this.addressInput().waitFor({ state: 'attached', timeout: 150000 });
  }

  async searchAddress(address: string, suggestionText: string) {
    const input = this.addressInput();
    
    
    // Fill address with a slight delay to allow autocomplete to trigger
    await input.fill(address);
    await this.page.waitForTimeout(500);

    await expect(this.suggestionItem(suggestionText))
      .toBeVisible({ timeout: 10000 });

    await this.suggestionItem(suggestionText).click();
  }

  async verifyPlansDisplayed() {
    await expect(this.plansTable())
      .toBeVisible({ timeout: 15000 });
  }
  async verifyPlanslistNameDisplayed(planName: string) {
    await expect(this.tableHeaders().nth(2)).
      toHaveText(planName, { timeout: 10000 });
      
  }
  async verifyPlanslistDisplayed() {
    const rowCount = await this.tableRows().count();
    expect(rowCount).toBeGreaterThan(1);
           
  }
  

  async uncheckElectricity() {
    if (await this.electricityCheckbox().isChecked()) {
      await this.electricityCheckbox().uncheck();
    }
  }

  async clickFirstPlan(context: BrowserContext) {
    const [newTab] = await Promise.all([
      context.waitForEvent('page'),
      this.planLink().click()
    ]);

    await newTab.waitForLoadState('networkidle');
    return newTab;
  }
}