import { NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";
import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";

type AnchorRule = {
   field: string;
   label: string;
   dx?: number;
   dy?: number;
   size?: number;
   page?: number; // 0-based
};

type PdfFieldMap = Record<
   string,
   Array<{ page: number; x: number; y: number; size?: number }>
>;

export async function GET(request: Request) {
   try {
      const { searchParams } = new URL(request.url);
      const template = searchParams.get("template") || "vollzeit";

      // Resolve file path in /public based on template
      let rel = "";
      if (template === "vollzeit") {
         rel = path.join(
            "public",
            "pdf-reference",
            "Vollzeit Arbeitsvertrag",
            "vollzeit Vertrag Komplett Set.pdf"
         );
      } else {
         return NextResponse.json({ map: {} }, { status: 400 });
      }

      const filePath = path.join(process.cwd(), rel);
      const data = await fs.readFile(filePath);

      const rules: AnchorRule[] = [
         { field: "vorname", label: "Arbeitnehmer/in:", dx: 140 },
         { field: "nachname", label: "Arbeitnehmer/in:", dx: 260 },
         { field: "geburtsdatum", label: "Geburtsdatum:", dx: 140 },
         { field: "adresse", label: "Adresse:", dx: 140 },
         { field: "startdate", label: "beginnt am", dx: 220 },
         { field: "brutto", label: "Bruttogehalt", dx: 200 },
         { field: "stundenlohn", label: "Stundenlohn", dx: 200 },
         { field: "ortdatum", label: "Ort, Datum", dx: 120 },
      ];

      const pdf = await (getDocument as any)({ data }).promise;
      const map: PdfFieldMap = {};

      for (let p = 1; p <= pdf.numPages; p++) {
         const page = await pdf.getPage(p);
         const viewport = page.getViewport({ scale: 1.0 });
         const textContent = await page.getTextContent();

         for (const rule of rules) {
            if (rule.page !== undefined && rule.page !== p - 1) continue;
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

      return NextResponse.json({ map });
   } catch (err) {
      console.error("/api/pdf-map error", err);
      return NextResponse.json({ map: {} }, { status: 500 });
   }
}
