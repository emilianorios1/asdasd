"use client"

import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Car } from "@/interfaces/car"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useEffect, useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { DropdownYears } from "./dropdown-years"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
const formSchema = z.object({
  model: z.string().min(2, {
    message: "Usermodel must be at least 2 characters.",
  }),
  manufacturer: z.string().min(2 ,{
    message: "Model must be at least 2 characters."
  }),
  year: z.string(),
  price: z.number(),
  color: z.string()
})

export function DialogCarForm({ car }: { car?: Car }) {
  const router = useRouter()
  let [open, setOpen] = useState(false);
  const {toast} = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  })

  useEffect(() => {
    if (open) {
      // Reset the form when the dialog opens
      form.reset({model: car?.model || ""});
    }
  }, [open, form, car?.model]);

  async function onSubmit(form_values: z.infer<typeof formSchema>) {
    try {
      let response = new Response;
      if (car) {
        response = await fetch(
          process.env.NEXT_PUBLIC_API_BASE_URL + "/api/cars/" + car.id,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form_values),
          }
        );
      } else {
        response = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + "/api/cars", {
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
          variant: "destructive"
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
        description: "Unexepected error",
        title: "Error",
        variant: "destructive"
      });
    }
  }

  const currentYear = new Date().getFullYear();
  const years: Number[] = [];

  for (let year = currentYear; year >= 1900; year--) {
    years.push(year);
  }

  return (
    <Form {...form}>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button >{car ? `Edit` : 'Create'}</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{car ? `Edit ${car.model}` : 'Create'}</DialogTitle>
            <DialogDescription>You are about to {car ? 'edit' : 'add'} {car ? car.model : 'a new car publication'}</DialogDescription>
          </DialogHeader>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8" >
                <FormField
                  control={form.control}
                  name="model"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Model</FormLabel>
                      <FormControl>
                        <Input placeholder="Model..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="year"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Year</FormLabel>
                      <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select car year." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className=" max-h-[10rem]">
                            {years.map((year)  => {
                            return <SelectItem key={year.toString()} value={year.toString()}>{year.toString()}</SelectItem>
                            })}
                          </SelectContent>
                      </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* ACA ES UN CAMPO */}
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input placeholder="Price..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="color"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Color</FormLabel>
                      <FormControl>
                        <Input placeholder="Color..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Submit</Button>
              </form>
        </DialogContent>
      </Dialog>
    </Form>
  )
}
