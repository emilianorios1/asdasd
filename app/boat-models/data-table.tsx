'use client';

import {useCallback, useState} from 'react';
import {useRouter} from 'next/navigation';
import {BoatModel, Brand} from '@/interfaces/backend-interfaces';
import {ColumnDef} from '@tanstack/react-table';
import {useToggle} from 'react-use';

import {Button} from '@/components/ui/button';
import {DataTable} from '@/components/ui/data-table';
import {toast} from '@/components/ui/use-toast';
import {DataTableColumnHeader} from '@/components/data-table-column-header';
import DeleteModal from '@/components/delete-modal';

import {DialogBoatModelDetail} from './dialog-detail';
import {DialogBoatModelForm} from './dialog-form';

export const BoatModelsDataTable = ({
  models,
  brands,
}: {
  models: BoatModel[];
  brands: Brand[];
}) => {
  const columns: ColumnDef<BoatModel>[] = [
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
      header: ({column}) => (
        <DataTableColumnHeader column={column} title="Model Name" />
      ),
    },
    {
      accessorKey: 'isOutboard',
      id: 'Outboard',
      header: 'Outboard',
    },
    {
      accessorKey: 'engineSize',
      id: 'Engine Size',
      header: 'Engine Size',
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({row}) => {
        const model = row.original;
        return (
          <div className="flex items-center justify-center space-x-3">
            <DialogBoatModelForm brands={brands} model={model} />
            <Button
              className="font-semibold"
              variant="destructive"
              onClick={() => handleOnDelete(model.id)}
            >
              Delete
            </Button>
            <DialogBoatModelDetail model={model} />
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
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/boatModels/${id}`,
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
        title="Delete Boat Model"
        description="Are you sure you want to delete this boat model?"
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
