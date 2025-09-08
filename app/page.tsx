"use client";

import { Button } from "@heroui/button";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";

const workTypes = [
   { value: "minijob", label: "Minijob" }, // Mini job
   { value: "teilzeit", label: "Teilzeit" }, // Part-time
   { value: "vollzeit", label: "Vollzeit" }, // Full-time
];

export default function Home() {
   return (
      <div className='max-w-2xl mx-auto py-10'>
         <Card className='animate-fade-in'>
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
                  defaultSelectedKeys={[workTypes[0].value]}
               >
                  {workTypes.map((opt) => (
                     <SelectItem key={opt.value}>{opt.label}</SelectItem>
                  ))}
               </Select>

               <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <Input label='Vorname' /* First name */ name='vorname' />
                  <Input label='Nachname' /* Surname */ name='nachname' />
               </div>

               <Input
                  type='date'
                  label='Geburtsdatum' /* Date of birth */
                  name='geburtsdatum'
               />

               <Input label='Adresse' /* Address */ name='adresse' />

               <Input
                  label='Staatsangehörigkeit' /* Nationality */
                  name='staatsangehoerigkeit'
               />

               <Input
                  type='date'
                  label='Startdatum' /* Start date */
                  name='startdate'
               />

               <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <Input
                     label='Stundenlohn' /* Hourly wage */
                     name='stundenlohn'
                     defaultValue='14,53'
                  />
                  <Input
                     label='Monatliches Bruttogehalt (optional)' /* Monthly gross salary */
                     name='brutto'
                  />
               </div>

               <Input
                  label='Ort, Datum' /* Place, date */
                  name='ortdatum'
                  defaultValue='München 29.08.2025'
               />

               <Button type='submit' className='w-full mt-2'>
                  Absenden {/* Submit */}
               </Button>
            </CardBody>
            {/* Optionally, you can add a CardFooter if needed */}
            <CardFooter />
         </Card>
      </div>
   );
}
