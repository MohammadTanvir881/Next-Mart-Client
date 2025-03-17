import { cn } from '@/lib/utils'
import React, { useState } from 'react'


type IImageUploaderProps = {
    imageFiles: File[] | [],
    setImageFiles: React.Dispatch<React.SetStateAction<File[] | []>>,
    label?: string,
    className?: string,
    setImagePreview: React.Dispatch<React.SetStateAction<string[]>>;
}

const NMImageUploader = ({ imageFiles, setImageFiles, label, className, setImagePreview }: IImageUploaderProps) => {



    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // console.log(event.target.files)
        const file = event.target.files![0];
        setImageFiles((prev) => [...prev, file])

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview((prev) => [...prev, reader.result as string])
            }
            reader.readAsDataURL(file)
        }
    }


    // console.log(imageFiles)

    return (
        <div className={cn('flex flex-col w-full gap-4', className)}>
            <input className='hidden' id='image-uploader' onChange={handleImageChange} type="file" multiple accept='image/*' />
            <label htmlFor="image-uploader" className="w-full h-36 mt-5
            flex items-center justify-center border-2 border-dashed border-gray-300 
            rounded-md cursor-pointer text-center text-sm text-gray-500 hover:bg-gray-50 transition">
                {label}
            </label>


        </div>
    )
}

export default NMImageUploader