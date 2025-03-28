"use client"
import React, { useState } from 'react'
import CreateCategoryModal from './CreateCategoryModal'
import { deleteCategory, getAllCategories } from '@/services/Category'
import { ICategory } from '@/types'
import { ColumnDef } from '@tanstack/react-table'
import { NMTable } from '@/components/ui/core/NMTable'
import Image from 'next/image'
import { Trash } from 'lucide-react'
import DeleteConfirmationModal from '@/components/ui/core/NMModal/DeleteConfirmationModal'
import { toast } from 'sonner'

type ICategoryProps = {
    category: ICategory[]
}

const ManageCategories = ({ category }: ICategoryProps) => {

    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [selectedItem, setSeletedItem] = useState<string | null>(null);

    const handleDelete = (data: ICategory) => {
        console.log(data);
        setSelectedId(data?._id);
        setSeletedItem(data?.name);
        setModalOpen(true);

    };


    const handleDeleteConfirm = async () => {
        try {
            if (selectedId) {
                const res = await deleteCategory(selectedId);
                console.log(res)
                if (res.success) {
                    toast.success(res.message)
                }
                else {
                    toast.error(res.message)
                }
            }
        } catch (error: any) {

        }
    }

    const columns: ColumnDef<ICategory>[] = [
        {
            accessorKey: "name",
            header: () => <div>Category Name</div>,
            cell: ({ row }) => (
                <div className="flex items-center space-x-3">
                    <Image
                        src={row.original.icon}
                        alt={row.original.name}
                        width={40}
                        height={40}
                        className="w-8 h-8 rounded-full"
                    />
                    <span className="truncate">{row.original.name}</span>
                </div>
            ),
        },
        {
            accessorKey: "isActive",
            header: () => <div>isActive</div>,
            cell: ({ row }) => (
                <div>
                    {row.original.isActive ? (
                        <p className="text-green-500 border bg-green-100 w-14 text-center px-1 rounded">
                            True
                        </p>
                    ) : (
                        <p className="text-red-500 border bg-red-100 w-14 text-center px-1 rounded">
                            False
                        </p>
                    )}
                </div>
            ),
        },
        {
            accessorKey: "action",
            header: () => <div>Action</div>,
            cell: ({ row }) => (
                <button
                    className="text-red-500"
                    title="Delete"
                    onClick={() => handleDelete(row.original)}
                >
                    <Trash className="w-5 h-5" />
                </button>
            ),
        },

    ]


    return (
        <div>
            <div className='flex mb-5 item-center justify-between'>
                <h1 className='text-2xl font-bold'>Manage Categories</h1>
                <CreateCategoryModal></CreateCategoryModal>
            </div>
            <NMTable data={category} columns={columns} />
            <DeleteConfirmationModal
                name={selectedItem}
                isOpen={isModalOpen}
                onOpenChange={setModalOpen}
                onConfirm={handleDeleteConfirm}
            ></DeleteConfirmationModal>
        </div>
    )
}

export default ManageCategories