"use client"

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Brand } from "@/interfaces/brand"; // Asegúrate de importar la interfaz correcta
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Brand name must be at least 2 characters.",
  }),
});

export function DialogBrandForm({ brand }: { brand?: Brand }) {
  const router = useRouter();
  let [open, setOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    if (open) {
      // Reset the form when the dialog opens
      form.reset({ name: brand?.name || "" });
    }
  }, [open, form, brand?.name]);

  async function onSubmit(form_values: z.infer<typeof formSchema>) {
    try {
      let response = new Response();
      if (brand) {
        response = await fetch(
          process.env.NEXT_PUBLIC_API_BASE_URL + "/api/brands/" + brand.id,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form_values),
          }
        );
      } else {
        response = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + "/api/brands", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form_values),
        });
      }

      if (!response.ok) {
        const responseData = await response.json();
        toast({
          description: responseData.error,
          title: "Error",
          variant: "destructive",
        });
      } else {
        setOpen(false);
        router.refresh();
        toast({
          title: "Success",
        });
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        description: "Unexpected error",
        title: "Error",
        variant: "destructive",
      });
    }
  }
  return (
    <Form {...form}>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button >{brand ? `Edit` : 'Add New'}</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{brand ? `Edit ${brand.name}` : 'Add New'}</DialogTitle>
            <DialogDescription>You are about to {brand ? 'edit' : 'add'} {brand ? brand.name : 'a new brand'}</DialogDescription>
          </DialogHeader>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
                  </FormControl>
                  <FormDescription>
                    Brand name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </DialogContent>
      </Dialog>
    </Form>
  );
}
