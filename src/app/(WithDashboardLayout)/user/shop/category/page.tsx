"use server"
import ManageCategories from "@/components/modules/shop/category"
import { getAllCategories } from "@/services/Category";


const ProdactCategoryPage = async () => {
    const { data, meta } = await getAllCategories();
    return (
        <div>
            <ManageCategories category={data}></ManageCategories>
        </div>
    )
}

export default ProdactCategoryPage