import {Brand} from '@/interfaces/backend-interfaces';

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

export const DialogBrandDetail = ({brand}: {brand: Brand}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="font-semibold" variant="secondary">
          View Detail
        </Button>
      </DialogTrigger>
      <DialogContent className="w-11/12">
        <DialogHeader>
          <DialogTitle>{brand.name}</DialogTitle>
          <DialogDescription>
            Name: {brand.name}
            <br />
            Website URL: {brand.websiteUrl}
            <br />
            Contact Number: {brand.contactNumber}
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
