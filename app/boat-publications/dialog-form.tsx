'use client';

import {useEffect, useState} from 'react';
import Image from 'next/image';
import {useRouter} from 'next/navigation';
import {
  BoatModel,
  BoatPublication,
  Brand,
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
  boatModelId: z.number(),
  imageUrl: z.string().min(2, 'Upload an image'),
  capacity: z.coerce.number().min(1),
  haveTrailer: z.string().min(2, 'Yes or No?'),
  year: z.number(),
  boatType: z.string().min(2),
  price: z.coerce.number().min(1),
  maxWeight: z.coerce.number().min(1),
  description: z.string().min(0),
  contactNumber: z
    .string()
    .refine((value) => /^\+(?:[0-9]●?){6,14}[0-9]$/.test(value), {
      message: 'Please enter a valid phone number',
    }),
});

export const DialogBoatPublicationForm = ({
  publication,
  models,
  brands,
}: {
  publication?: BoatPublication;
  models: BoatModel[];
  brands: Brand[];
}) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const {toast} = useToast();
  const [filteredModels, setFilteredModels] = useState<BoatModel[]>([]);
  const currentYear = new Date().getFullYear();
  const years: number[] = [];
  for (let year = currentYear; year >= 1950; year--) {
    years.push(year);
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      capacity: 1,
      haveTrailer: '',
      price: 1,
      maxWeight: 1,
      boatType: '',
      description: '',
      contactNumber: '',
    },
  });

  useEffect(() => {
    if (open && publication) {
      // Reset the form when the dialog opens
      form.reset({
        brandId: publication.boatModel.brandId || NaN,
        boatModelId: publication.boatModelId,
        imageUrl: publication.imageUrl,
        year: publication.year,
        maxWeight: publication.maxWeight,
        boatType: publication.boatType,
        capacity: publication.capacity,
        haveTrailer: publication.haveTrailer,
        price: publication.price,
        description: publication.description,
        contactNumber: publication.contactNumber,
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
            '/api/BoatPublications/' +
            publication.id,
          {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newFormValues),
          }
        );
      } else {
        response = await fetch(
          process.env.NEXT_PUBLIC_API_BASE_URL + '/api/boatPublications',
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
              {publication ? `Edit ${publication.boatModel.name}` : 'Add New'}
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
                        <SelectValue placeholder="Select boat Brand." />
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
              name="boatModelId"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Model</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(Number(value))}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select boat model." />
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
                        <SelectValue placeholder="Select boat year." />
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
              name="maxWeight"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Max Weight</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="maxWeight" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="capacity"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Capacity</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Capacity" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Price" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="haveTrailer"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Have trailer</FormLabel>
                  <Select onValueChange={(value) => field.onChange(value)}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Have trailer..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="max-h-[10rem] overflow-y-scroll">
                      <SelectItem value="Yes">Yes</SelectItem>
                      <SelectItem value="No">No</SelectItem>
                    </SelectContent>
                  </Select>
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
              name="boatType"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Boat type</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Boat type" {...field} />
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
