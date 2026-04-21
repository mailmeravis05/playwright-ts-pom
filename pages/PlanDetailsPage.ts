// pages/PlanDetailsPage.ts

import { Page, expect } from '@playwright/test';
import * as path from 'path';
import fs from 'fs';

export class PlanDetailsPage {
  constructor(private page: Page) {}
  
  async verifyPageOpened() {
    await expect(this.page).toHaveURL(/content|dam|pricing/i);
  }

  async downloadPdfFromUrl(): Promise<string> {

    // Step 1: Ensure it's a PDF page
    await expect(this.page).toHaveURL(/\.pdf/);

    const pdfUrl = this.page.url();
    console.log('PDF URL:', pdfUrl);

    // Step 2: Fetch PDF using Playwright request
    const response = await this.page.request.get(pdfUrl);
    expect(response.ok()).toBeTruthy();

    const buffer = await response.body();

    // Step 3: Save file
    const filePath = path.resolve('downloads/plan.pdf');
    fs.writeFileSync(filePath, buffer);

    return filePath;
  }
}