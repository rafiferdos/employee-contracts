// Coordinate map for placing text into the Vollzeit template PDF.
// Units are PDF points with origin at bottom-left of each page.
// NOTE: These are placeholder coordinates; adjust after visual calibration.
// Use a viewer to find exact positions and update these values.

export const VOLLZEIT_TEMPLATE_URL =
   "/pdf-reference/Vollzeit Arbeitsvertrag/vollzeit Vertrag Komplett Set.pdf";

export type PdfPlacement = {
   page: number; // zero-based page index
   x: number;
   y: number;
   size?: number; // font size
   maxWidth?: number; // optional wrapping width
};

export type PdfFieldMap = Record<string, PdfPlacement[]>;

export const vollzeitPdfMap: PdfFieldMap = {
   // Arbeitnehmer/in Name on page 1
   vorname: [{ page: 0, x: 100, y: 640, size: 12 }],
   nachname: [{ page: 0, x: 220, y: 640, size: 12 }],
   adresse: [{ page: 0, x: 100, y: 620, size: 11, maxWidth: 380 }],
   geburtsdatum: [{ page: 0, x: 100, y: 600, size: 11 }],
   startdate: [{ page: 0, x: 100, y: 540, size: 11 }],
   stundenlohn: [
      // If hourly model is chosen
      { page: 0, x: 100, y: 500, size: 11 },
   ],
   brutto: [
      // If monthly model is chosen
      { page: 0, x: 100, y: 480, size: 11 },
   ],
   ortdatum: [{ page: 0, x: 100, y: 160, size: 11 }],
};
