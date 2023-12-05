'use client';

import {useCallback, useState} from 'react';
import {useRouter} from 'next/navigation';
import {
  BoatModel,
  BoatPublication,
  Brand,
} from '@/interfaces/backend-interfaces';
import {ColumnDef} from '@tanstack/react-table';
import {useToggle} from 'react-use';

import {Button} from '@/components/ui/button';
import {DataTable} from '@/components/ui/data-table';
import {toast} from '@/components/ui/use-toast';
import DeleteModal from '@/components/delete-modal';

import {DialogBoatPublicationDetail} from './dialog-detail';
import {DialogBoatPublicationForm} from './dialog-form';

export const BoatPublicationsDataTable = ({
  publications,
  models,
  brands,
}: {
  publications: BoatPublication[];
  models: BoatModel[];
  brands: Brand[];
}) => {
  const columns: ColumnDef<BoatPublication>[] = [
    {
      accessorKey: 'id',
      header: 'ID',
      id: 'ID',
    },
    {
      accessorKey: 'boatModel.name',
      header: 'Model',
      id: 'Model',
    },
    {
      accessorKey: 'boatModel.brand.name',
      header: 'Brand',
      id: 'Brand',
    },
    {
      accessorKey: 'year',
      header: 'Year',
      id: 'Year',
    },
    {
      accessorKey: 'boatType',
      header: 'Boat Type',
      id: 'BoatType',
    },
    {
      accessorKey: 'capacity',
      header: 'Capacity',
      id: 'Capacity',
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({row}) => {
        const publication = row.original;
        return (
          <div className="flex items-center justify-center space-x-3">
            <DialogBoatPublicationForm
              brands={brands}
              models={models}
              publication={publication}
            />
            <Button
              className="font-semibold"
              variant="destructive"
              onClick={() => handleOnDelete(publication.id)}
            >
              Delete
            </Button>
            <DialogBoatPublicationDetail publication={publication} />
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
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/boatPublications/${id}`,
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
      console.error('Error deleting boat publication:', error);
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
        title="Delete Boat Publication"
        description="Are you sure you want to delete this boat publication?"
        isOpen={deleteModal}
        toggleIsOpen={toggleIsDeleteModalOpen}
        onConfirm={() => handleDelete(selectedId as number)}
        selectedId={selectedId as number}
      />
      <div className="mx-auto h-full space-y-6 overflow-auto">
        <DataTable data={publications} columns={columns} />
      </div>
    </>
  );
};
