import { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";

import { formatCurrency } from "@/helpers/format-currency";

interface ProductsProps {
    products: Product[];
}

const Products = ({products}: ProductsProps) => {
    const {slug} = useParams<{slug: string}>();
    const searchParams = useSearchParams();
    const comsumptionMethod = searchParams.get("comsumptionMethod");
    return (
    <div className="space-y-3 px-5 py-3">
            {products.map(product => (
                <Link href={`/${slug}/menu/${product.id}?comsumptionMethod=${comsumptionMethod}`} key={product.id}  className="flex items-center justify-between gap-10 border-b">
                    {/* PARTE DA ESQUERDA */}
                    <div>
                        <h3 className="text-sm font-medium">{product.name}</h3>
                        <p className="line-clamp-2 text-sm text-muted-foreground">{product.description}</p>
                        <p className="pt-3 text-sm font-semibold">{formatCurrency(product.price)}</p>
                    </div>

                    {/* PARTE DA DIREITA */}
                    <div className="relative min-h-[82px] min-w-[120px]">
                        <Image src={product.imageUrl} alt={product.name} fill className="rounded-lg object-contain"/>
                    </div>
                </Link>
            ))}
        </div>)
};

export default Products;