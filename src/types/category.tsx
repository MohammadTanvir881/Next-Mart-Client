export interface ICategory {
    _id: string;
    name: string;
    desctription: string;
    icon: string;
    createdAt: string;
    createdBy: string;
    isActive: boolean;
    slug: string;
    updatedAt: string;
    children: ICategory[]




}