import Image from 'next/image';
import {CarPublication} from '@/interfaces/backend-interfaces';

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

export const DialogCarPublicationDetail = ({
  publication,
}: {
  publication: CarPublication;
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">View Detail</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{publication.id}</DialogTitle>
          <DialogDescription>
            Brand: {publication.carModel.brand.name}
            <br />
            Model: {publication.carModel.name}
            <br />
            Image: <br /> <br />
            <Image
              src={publication.imageUrl}
              alt={publication.imageUrl}
              width={1000}
              height={1000}
            />
            <br />
            Year: {publication.year}
            <br />
            Price: {publication.price}
            <br />
            Mileage: {publication.mileage}
            <br />
            Transmission: {publication.transmission}
            <br />
            Description: {publication.description}
            <br />
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
};
