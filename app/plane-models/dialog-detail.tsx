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
import { PlaneModel } from "@/interfaces/backend-interfaces";

export function DialogPlaneModelDetail({ model }: { model: PlaneModel }) {

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">View Detail</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{model.name}</DialogTitle>
          <DialogDescription>
            Brand: {model.brand.name}<br/>
            Name: {model.name}<br/>
            Wingspan: {model.wingspan}<br/>
            MaxAltitude: {model.maxAltitude}
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
