import { notFound } from "next/navigation";

import { db } from "@/lib/prisma";

import ProductDetails from "./components/product-details";
import ProductHeader from "./components/product-header";

interface ProductPageProps {
    params: Promise<{slug: string, productid: string}>;
}
const ProductPage = async ({params}: ProductPageProps) => {
    const {slug, productid} = await params;
    const product = await db.product.findUnique({where: {id: productid}, include: {restaurant: {select: {slug: true, name: true, avatarImageUrl: true}}}});
    if (!product) {
        return notFound();
    }
    if (product.restaurant.slug.toUpperCase() !== slug.toUpperCase()) {
        return notFound();
    }
    return ( 
    <div className="flex -full flex-col">
    <ProductHeader product={product}/>
    <ProductDetails product={product}/>
    </div>
    );
};
 
export default ProductPage;