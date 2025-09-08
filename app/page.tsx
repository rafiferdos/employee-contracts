"use client";

import {Card, CardHeader, CardBody, CardFooter} from "@heroui/card";
const workTypes = [
   { value: "minijob", label: "Minijob" }, // Mini job
   { value: "teilzeit", label: "Teilzeit" }, // Part-time
   { value: "vollzeit", label: "Vollzeit" }, // Full-time
];

export default function Home() {
   return (
      <div className='max-w-2xl mx-auto py-10'>
         <Card className='animate-fade-in'>
            <CardHeader>
               <CardTitle className='text-2xl text-center'>
                  Mitarbeiterverträge {/* Employee Contracts */}
               </CardTitle>
               <div className='text-lg text-muted-foreground text-center'>
                  Çalışan Sözleşmeleri {/* Turkish translation */}
               </div>
            </CardHeader>
            <CardContent>
               <Form>
                  <FormField label='Arbeitsart' /* Work type */>
                     <Select defaultValue={workTypes[0].value}>
                        {workTypes.map((opt) => (
                           <option key={opt.value} value={opt.value}>
                              {opt.label}
                           </option>
                        ))}
                     </Select>
                  </FormField>
                  <div className='grid grid-cols-2 gap-4'>
                     <FormField label='Vorname' /* First name */>
                        <Input name='vorname' />
                     </FormField>
                     <FormField label='Nachname' /* Surname */>
                        <Input name='nachname' />
                     </FormField>
                  </div>
                  <FormField label='Geburtsdatum' /* Date of birth */>
                     <Input type='date' name='geburtsdatum' />
                  </FormField>
                  <FormField label='Adresse' /* Address */>
                     <Input name='adresse' />
                  </FormField>
                  <FormField label='Staatsangehörigkeit' /* Nationality */>
                     <Input name='staatsangehoerigkeit' />
                  </FormField>
                  <FormField label='Startdatum' /* Start date */>
                     <Input type='date' name='startdate' />
                  </FormField>
                  <div className='grid grid-cols-2 gap-4'>
                     <FormField label='Stundenlohn' /* Hourly wage */>
                        <Input name='stundenlohn' defaultValue='14,53' />
                     </FormField>
                     <FormField
                        label='Monatliches Bruttogehalt (optional)' /* Monthly gross salary */
                     >
                        <Input name='brutto' />
                     </FormField>
                  </div>
                  <FormField label='Ort, Datum' /* Place, date */>
                     <Input name='ortdatum' defaultValue='München 29.08.2025' />
                  </FormField>
                  <Button type='submit' className='w-full mt-6'>
                     Absenden {/* Submit */}
                  </Button>
               </Form>
            </CardContent>
         </Card>
      </div>
   );
}
