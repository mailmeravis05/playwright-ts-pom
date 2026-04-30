// utils/csvHelper.ts
import { parse } from 'csv-parse/sync';
import fs from 'fs';
import path from 'path';

export function ReadCsv(filePath: string) {
    const resolvedPath = path.resolve(filePath);
    if (!fs.existsSync(resolvedPath)) {
      throw new Error(`CSV file not found: ${resolvedPath}`);
    }
    const csvContent = fs.readFileSync(resolvedPath, 'utf8');
    const records = parse(csvContent, {
      columns: true,
      skip_empty_lines: true,
      
    });
    return records;
}

  
