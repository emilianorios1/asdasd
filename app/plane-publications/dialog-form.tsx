'use client';

import {useEffect, useState} from 'react';
import Image from 'next/image';
import {useRouter} from 'next/navigation';
import {
  Brand,
  PlaneModel,
  PlanePublication,
} from '@/interfaces/backend-interfaces';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import * as z from 'zod';

import {Button} from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import ImageInputCloudinary from '@/components/ui/image-input-cloudinary';
import {Input} from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {Textarea} from '@/components/ui/textarea';
import {useToast} from '@/components/ui/use-toast';

const formSchema = z.object({
  brandId: z.number(),
  planeModelId: z.number(),
  imageUrl: z.string().min(2, 'Upload an image'),
  year: z.number(),
  description: z.string().min(0),
  flighthours: z.coerce.number(),
  fuelCapacity: z.coerce.number(),
  contactNumber: z
    .string()
    .refine((value) => /^\+(?:[0-9]●?){6,14}[0-9]$/.test(value), {
      message: 'Please enter a valid phone number',
    }),
});

export const DialogPlanePublicationForm = ({
  publication,
  models,
  brands,
}: {
  publication?: PlanePublication;
  models: PlaneModel[];
  brands: Brand[];
}) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const {toast} = useToast();
  const [filteredModels, setFilteredModels] = useState<PlaneModel[]>([]);
  const currentYear = new Date().getFullYear();
  const years: number[] = [];
  for (let year = currentYear; year >= 1950; year--) {
    years.push(year);
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: '',
      contactNumber: '',
      flighthours: 100,
      fuelCapacity: 0,
    },
  });

  useEffect(() => {
    if (open && publication) {
      // Reset the form when the dialog opens
      form.reset({
        brandId: publication.planeModel.brandId || NaN,
        planeModelId: publication.planeModelId,
        imageUrl: publication.imageUrl,
        year: publication.year,
        description: publication.description,
        contactNumber: publication.contactNumber,
        flighthours: publication.flighthours,
        fuelCapacity: publication.fuelCapacity,
      });
    }
  }, [form, open, publication]);

  const handleBrandChange = (selectedBrandId: number) => {
    const brand = brands.find((brandAux) => brandAux.id === selectedBrandId);
    if (brand) {
      const brandModels = models.filter((model) => model.brandId === brand.id);
      setFilteredModels(brandModels);
    } else {
      setFilteredModels([]);
    }
  };

  async function onSubmit(formValues: z.infer<typeof formSchema>) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {brandId, ...newFormValues} = formValues;
    console.log('Submitting form', newFormValues);
    try {
      let response = new Response();
      if (publication) {
        response = await fetch(
          process.env.NEXT_PUBLIC_API_BASE_URL +
            '/api/planePublications/' +
            publication.id,
          {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newFormValues),
          }
        );
      } else {
        response = await fetch(
          process.env.NEXT_PUBLIC_API_BASE_URL + '/api/planePublications',
          {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newFormValues),
          }
        );
      }

      if (!response.ok) {
        const responseData = await response.json();
        toast({
          description: responseData.error,
          title: 'Error',
          variant: 'destructive',
        });
      } else {
        setOpen(false);
        router.refresh();
        toast({
          title: 'Success',
        });
      }
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        description: 'Unexpected error',
        title: 'Error',
        variant: 'destructive',
      });
    }
  }

  return (
    <Form {...form}>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>{publication ? `Edit` : 'Add New'}</Button>
        </DialogTrigger>
        <DialogContent className="max-h-screen overflow-y-scroll">
          <DialogHeader>
            <DialogTitle>
              {publication ? `Edit ${publication}` : 'Add New'}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="brandId"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Brand</FormLabel>
                  <Select //onValueChange={field.onChange}
                    onValueChange={(id) => {
                      field.onChange(Number(id));
                      handleBrandChange(Number(id));
                    }}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select plane Brand." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="max-h-[10rem]">
                      {brands
                        .slice() // Create a shallow copy of the original array
                        .sort((a, b) => a.name.localeCompare(b.name)) // Sort the copy alphabetically by brand name
                        .map((brand) => (
                          <SelectItem
                            key={brand.name}
                            value={brand.id.toString()}
                          >
                            {brand.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="planeModelId"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Model</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(Number(value))}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select plane model." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="max-h-[10rem] overflow-y-scroll">
                      {filteredModels.map((model) => {
                        return (
                          <SelectItem
                            key={model.name}
                            value={model.id.toString()}
                          >
                            {model.name}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="year"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Year</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(Number(value))}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select plane year." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="max-h-[10rem]">
                      {years.map((year) => {
                        return (
                          <SelectItem
                            key={year.toString()}
                            value={year.toString()}
                          >
                            {year.toString()}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="imageUrl"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <ImageInputCloudinary onChange={field.onChange} />
                  </FormControl>
                  <>
                    {field.value ? (
                      <Image
                        src={field.value}
                        alt={field.value}
                        width={100}
                        height={100}
                      />
                    ) : null}
                  </>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fuelCapacity"
              render={({field}) => (
                <FormItem>
                  <FormLabel>FuelCapacity</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="FuelCapacity"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="flighthours"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Flight Hours</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Flight Hours"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contactNumber"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Contact Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Contact number..." {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="sm:justify-start">
              <Button type="submit">Submit</Button>
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Form>
  );
};
