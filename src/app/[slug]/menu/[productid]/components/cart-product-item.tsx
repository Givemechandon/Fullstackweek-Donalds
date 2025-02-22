import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import { useContext } from "react";

import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/helpers/format-currency";

import { CartContext, CartProduct } from "../../contexts/cart";

interface CartItemProps {
    product: CartProduct;
}
const CartProductItem = ({product}: CartItemProps) => {
    const {decreaseProductQuantity , increaseProductQuantity, removeProduct} = useContext(CartContext);
    return ( 
        <div className="flex items-center justify-between">
            {/* ESQUERDA */}
            <div className="flex items-center gap-3">
            <div className="relative h-20 w-20 bg-gray-200 rounded-xl p-6">
                <Image src={product.imageUrl} alt={product.name} layout="fill"/>
            </div>
            <div className="space-y-1">
                <p className="text-xs max-w[85%] text-ellipsis">{product.name}</p>
                <p className="text-sm font-semibold">{formatCurrency(product.price)}</p>
                {/* QUANTIDADE */}
                <div className="flex items-center gap-1 text-center">
                    <Button className="w-7 h-7 rounded-lg" variant="outline" onClick={() => decreaseProductQuantity(product.id)}>
                        <ChevronLeftIcon size={16}/>
                    </Button>
                    <p className="w-7 text-xs">{product.quantity}</p>
                    <Button className="w-7 h-7 rounded-lg" variant="destructive" onClick={() => increaseProductQuantity(product.id)}>
                        <ChevronRightIcon size={16}/>
                    </Button>
                </div>
            </div>
            </div>
            {/* DIREITA, BOTAO DE DELETAR */}
            <Button className="w-7 h-7 rounded-lg" variant="outline" onClick={() => removeProduct(product.id)}>
                <TrashIcon/>
            </Button>
        </div>
     );
};
 
export default CartProductItem;