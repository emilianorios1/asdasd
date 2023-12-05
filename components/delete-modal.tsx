import {useCallback} from 'react';
import {AlertTriangle} from 'lucide-react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

type Props = {
  isOpen: boolean;
  toggleIsOpen: () => void;
  onConfirm: (id: any) => void;
  selectedId: number;
  title: string;
  description: string;
  body?: React.ReactNode;
};

const DeleteModal = ({
  isOpen,
  toggleIsOpen,
  onConfirm,
  selectedId,
  title,
  description,
  body,
}: Props) => {
  const handleOnConfirm = useCallback(() => {
    onConfirm(selectedId);
    toggleIsOpen();
  }, [onConfirm, selectedId, toggleIsOpen]);

  return (
    <AlertDialog open={isOpen} onOpenChange={toggleIsOpen}>
      <AlertDialogContent className="w-11/12">
        <AlertDialogHeader>
          <AlertDialogTitle>
            <div className="flex items-center space-x-2 align-middle">
              <div>
                <AlertTriangle />
              </div>
              <div>{title}</div>
            </div>
          </AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        {body}
        <AlertDialogFooter>
          <AlertDialogCancel onClick={toggleIsOpen}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleOnConfirm} variant="destructive">
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteModal;
