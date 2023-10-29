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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Brand } from "@/interfaces/brand"
import { Model } from "@/interfaces/model"

const formSchema = z.object({
  brand: z.string(),
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

export function DialogCarForm({ brands, models, car  }: {brands: Brand[], models: Model[], car?: Car }) {
  const router = useRouter()
  let [open, setOpen] = useState(false);
  const {toast} = useToast();
  const [selectedBrand, setSelectedBrand] = useState("");
  const [filteredModels, setFilteredModels] = useState<Model[]>([]);
  const currentYear = new Date().getFullYear();
  const years: Number[] = [];
  for (let year = currentYear; year >= 1900; year--) {
    years.push(year);
  }


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  })

  useEffect(() => {
    if (open) {
      // Reset the form when the dialog opens
      form.reset({model: car?.model || ""});
    }
  }, [open, form, car?.model]);

  const handleBrandChange = (selectedBrandId: String) => {
    console.log(selectedBrandId)
    const brand = brands.find((brand) => brand.id.toString() === selectedBrandId);
    if (brand) {
      const brandModels = models.filter((model) => model.brandId === brand.id);
      setFilteredModels(brandModels);
      console.log(brand)
      console.log(brandModels)
    } else {
      setFilteredModels([]);
    }
  };
  


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
                  name="brand"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Car Brand</FormLabel>
                      <Select //onValueChange={field.onChange}
                        onValueChange={(id) => {
                          field.onChange(id);
                          handleBrandChange(id);
                        }} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select car Brand." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="max-h-[10rem]">
                        {brands
                          .slice() // Create a shallow copy of the original array
                          .sort((a, b) => a.name.localeCompare(b.name)) // Sort the copy alphabetically by brand name
                          .map((brand) => (
                            <SelectItem key={brand.name} value={brand.id.toString()}>
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
                  name="model"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Car Model</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select car model." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="max-h-[10rem]">
                          {filteredModels.map((model)  => {
                              return <SelectItem key={model.name} value={model.id.toString()}>{model.name}</SelectItem>
                              })
                            }
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="year"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Car Year</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select car year." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {years.map((year)  => {
                              return <SelectItem key={year.toString()} value={year.toString()}>{year.toString()}</SelectItem>
                              })
                            }
                        </SelectContent>
                      </Select>
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
