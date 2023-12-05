'use client';

import {useCallback, useState} from 'react';
import {useRouter} from 'next/navigation';
import {Brand} from '@/interfaces/backend-interfaces';
import {ColumnDef} from '@tanstack/react-table';
import {useToggle} from 'react-use';

import {Button} from '@/components/ui/button';
import {DataTable} from '@/components/ui/data-table';
import {toast} from '@/components/ui/use-toast';
import {DataTableColumnHeader} from '@/components/data-table-column-header';
import DeleteModal from '@/components/delete-modal';

import {DialogBrandDetail} from './dialog-detail';
import {DialogBrandForm} from './dialog-form';

export const BrandsDataTable = ({brands}: {brands: Brand[]}) => {
  const columns: ColumnDef<Brand>[] = [
    {
      accessorKey: 'id',
      header: 'ID',
      id: 'ID',
    },
    {
      accessorKey: 'name',
      id: 'Name',
      header: ({column}) => (
        <DataTableColumnHeader column={column} title="Name" />
      ),
    },
    {
      accessorKey: 'websiteUrl',
      id: 'Website Url',
      header: ({column}) => (
        <DataTableColumnHeader column={column} title="Website URL" />
      ),
      cell: ({row}) => {
        const brand = row.original;
        return (
          <a
            className="hover:text-blue-500 hover:underline"
            href={brand.websiteUrl}
            rel="noreferrer"
            target="_blank"
          >
            {brand.websiteUrl}
          </a>
        );
      },
    },
    {
      accessorKey: 'contactNumber',
      id: 'Contact Number',
      header: ({column}) => (
        <DataTableColumnHeader column={column} title="Contact Number" />
      ),
      cell: ({row}) => {
        const brand = row.original;
        return (
          <a
            className="hover:text-blue-500 hover:underline"
            href={`tel:${brand.contactNumber}`}
          >
            {brand.contactNumber}
          </a>
        );
      },
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({row}) => {
        const brand = row.original;
        return (
          <div className="flex items-center justify-center space-x-3">
            <DialogBrandForm brand={brand} />
            <Button
              className="font-semibold"
              variant="destructive"
              onClick={() => handleOnDelete(brand.id)}
            >
              Delete
            </Button>
            <DialogBrandDetail brand={brand} />
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
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/brands/${id}`,
        {
          method: 'DELETE',
        }
      );
      if (response.ok) {
        // Eliminación exitosa
        toast({
          title: 'Success',
        });
        router.refresh();
      } else {
        // Manejar errores o mostrar un mensaje de error al usuario
        const data = await response.json();
        toast({
          description: data.error,
          title: 'Error',
          variant: 'destructive',
        });
      }
    } catch (error) {
      // Manejar errores inesperados o mostrar un mensaje de error al usuario
      console.error('Error deleting brand:', error);
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
        title="Delete Brand"
        description="Are you sure you want to delete this brand?"
        isOpen={deleteModal}
        toggleIsOpen={toggleIsDeleteModalOpen}
        onConfirm={() => handleDelete(selectedId as number)}
        selectedId={selectedId as number}
      />
      <div className="mx-auto h-full space-y-6 overflow-auto">
        <DataTable data={brands} columns={columns} />
      </div>
    </>
  );
};
