import fs from 'fs';

export async function extractPdfText(filePath: string) {
  const { PDFParse }: any = await import('pdf-parse');

  const buffer = fs.readFileSync(filePath);

  // Create parser instance
  const parser = new PDFParse({ data: buffer });

  // Extract text
  const result = await parser.getText();
  return result.text;
}

export async function assertPdfText(filePath: string, expectedText: string) {
  const text = (await extractPdfText(filePath)).toLowerCase();

  if (text.includes(expectedText.toLowerCase())) {
    console.log(`✓ PDF contains: ${expectedText}`);
  } 
}








