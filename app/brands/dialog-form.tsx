'use client';

import {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import {Brand} from '@/interfaces/backend-interfaces';
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
import {useToast} from '@/components/ui/use-toast';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Brand name must be at least 2 characters.',
  }),
  websiteUrl: z.string().refine(
    (value) => {
      try {
        // Try creating a URL object with the value
        new URL(value);
        return true; // If successful, it's a valid URL
      } catch {
        return false; // If it fails, it's not a valid URL
      }
    },
    {
      message:
        'Invalid URL format for website. It should be something like https://example.com',
    }
  ),
  contactNumber: z.string().refine(
    (value) => {
      // Regular expression to validate a phone number (simple example)
      const phoneRegex = /^\d{10}$/; // Modify this regex based on your phone number format
      return phoneRegex.test(value);
    },
    {message: 'Invalid phone number format.'}
  ),
});

export const DialogBrandForm = ({brand}: {brand?: Brand}) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const {toast} = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    if (open && brand) {
      // Reset the form when the dialog opens
      form.reset({
        name: brand?.name || '',
        websiteUrl: brand?.websiteUrl || '',
        contactNumber: brand?.contactNumber || '',
      });
    }
  }, [open, form, brand]);

  async function onSubmit(form_values: z.infer<typeof formSchema>) {
    console.log(form_values);
    try {
      let response = new Response();
      if (brand) {
        response = await fetch(
          process.env.NEXT_PUBLIC_API_BASE_URL + '/api/brands/' + brand.id,
          {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(form_values),
          }
        );
      } else {
        response = await fetch(
          process.env.NEXT_PUBLIC_API_BASE_URL + '/api/brands',
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
          <Button className="font-semibold">
            {brand ? `Edit` : 'Add New'}
          </Button>
        </DialogTrigger>
        <DialogContent className="w-11/12">
          <DialogHeader>
            <DialogTitle>
              {brand ? `Edit ${brand.name}` : 'Add New'}
            </DialogTitle>
            <DialogDescription>
              You are about to {brand ? 'edit' : 'add'}{' '}
              {brand ? brand.name : 'a new brand'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="websiteUrl"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Website URL</FormLabel>
                  <FormControl>
                    <Input placeholder="Website URL" {...field} />
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
                    <Input placeholder="Contact Number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
              <Button className="mb-2 sm:mb-0" type="submit">
                Submit
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Form>
  );
};
