'use client';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Brand, CarModel } from '@/interfaces/backend-interfaces';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { useToggle } from 'react-use';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import DeleteModal from '@/components/delete-modal';
import { toast } from '@/components/ui/use-toast';

import { DialogCarModelDetail } from './dialog-detail';
import { DialogCarModelForm } from './dialog-form';

export const CarModelsDataTable = ({
  models,
  brands,
}: {
  models: CarModel[];
  brands: Brand[];
}) => {
  const columns: ColumnDef<CarModel>[] = [
    {
      accessorKey: 'id',
      header: 'ID',
      id: 'ID',
    },
    {
      accessorKey: 'brand.name',
      header: 'Brand',
      id: 'Brand',
    },
    {
      accessorKey: 'name',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() =>
              column.toggleSorting(column.getIsSorted() === 'asc')
            }
          >
            Model Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      id: 'ModelName',
    },
    {
      accessorKey: 'engineSize',
      header: 'Engine Size',
      id: 'EngineSize',
    },
    {
      accessorKey: 'numberOfDoors',
      header: 'Number of Doors',
      id: 'NumberOfDoors',
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        const model = row.original;
        return (
          <div className="flex items-center justify-center space-x-3">
            <DialogCarModelForm brands={brands} model={model} />
            <Button
              className="font-semibold"
              variant="destructive"
              onClick={() => handleOnDelete(model.id)}
            >
              Delete
            </Button>
            <DialogCarModelDetail model={model} />
          </div>
        );
      },
    },
  ];

  const router = useRouter();
  const [deleteModal, toggleIsDeleteModalOpen] = useToggle(false);
  const [selectedId, setSelectedId] = useState<number>();

  const handleOnDelete = useCallback(
    (id: number) => {
      setSelectedId(id);
      toggleIsDeleteModalOpen();
    },
    [toggleIsDeleteModalOpen]
  );

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/carModels/${id}`,
        {
          method: 'DELETE',
        }
      );
      if (response.ok) {
        toast({
          title: 'Success',
        });
        router.refresh();
      } else {
        const data = await response.json();
        toast({
          description: data.error,
          title: 'Error',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error deleting car model:', error);
      toast({
        description: 'Unexpected error',
        title: 'Error',
        variant: 'destructive',
      });
    }
  };

  return (
    <>
      <DeleteModal
        title="Delete Car Model"
        description="Are you sure you want to delete this car model?"
        isOpen={deleteModal}
        toggleIsOpen={toggleIsDeleteModalOpen}
        onConfirm={() => handleDelete(selectedId as number)}
        selectedId={selectedId as number}
      />
      <div className="mx-auto h-full space-y-6 overflow-auto">
        <DataTable data={models} columns={columns} />
      </div>
    </>
  );
};
