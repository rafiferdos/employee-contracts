"use client";

import AnimatedBg from "@/components/animated-bg";
import { VOLLZEIT_TEMPLATE_URL, vollzeitPdfMap } from "@/config/pdf-maps";
import { Button } from "@heroui/button";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { DatePicker } from "@heroui/date-picker";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { parseDate } from "@internationalized/date";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { useEffect, useRef, useState } from "react";

const workTypes = [
   { value: "minijob", label: "Minijob" },
   { value: "teilzeit", label: "Teilzeit" },
   { value: "vollzeit", label: "Vollzeit" },
];

export default function VertragErstellenPage() {
   const previewRef = useRef<HTMLDivElement>(null);
   const leftColRef = useRef<HTMLDivElement>(null);
   const [leftHeight, setLeftHeight] = useState<number | null>(null);
   const [form, setForm] = useState({
      worktyp: workTypes[0].value,
      vorname: "",
      nachname: "",
      geburtsdatum: null as Date | null,
      adresse: "",
      staatsangehoerigkeit: "",
      startdate: null as Date | null,
      stundenlohn: "14,53",
      brutto: "",
      ortdatum: "München 29.08.2025",
   });

   const [filledPdfUrl, setFilledPdfUrl] = useState<string | null>(null);
   const [autoMapReady, setAutoMapReady] = useState(false);
   const autoMapRef = useRef<
      Record<string, { page: number; x: number; y: number; size?: number }[]>
   >({});

   type FormState = typeof form;

   // --- Multi-page page shell ---
   function A4Page({
      children,
      title,
      footerImage,
   }: {
      children: React.ReactNode;
      title?: string;
      footerImage?: string;
   }) {
      return (
         <div data-page='true' className='mb-6'>
            <div
               className='bg-white text-black rounded-xl shadow-lg w-full'
               style={{ colorScheme: "light" }}
            >
               <div className='p-8'>
                  {title ?
                     <h1 className='text-2xl font-extrabold text-center mb-6'>
                        {title}
                     </h1>
                  :  null}
                  {children}
               </div>
               {footerImage ?
                  <img
                     src={footerImage}
                     alt='Footer'
                     className='w-full h-auto rounded-b-xl'
                  />
               :  null}
            </div>
         </div>
      );
   }

   function ContractPreview({ data }: { data: FormState }) {
      const isVollzeit = data.worktyp === "vollzeit";
      if (!isVollzeit) {
         return (
            <div
               className='bg-white text-black rounded-xl p-6 space-y-2 shadow-lg'
               style={{ colorScheme: "light" }}
            >
               <div className='text-lg font-semibold'>Mitarbeitervertrag</div>
               <div>
                  <span className='font-medium'>Arbeitsart:</span>{" "}
                  {workTypes.find((w) => w.value === data.worktyp)?.label}
               </div>
               <div>
                  <span className='font-medium'>Name:</span> {data.vorname}{" "}
                  {data.nachname}
               </div>
               <div>
                  <span className='font-medium'>Geburtsdatum:</span>{" "}
                  {data.geburtsdatum ?
                     data.geburtsdatum.toLocaleDateString("de-DE")
                  :  ""}
               </div>
               <div>
                  <span className='font-medium'>Adresse:</span> {data.adresse}
               </div>
               <div>
                  <span className='font-medium'>Staatsangehörigkeit:</span>{" "}
                  {data.staatsangehoerigkeit}
               </div>
               <div>
                  <span className='font-medium'>Startdatum:</span>{" "}
                  {data.startdate ?
                     data.startdate.toLocaleDateString("de-DE")
                  :  ""}
               </div>
               <div>
                  <span className='font-medium'>Stundenlohn:</span>{" "}
                  {data.stundenlohn} €
               </div>
               {data.brutto && (
                  <div>
                     <span className='font-medium'>
                        Monatliches Bruttogehalt:
                     </span>{" "}
                     {data.brutto}
                  </div>
               )}
               <div className='pt-2'>
                  <span className='font-medium'>Ort, Datum:</span>{" "}
                  {data.ortdatum}
               </div>
            </div>
         );
      }

      // Vollzeit: show multiple pages stacked (Komplett-Set)
      return (
         <div>
            {/* Seite 1: Arbeitsvertrag – Vollzeit */}
            <A4Page
               title='Arbeitsvertrag – Vollzeit'
               footerImage={"/pdf-footer-image%20(1).png"}
            >
               <div className='flex items-center justify-between mb-6'>
                  <img
                     src='/header-logo-image.png'
                     alt='Logo'
                     className='h-10 w-auto'
                  />
                  <div className='text-sm text-gray-600'>
                     <div>Arbeitsvertrag – Vollzeit</div>
                  </div>
               </div>

               <div className='text-sm leading-6 space-y-1 mb-6'>
                  <div>
                     <span className='font-semibold'>Arbeitnehmer/in:</span>{" "}
                     {data.vorname} {data.nachname}
                  </div>
                  {data.geburtsdatum && (
                     <div>
                        <span className='font-semibold'>Geburtsdatum:</span>{" "}
                        {data.geburtsdatum.toLocaleDateString("de-DE")}
                     </div>
                  )}
                  {data.adresse && (
                     <div>
                        <span className='font-semibold'>Adresse:</span>{" "}
                        {data.adresse}
                     </div>
                  )}
                  {data.staatsangehoerigkeit && (
                     <div>
                        <span className='font-semibold'>
                           Staatsangehörigkeit:
                        </span>{" "}
                        {data.staatsangehoerigkeit}
                     </div>
                  )}
               </div>

               <div className='space-y-5 text-sm leading-6'>
                  <section>
                     <h2 className='font-bold'>§ 1 Beginn und Tätigkeit</h2>
                     <p>
                        Das Arbeitsverhältnis beginnt am{" "}
                        {data.startdate ?
                           data.startdate.toLocaleDateString("de-DE")
                        :  "__.__.____"}
                        . Die genaue Tätigkeit richtet sich nach der
                        Stellenbeschreibung und den betrieblichen Anforderungen.
                     </p>
                  </section>
                  <section>
                     <h2 className='font-bold'>§ 2 Arbeitszeit</h2>
                     <p>
                        Die regelmäßige Arbeitszeit beträgt 40 Stunden pro
                        Woche. Beginn und Ende der täglichen Arbeitszeit richten
                        sich nach den betrieblichen Erfordernissen.
                     </p>
                  </section>
                  <section>
                     <h2 className='font-bold'>§ 3 Vergütung</h2>
                     <p>
                        {data.brutto ?
                           <>
                              Das monatliche Bruttogehalt beträgt{" "}
                              <span className='font-semibold'>
                                 {data.brutto} €
                              </span>
                              .
                           </>
                        :  <>
                              Der Stundenlohn beträgt{" "}
                              <span className='font-semibold'>
                                 {data.stundenlohn} €
                              </span>
                              . Die Abrechnung erfolgt gemäß den gesetzlichen
                              Bestimmungen.
                           </>
                        }
                     </p>
                  </section>
                  <section>
                     <h2 className='font-bold'>§ 4 Urlaub</h2>
                     <p>
                        Der Urlaubsanspruch richtet sich nach den gesetzlichen
                        Bestimmungen und ggf. betrieblichen Regelungen.
                     </p>
                  </section>
                  <section>
                     <h2 className='font-bold'>§ 5 Probezeit und Kündigung</h2>
                     <p>
                        Es wird eine Probezeit von bis zu 6 Monaten vereinbart.
                        Während der Probezeit gelten die gesetzlichen
                        Kündigungsfristen, im Übrigen die jeweils anwendbaren
                        gesetzlichen Fristen.
                     </p>
                  </section>
                  <section>
                     <h2 className='font-bold'>
                        § 6 Verschwiegenheit und Datenschutz
                     </h2>
                     <p>
                        Der/Die Arbeitnehmer/in verpflichtet sich zur Wahrung
                        von Betriebs- und Geschäftsgeheimnissen sowie zur
                        Einhaltung der datenschutzrechtlichen Bestimmungen.
                     </p>
                  </section>
                  <section>
                     <h2 className='font-bold'>§ 7 Schlussbestimmungen</h2>
                     <p>
                        Änderungen und Ergänzungen dieses Vertrages bedürfen der
                        Schriftform. Sollten einzelne Bestimmungen unwirksam
                        sein, bleibt die Wirksamkeit der übrigen Bestimmungen
                        unberührt.
                     </p>
                  </section>

                  <div className='mt-8 grid grid-cols-1 md:grid-cols-2 gap-8'>
                     <div>
                        <div className='text-sm'>Ort, Datum</div>
                        <div className='mt-1 font-medium'>{data.ortdatum}</div>
                     </div>
                  </div>

                  <div className='mt-12 grid grid-cols-1 md:grid-cols-2 gap-8'>
                     <div className='h-16 border-b border-gray-400' />
                     <div className='h-16 border-b border-gray-400' />
                     <div className='text-sm text-gray-600'>
                        Arbeitgeber (Unterschrift)
                     </div>
                     <div className='text-sm text-gray-600'>
                        Arbeitnehmer/in (Unterschrift)
                     </div>
                  </div>
               </div>
            </A4Page>

            {/* Seite 2: Dienstanweisung – Sicherheitsmitarbeiter (Vollzeit) */}
            <A4Page title='Dienstanweisung – Sicherheitsmitarbeiter (Vollzeit)'>
               <div className='space-y-4 text-sm leading-6'>
                  <p>
                     Diese Dienstanweisung regelt grundlegende Pflichten und
                     Verhaltensweisen für Sicherheitsmitarbeiter/innen.
                  </p>
                  <ul className='list-disc pl-6 space-y-2'>
                     <li>
                        Pflicht zur Pünktlichkeit, ordnungsgemäßen Dienstantritt
                        und -übergabe.
                     </li>
                     <li>
                        Einhalten der Dienstkleidungsvorschriften; Ausweis ist
                        sichtbar zu tragen.
                     </li>
                     <li>
                        Wahrung von Betriebsgeheimnissen und Datenschutz am
                        Einsatzort.
                     </li>
                     <li>
                        Dokumentation von Vorkommnissen im Wachbuch oder
                        digitalen System.
                     </li>
                     <li>
                        Weisungen der Einsatzleitung sind zu befolgen; bei
                        Gefahrensituationen gehört die Eigensicherung an erste
                        Stelle.
                     </li>
                  </ul>
                  <p>
                     Besondere örtliche Anweisungen werden vor Ort durch die
                     Einsatzleitung bekanntgegeben.
                  </p>
               </div>
            </A4Page>

            {/* Seite 3: Personalhandbuch – United Security Stuttgart GmbH (Vollzeit) */}
            <A4Page title='Personalhandbuch – United Security Stuttgart GmbH (Vollzeit)'>
               <div className='space-y-4 text-sm leading-6'>
                  <p>
                     Auszug aus dem Personalhandbuch mit wesentlichen
                     Grundregeln und betrieblichen Abläufen.
                  </p>
                  <ul className='list-disc pl-6 space-y-2'>
                     <li>
                        Kommunikationswege und Ansprechpartner in der
                        Verwaltung.
                     </li>
                     <li>
                        Regelungen zur Arbeitszeiterfassung und Schichttausch.
                     </li>
                     <li>
                        Verhalten in Notfällen; Meldeketten und Ansprechpartner.
                     </li>
                     <li>
                        Datenschutz- und IT-Richtlinien, Umgang mit Unterlagen.
                     </li>
                     <li>Fortbildungsangebote und Qualifikationsnachweise.</li>
                  </ul>
               </div>
            </A4Page>

            {/* Seite 4: Zusatzblatt zum Arbeitsvertrag – Vollzeit */}
            <A4Page title='Zusatzblatt – Ergänzungen zum Arbeitsvertrag (Vollzeit)'>
               <div className='space-y-4 text-sm leading-6'>
                  <p>
                     Ergänzende Regelungen zum individuellen Arbeitsverhältnis.
                  </p>
                  <div>
                     <h3 className='font-semibold'>Zuschläge und Pauschalen</h3>
                     <p>
                        Etwaige Zuschläge (z. B. Nacht-, Sonn- und
                        Feiertagsarbeit) richten sich nach gesetzlichen und
                        betrieblichen Regelungen.
                     </p>
                  </div>
                  <div>
                     <h3 className='font-semibold'>Sonstige Vereinbarungen</h3>
                     <p>
                        Name: {data.vorname} {data.nachname}
                     </p>
                     <p>
                        Startdatum:{" "}
                        {data.startdate ?
                           data.startdate.toLocaleDateString("de-DE")
                        :  "__.__.____"}
                     </p>
                     <p>Arbeitsort/Adresse: {data.adresse || "—"}</p>
                  </div>
                  <div className='mt-10 grid grid-cols-1 md:grid-cols-2 gap-8'>
                     <div className='h-16 border-b border-gray-400' />
                     <div className='h-16 border-b border-gray-400' />
                     <div className='text-sm text-gray-600'>
                        Arbeitgeber (Unterschrift)
                     </div>
                     <div className='text-sm text-gray-600'>
                        Arbeitnehmer/in (Unterschrift)
                     </div>
                  </div>
               </div>
            </A4Page>
         </div>
      );
   }

   useEffect(() => {
      let cancelled = false;
      (async () => {
         try {
            const res = await fetch(`/api/pdf-map?template=vollzeit`, {
               cache: "no-store",
            });
            if (!res.ok) throw new Error(`status ${res.status}`);
            const json = await res.json();
            if (!cancelled) autoMapRef.current = json.map || {};
         } catch (e) {
            console.warn("Auto map fetch failed; using manual only", e);
            if (!cancelled) autoMapRef.current = {};
         } finally {
            if (!cancelled) setAutoMapReady(true);
         }
      })();
      return () => {
         cancelled = true;
      };
   }, []);

   async function buildVollzeitPdf(data: FormState): Promise<Blob> {
      const templateArrayBuffer = await fetch(VOLLZEIT_TEMPLATE_URL).then((r) =>
         r.arrayBuffer()
      );
      const pdfDoc = await PDFDocument.load(templateArrayBuffer, {
         updateMetadata: false,
      });
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const color = rgb(0, 0, 0);
      const pages = pdfDoc.getPages();

      const draw = (key: keyof FormState, text: string) => {
         const manual = (vollzeitPdfMap as any)[key] as
            | { page: number; x: number; y: number; size?: number }[]
            | undefined;
         const autoPl = (autoMapRef.current as any)[key] as
            | { page: number; x: number; y: number; size?: number }[]
            | undefined;
         const placements = [...(manual || []), ...(autoPl || [])];
         placements.forEach((p) => {
            const page = pages[p.page];
            if (!page) return;
            page.drawText(text, {
               x: p.x,
               y: p.y,
               size: p.size ?? 11,
               font,
               color,
            });
         });
      };

      const {
         vorname,
         nachname,
         adresse,
         geburtsdatum,
         startdate,
         stundenlohn,
         brutto,
         ortdatum,
      } = data;
      draw("vorname", vorname || "");
      draw("nachname", nachname || "");
      draw("adresse", adresse || "");
      draw(
         "geburtsdatum",
         geburtsdatum ? geburtsdatum.toLocaleDateString("de-DE") : ""
      );
      draw("startdate", startdate ? startdate.toLocaleDateString("de-DE") : "");
      if (brutto) draw("brutto", `${brutto} €`);
      else draw("stundenlohn", `${stundenlohn} €`);
      draw("ortdatum", ortdatum || "");

      const bytes = await pdfDoc.save({ useObjectStreams: false });
      // Ensure pure ArrayBuffer to satisfy TS/DOM Blob typing (avoid SharedArrayBuffer union)
      const ab = new ArrayBuffer(bytes.length);
      new Uint8Array(ab).set(bytes);
      return new Blob([ab as ArrayBuffer], { type: "application/pdf" });
   }

   useEffect(() => {
      let revoke: string | null = null;
      const doBuild = async () => {
         if (form.worktyp !== "vollzeit") {
            if (revoke) URL.revokeObjectURL(revoke);
            setFilledPdfUrl(null);
            return;
         }
         try {
            if (!autoMapReady) return; // wait for auto map
            const blob = await buildVollzeitPdf(form);
            const url = URL.createObjectURL(blob);
            if (revoke) URL.revokeObjectURL(revoke);
            revoke = url;
            setFilledPdfUrl(url);
         } catch (err) {
            console.error("Failed to build PDF", err);
            if (revoke) URL.revokeObjectURL(revoke);
            setFilledPdfUrl(null);
         }
      };

      const t = setTimeout(doBuild, 250); // debounce for smoother typing
      return () => {
         clearTimeout(t);
         if (revoke) URL.revokeObjectURL(revoke);
      };
   }, [form, autoMapReady]);

   const handleDownloadPdf = async () => {
      if (form.worktyp === "vollzeit") {
         // Prefer filled PDF when available
         try {
            const blob = await buildVollzeitPdf(form);
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "Arbeitsvertrag-Vollzeit-ausgefüllt.pdf";
            a.click();
            setTimeout(() => URL.revokeObjectURL(url), 1000);
            return;
         } catch (e) {
            console.error("PDF build failed, falling back to image capture", e);
         }
      }

      if (!previewRef.current) return;

      // Collect page nodes (if multi-page), else fall back to entire preview
      const pages = previewRef.current.querySelectorAll(
         '[data-page="true"]'
      ) as NodeListOf<HTMLDivElement>;

      const pdf = new jsPDF({ orientation: "p", unit: "pt", format: "a4" });
      const margin = 32;
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pageWidth - margin * 2;

      if (pages.length > 0) {
         for (let i = 0; i < pages.length; i++) {
            const node = pages[i];
            const dataUrl = await toPng(node, {
               cacheBust: true,
               pixelRatio: 2,
               skipFonts: true,
            });
            const imgProps = (pdf as any).getImageProperties(dataUrl);
            const imgHeight = (imgProps.height * imgWidth) / imgProps.width;
            if (i > 0) pdf.addPage();
            pdf.addImage(
               dataUrl,
               "PNG",
               margin,
               margin,
               imgWidth,
               Math.min(imgHeight, pageHeight - margin * 2)
            );
         }
         pdf.save("mitarbeiter-vertrag-vollzeit-komplett.pdf");
         return;
      }

      // Single-page fallback
      const dataUrl = await toPng(previewRef.current, {
         cacheBust: true,
         pixelRatio: 2,
         skipFonts: true,
      });
      const imgProps = (pdf as any).getImageProperties(dataUrl);
      const imgHeight = (imgProps.height * imgWidth) / imgProps.width;
      pdf.addImage(
         dataUrl,
         "PNG",
         margin,
         margin,
         imgWidth,
         Math.min(imgHeight, pageHeight - margin * 2)
      );
      pdf.save("mitarbeiter-vertrag.pdf");
   };

   useEffect(() => {
      if (!leftColRef.current) return;
      const el = leftColRef.current;
      const ro = new ResizeObserver(() => setLeftHeight(el.offsetHeight));
      setLeftHeight(el.offsetHeight);
      ro.observe(el);
      return () => ro.disconnect();
   }, []);

   return (
      <div className='relative'>
         <AnimatedBg />
         <div className='relative w-full px-4 py-8'>
            <div className='grid grid-cols-5 gap-6 items-start'>
               {/* Left: Form */}
               <div
                  ref={leftColRef}
                  className='col-span-5 lg:col-span-1 min-h-0'
               >
                  <Card
                     isBlurred
                     className='bg-content1/60 backdrop-saturate-150 shadow-xl'
                  >
                     <CardHeader>
                        <h2 className='text-xl font-semibold'>Vertragsdaten</h2>
                     </CardHeader>
                     <CardBody className='space-y-4'>
                        <Select
                           label='Arbeitsart'
                           selectedKeys={new Set([form.worktyp])}
                           onSelectionChange={(keys) => {
                              const value =
                                 (Array.from(keys as any)[0] as string) ??
                                 workTypes[0].value;
                              setForm((f) => ({ ...f, worktyp: value }));
                           }}
                        >
                           {workTypes.map((w) => (
                              <SelectItem key={w.value}>{w.label}</SelectItem>
                           ))}
                        </Select>

                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                           <Input
                              label='Vorname'
                              name='vorname'
                              value={form.vorname}
                              onValueChange={(v) =>
                                 setForm((f) => ({ ...f, vorname: v }))
                              }
                           />
                           <Input
                              label='Nachname'
                              name='nachname'
                              value={form.nachname}
                              onValueChange={(v) =>
                                 setForm((f) => ({ ...f, nachname: v }))
                              }
                           />
                        </div>

                        <DatePicker
                           label='Geburtsdatum'
                           value={
                              form.geburtsdatum ?
                                 parseDate(
                                    form.geburtsdatum
                                       .toISOString()
                                       .split("T")[0]
                                 )
                              :  null
                           }
                           onChange={(date: any) => {
                              setForm((f) => ({
                                 ...f,
                                 geburtsdatum:
                                    date ?
                                       new Date(
                                          date.year,
                                          date.month - 1,
                                          date.day
                                       )
                                    :  null,
                              }));
                           }}
                        />

                        <Input
                           label='Adresse'
                           name='adresse'
                           value={form.adresse}
                           onValueChange={(v) =>
                              setForm((f) => ({ ...f, adresse: v }))
                           }
                        />

                        <Input
                           label='Staatsangehörigkeit'
                           name='staatsangehoerigkeit'
                           value={form.staatsangehoerigkeit}
                           onValueChange={(v) =>
                              setForm((f) => ({
                                 ...f,
                                 staatsangehoerigkeit: v,
                              }))
                           }
                        />

                        <DatePicker
                           label='Startdatum'
                           value={
                              form.startdate ?
                                 parseDate(
                                    form.startdate.toISOString().split("T")[0]
                                 )
                              :  null
                           }
                           onChange={(date: any) => {
                              setForm((f) => ({
                                 ...f,
                                 startdate:
                                    date ?
                                       new Date(
                                          date.year,
                                          date.month - 1,
                                          date.day
                                       )
                                    :  null,
                              }));
                           }}
                        />

                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                           <Input
                              label='Stundenlohn'
                              name='stundenlohn'
                              value={form.stundenlohn}
                              onValueChange={(v) =>
                                 setForm((f) => ({ ...f, stundenlohn: v }))
                              }
                           />
                           <Input
                              label='Monatliches Bruttogehalt (optional)'
                              name='brutto'
                              value={form.brutto}
                              onValueChange={(v) =>
                                 setForm((f) => ({ ...f, brutto: v }))
                              }
                           />
                        </div>

                        <Input
                           label='Ort, Datum'
                           name='ortdatum'
                           value={form.ortdatum}
                           onValueChange={(v) =>
                              setForm((f) => ({ ...f, ortdatum: v }))
                           }
                        />
                     </CardBody>
                     <CardFooter>
                        <div className='flex gap-3 w-full'>
                           <Button
                              color='primary'
                              className='flex-1'
                              onPress={handleDownloadPdf}
                           >
                              PDF herunterladen (Alle Seiten)
                           </Button>
                        </div>
                     </CardFooter>
                  </Card>
               </div>

               {/* Right: Live Preview */}
               <div
                  style={{ height: leftHeight ?? undefined }}
                  className='col-span-5 lg:col-span-4 min-h-0'
               >
                  <Card
                     isBlurred
                     className='bg-content1/60 backdrop-saturate-150 shadow-xl h-full overflow-hidden'
                  >
                     <CardHeader>
                        <h2 className='text-xl font-semibold'>Vorschau</h2>
                     </CardHeader>
                     <CardBody className='h-full'>
                        <div className='h-full overflow-y-auto pr-2'>
                           {form.worktyp === "vollzeit" && filledPdfUrl ?
                              <iframe
                                 title='Vorschau PDF'
                                 src={filledPdfUrl}
                                 className='w-full h-full min-h-[480px] rounded-lg border'
                              />
                           :  <div ref={previewRef}>
                                 <ContractPreview data={form} />
                              </div>
                           }
                        </div>
                     </CardBody>
                  </Card>
               </div>
            </div>
         </div>
      </div>
   );
}
