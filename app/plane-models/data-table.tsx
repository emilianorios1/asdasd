'use client';
import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { PlaneModel, Brand } from '@/interfaces/backend-interfaces';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { useToggle } from 'react-use';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import DeleteModal from '@/components/delete-modal';
import { toast } from '@/components/ui/use-toast';

import { DialogPlaneModelDetail } from './dialog-detail';
import { DialogPlaneModelForm } from './dialog-form';
import {DataTableColumnHeader} from '@/components/data-table-column-header';

export const PlaneModelsDataTable = ({
  models,
  brands,
}: {
  models: PlaneModel[];
  brands: Brand[];
}) => {
  const columns: ColumnDef<PlaneModel>[] = [
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
      id: 'Name',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Model Name" />
      ),
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        const model = row.original;
        return (
          <div className="flex items-center justify-center space-x-3">
            <DialogPlaneModelForm brands={brands} model={model} />
            <Button
              className="font-semibold"
              variant="destructive"
              onClick={() => handleOnDelete(model.id)}
            >
              Delete
            </Button>
            <DialogPlaneModelDetail model={model} />
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
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/planeModels/${id}`,
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
      console.error('Error deleting boat model:', error);
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
        title="Delete Plane Model"
        description="Are you sure you want to delete this plane model?"
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
