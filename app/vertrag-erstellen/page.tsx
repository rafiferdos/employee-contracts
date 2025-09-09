"use client";

import AnimatedBg from "@/components/animated-bg";
import { Button } from "@heroui/button";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { DatePicker } from "@heroui/date-picker";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { parseDate } from "@internationalized/date";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";
import { useRef, useState } from "react";

const workTypes = [
   { value: "minijob", label: "Minijob" }, // Mini job
   { value: "teilzeit", label: "Teilzeit" }, // Part-time
   { value: "vollzeit", label: "Vollzeit" }, // Full-time
];

export default function VertragErstellenPage() {
   const previewRef = useRef<HTMLDivElement>(null);
   const [form, setForm] = useState({
      worktyp: workTypes[0].value, // Work type
      vorname: "", // First name
      nachname: "", // Surname
      geburtsdatum: null as Date | null, // Date of birth
      adresse: "", // Address
      staatsangehoerigkeit: "", // Nationality
      startdate: null as Date | null, // Start date
      stundenlohn: "14,53", // Hourly wage
      brutto: "", // Monthly gross salary
      ortdatum: "München 29.08.2025", // Place, date
   });

   const handleDownloadPdf = async () => {
      if (!previewRef.current) return;
      const dataUrl = await toPng(previewRef.current, {
         cacheBust: true,
         pixelRatio: 2,
         skipFonts: true,
      });
      const pdf = new jsPDF({ orientation: "p", unit: "pt", format: "a4" });
      const imgProps = (pdf as any).getImageProperties(dataUrl);
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pageWidth - 64; // margins
      const imgHeight = (imgProps.height * imgWidth) / imgProps.width;
      const y = 32;
      const x = 32;
      pdf.addImage(
         dataUrl,
         "PNG",
         x,
         y,
         imgWidth,
         Math.min(imgHeight, pageHeight - 64)
      );
      pdf.save("mitarbeiter-vertrag.pdf");
   };

   return (
      <div className='relative z-10 min-h-[calc(100vh-80px)] py-10'>
         <AnimatedBg />
         <div className='max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 px-6'>
            {/* Left: Form (glassy card) */}
            <Card
               isBlurred
               className='bg-background/60 backdrop-saturate-150 shadow-xl'
            >
               <CardHeader className='flex flex-col items-center gap-1'>
                  <h1 className='text-2xl font-bold text-center'>
                     Mitarbeiterverträge {/* Employee Contracts */}
                  </h1>
                  <p className='text-lg text-muted-foreground text-center'>
                     Çalışan Sözleşmeleri {/* Turkish translation */}
                  </p>
               </CardHeader>
               <CardBody className='space-y-4'>
                  <Select
                     label='Arbeitsart' /* Work type */
                     placeholder='Bitte wählen' /* Please select */
                     selectedKeys={[form.worktyp]}
                     onSelectionChange={(keys) => {
                        const key = Array.from(keys)[0] as string;
                        setForm((f) => ({ ...f, worktyp: key }));
                     }}
                  >
                     {workTypes.map((opt) => (
                        <SelectItem key={opt.value}>{opt.label}</SelectItem>
                     ))}
                  </Select>

                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                     <Input
                        label='Vorname' /* First name */
                        name='vorname'
                        value={form.vorname}
                        onValueChange={(v) =>
                           setForm((f) => ({ ...f, vorname: v }))
                        }
                     />
                     <Input
                        label='Nachname' /* Surname */
                        name='nachname'
                        value={form.nachname}
                        onValueChange={(v) =>
                           setForm((f) => ({ ...f, nachname: v }))
                        }
                     />
                  </div>

                  <DatePicker
                     label='Geburtsdatum' /* Date of birth */
                     value={
                        form.geburtsdatum ?
                           parseDate(
                              form.geburtsdatum.toISOString().split("T")[0]
                           )
                        :  null
                     }
                     onChange={(date) => {
                        setForm((f) => ({
                           ...f,
                           geburtsdatum:
                              date ?
                                 new Date(date.year, date.month - 1, date.day)
                              :  null,
                        }));
                     }}
                  />

                  <Input
                     label='Adresse' /* Address */
                     name='adresse'
                     value={form.adresse}
                     onValueChange={(v) =>
                        setForm((f) => ({ ...f, adresse: v }))
                     }
                  />

                  <Input
                     label='Staatsangehörigkeit' /* Nationality */
                     name='staatsangehoerigkeit'
                     value={form.staatsangehoerigkeit}
                     onValueChange={(v) =>
                        setForm((f) => ({ ...f, staatsangehoerigkeit: v }))
                     }
                  />

                  <DatePicker
                     label='Startdatum' /* Start date */
                     value={
                        form.startdate ?
                           parseDate(form.startdate.toISOString().split("T")[0])
                        :  null
                     }
                     onChange={(date) => {
                        setForm((f) => ({
                           ...f,
                           startdate:
                              date ?
                                 new Date(date.year, date.month - 1, date.day)
                              :  null,
                        }));
                     }}
                  />

                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                     <Input
                        label='Stundenlohn' /* Hourly wage */
                        name='stundenlohn'
                        value={form.stundenlohn}
                        onValueChange={(v) =>
                           setForm((f) => ({ ...f, stundenlohn: v }))
                        }
                     />
                     <Input
                        label='Monatliches Bruttogehalt (optional)' /* Monthly gross salary */
                        name='brutto'
                        value={form.brutto}
                        onValueChange={(v) =>
                           setForm((f) => ({ ...f, brutto: v }))
                        }
                     />
                  </div>

                  <Input
                     label='Ort, Datum' /* Place, date */
                     name='ortdatum'
                     value={form.ortdatum}
                     onValueChange={(v) =>
                        setForm((f) => ({ ...f, ortdatum: v }))
                     }
                  />

                  <div className='flex gap-3 pt-2'>
                     <Button
                        color='primary'
                        className='flex-1'
                        onPress={handleDownloadPdf}
                     >
                        PDF herunterladen {/* Download PDF */}
                     </Button>
                  </div>
               </CardBody>
               <CardFooter />
            </Card>

            {/* Right: Live Preview */}
            <Card
               isBlurred
               className='bg-content1/60 backdrop-saturate-150 shadow-xl'
            >
               <CardHeader>
                  <h2 className='text-xl font-semibold'>
                     Vorschau {/* Preview */}
                  </h2>
               </CardHeader>
               <CardBody>
                  <div
                     ref={previewRef}
                     className='bg-white text-black rounded-xl p-6 space-y-2 shadow-lg'
                     style={{ colorScheme: "light" }}
                  >
                     <div className='text-lg font-semibold'>
                        Mitarbeitervertrag
                     </div>
                     <div>
                        <span className='font-medium'>Arbeitsart:</span>{" "}
                        {workTypes.find((w) => w.value === form.worktyp)?.label}
                     </div>
                     <div>
                        <span className='font-medium'>Name:</span>{" "}
                        {form.vorname} {form.nachname}
                     </div>
                     <div>
                        <span className='font-medium'>Geburtsdatum:</span>{" "}
                        {form.geburtsdatum ?
                           form.geburtsdatum.toLocaleDateString("de-DE")
                        :  ""}
                     </div>
                     <div>
                        <span className='font-medium'>Adresse:</span>{" "}
                        {form.adresse}
                     </div>
                     <div>
                        <span className='font-medium'>
                           Staatsangehörigkeit:
                        </span>{" "}
                        {form.staatsangehoerigkeit}
                     </div>
                     <div>
                        <span className='font-medium'>Startdatum:</span>{" "}
                        {form.startdate ?
                           form.startdate.toLocaleDateString("de-DE")
                        :  ""}
                     </div>
                     <div>
                        <span className='font-medium'>Stundenlohn:</span>{" "}
                        {form.stundenlohn} €
                     </div>
                     {form.brutto && (
                        <div>
                           <span className='font-medium'>
                              Monatliches Bruttogehalt:
                           </span>{" "}
                           {form.brutto}
                        </div>
                     )}
                     <div className='pt-2'>
                        <span className='font-medium'>Ort, Datum:</span>{" "}
                        {form.ortdatum}
                     </div>
                  </div>
               </CardBody>
            </Card>
         </div>
      </div>
   );
}
