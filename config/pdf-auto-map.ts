/*
  Auto-detect anchor positions in the PDF using pdfjs-dist text content.
  Strategy:
   - Define anchors (labels) to search per page, e.g., 'Arbeitnehmer/in:', 'Geburtsdatum:', etc.
   - For each anchor item, compute a placement relative to the text item (x+offset, same y).
   - Return a placements map compatible with PdfFieldMap entries (possibly multiple per field).
*/

import { getDocument } from "pdfjs-dist";
import type { PdfFieldMap } from "./pdf-maps";

export type AnchorRule = {
   field: string; // e.g., 'vorname'
   label: string; // text to find in PDF
   dx?: number; // x offset to place value
   dy?: number; // y offset
   size?: number;
   page?: number; // if known; else scan all pages (0-based index)
};

export async function buildAutoMap(
   url: string,
   rules: AnchorRule[]
): Promise<PdfFieldMap> {
   const ab = await fetch(url).then((r) => r.arrayBuffer());
   const pdf = await getDocument({ data: new Uint8Array(ab) }).promise;
   const map: PdfFieldMap = {};

   for (let p = 1; p <= pdf.numPages; p++) {
      const page = await pdf.getPage(p);
      const viewport = page.getViewport({ scale: 1.0 });
      const textContent = await page.getTextContent();

      for (const rule of rules) {
         if (rule.page !== undefined && rule.page !== p - 1) continue; // our PdfFieldMap is 0-based
         for (const item of textContent.items as any[]) {
            const str: string = item.str || "";
            if (!str.includes(rule.label)) continue;
            const transform = item.transform as number[]; // [a,b,c,d,e,f]
            const x = transform[4];
            const yFromTop = transform[5];
            const y = viewport.height - yFromTop; // convert to bottom-left origin
            const placement = {
               page: p - 1,
               x: x + (rule.dx ?? 120),
               y: y + (rule.dy ?? 0),
               size: rule.size ?? 11,
            };
            if (!map[rule.field]) map[rule.field] = [];
            map[rule.field]!.push(placement);
         }
      }
   }

   return map;
}
