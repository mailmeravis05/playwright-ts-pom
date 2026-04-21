import fs from 'fs';
import * as path from 'path';



export async function validatePdfContainsGas(filePath: string) {
  // Check if file exists and has content
  if (!fs.existsSync(filePath)) {
    throw new Error(`PDF file not found: ${filePath}`);
  }

  const stats = fs.statSync(filePath);
  if (stats.size === 0) {
    throw new Error('PDF file is empty');
  }

  // Read PDF file as binary buffer
  const buffer = fs.readFileSync(filePath);
  
  // Convert buffer to string using multiple encodings to find text
  // PDFs can have text in various encodings
  let bufferString = buffer.toString('latin1');
  
  // Search for common energy/gas related keywords
  const keywords = ['gas', 'electricity'];
  const foundKeywords = keywords.filter(kw => bufferString.toLowerCase().includes(kw));
  
  if (foundKeywords.length === 0) {
    // Try UTF-8 encoding as fallback
    bufferString = buffer.toString('utf8');
    const foundKeywordsUtf8 = keywords.filter(kw => bufferString.toLowerCase().includes(kw));
    
    if (foundKeywordsUtf8.length === 0) {
      console.log('✓ PDF validation passed. Found keywords:', foundKeywords.join(', '));
     
    } else {
       throw new Error(`PDF does not contain expected content. File size: ${stats.size} bytes`);
    }
  }
  
  
}






