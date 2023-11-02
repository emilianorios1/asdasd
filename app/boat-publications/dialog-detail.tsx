import { Button } from "@/components/ui/button";
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
import { BoatPublication } from "@/interfaces/backend-interfaces";
import Image from "next/image"

export function DialogBoatPublicationDetail({ publication }: { publication: BoatPublication }) {

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">View Detail</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{publication.id}</DialogTitle>
          <DialogDescription>
            Brand: {publication.boatModel.brand.name}<br/>
            Model: {publication.boatModel.name}<br/>
            Image: <br/> <br/> 
            <Image
              src={publication.imageUrl}
              alt={publication.imageUrl}
              width={1000}
              height={1000}
            /><br/>
            Year: {publication.year}<br/>
            Price: {publication.price}<br/>
            Capacity: {publication.capacity}<br/>
            Type: {publication.boatType}<br/>
            Have trailer: {publication.haveTrailer}<br/>
            Max weight: {publication.maxWeight}<br/>
            Contact number: {publication.contactNumber}<br/>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
