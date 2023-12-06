'use client';

import {useCallback, useState} from 'react';
import {useRouter} from 'next/navigation';
import {
  Brand,
  PlaneModel,
  PlanePublication,
} from '@/interfaces/backend-interfaces';
import {ColumnDef} from '@tanstack/react-table';
import {useToggle} from 'react-use';

import {Button} from '@/components/ui/button';
import {DataTable} from '@/components/ui/data-table';
import {toast} from '@/components/ui/use-toast';
import {DataTableColumnHeader} from '@/components/data-table-column-header';
import DeleteModal from '@/components/delete-modal';

import {DialogPlanePublicationDetail} from './dialog-detail';
import {DialogPlanePublicationForm} from './dialog-form';

export const PlanePublicationsDataTable = ({
  publications,
  models,
  brands,
}: {
  publications: PlanePublication[];
  models: PlaneModel[];
  brands: Brand[];
}) => {
  const columns: ColumnDef<PlanePublication>[] = [
    {
      accessorKey: 'id',
      header: 'ID',
    },
    {
      accessorKey: 'planeModel.name',
      header: ({column}) => (
        <DataTableColumnHeader column={column} title="Website URL" />
      ),
    },
    {
      accessorKey: 'planeModel.brand.name',
      header: ({column}) => (
        <DataTableColumnHeader column={column} title="Brand" />
      ),
    },
    {
      accessorKey: 'year',
      header: ({column}) => (
        <DataTableColumnHeader column={column} title="Year" />
      ),
    },
    {
      accessorKey: 'flighthours',
      header: ({column}) => (
        <DataTableColumnHeader column={column} title="Flight Hours" />
      ),
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({row}) => {
        const publication = row.original;
        return (
          <div className="flex items-center justify-center space-x-3">
            <DialogPlanePublicationForm
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
            <DialogPlanePublicationDetail publication={publication} />
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
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/planePublications/${id}`,
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
        title="Delete Plane Publication"
        description="Are you sure you want to delete this plane publication?"
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
