'use client';

import {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import {Brand, PlaneModel} from '@/interfaces/backend-interfaces';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import * as z from 'zod';

import {Button} from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
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
import {Input} from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {useToast} from '@/components/ui/use-toast';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'model name must be at least 2 characters.',
  }),
  brandId: z.number(),
  wingspan: z.coerce.number(),
  maxAltitude: z.coerce.number().min(0).max(12000),
});

export const DialogPlaneModelForm = ({
  model,
  brands,
}: {
  model?: PlaneModel;
  brands: Brand[];
}) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const {toast} = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      wingspan: 0,
      maxAltitude: 10000,
    },
  });

  useEffect(() => {
    if (open && model) {
      // Reset the form when the dialog opens
      form.reset({
        name: model?.name || '',
        brandId: model?.brandId || NaN,
        wingspan: model?.wingspan || NaN,
        maxAltitude: model?.maxAltitude || NaN,
      });
    }
  }, [open, form, model]);

  async function onSubmit(form_values: z.infer<typeof formSchema>) {
    console.log(form_values);
    try {
      let response = new Response();
      if (model) {
        response = await fetch(
          process.env.NEXT_PUBLIC_API_BASE_URL + '/api/planeModels/' + model.id,
          {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(form_values),
          }
        );
      } else {
        response = await fetch(
          process.env.NEXT_PUBLIC_API_BASE_URL + '/api/planeModels',
          {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(form_values),
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
          <Button>{model ? `Edit` : 'Add New'}</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {model ? `Edit ${model.name}` : 'Add New'}
            </DialogTitle>
            <DialogDescription>
              You are about to {model ? 'edit' : 'add'}{' '}
              {model ? model.name : 'a new model'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="brandId"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Brand</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(Number(value))}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select model brand." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="max-h-[10rem]">
                      {brands.map((brand) => {
                        return (
                          <SelectItem
                            key={brand.id}
                            value={brand.id.toString()}
                          >
                            {brand.name}
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
              name="name"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Model Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="wingspan"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Wingspan</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="wingspan" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="maxAltitude"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Max Altitude</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="maxAltitude" {...field} />
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
