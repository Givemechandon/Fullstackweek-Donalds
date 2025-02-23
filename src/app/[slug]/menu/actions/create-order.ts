"use server";

import { ComsumptionMethod } from "@prisma/client";
import { redirect } from "next/navigation";

import { db } from "@/lib/prisma";

import { removeCpfPunctuation } from "../helpers/cpf";



interface CreateOrderInput {
    customerName: string;
    customerCpf: string;
    products: Array<{
        id: string;
        quantity: number;
    }>;
    
    comsumptionMethod: ComsumptionMethod;
    slug: string;
}

export const createOrder = async (input: CreateOrderInput) => {
    const restaurant = await db.restaurant.findUnique({
        where: {
            slug: input.slug,
        }
    })
    if (!restaurant) {
        throw new Error("Restaurant not found");
    }
    const productsWithPrices = await db.product.findMany({
        where: {
            id: {
                in: input.products.map(product => product.id)
            },
        },
        });

        const productsWithPricesAndQuantities = input.products.map(product => ({
            productId: product.id,
            quantity: product.quantity,
            price: productsWithPrices.find(p => p.id === product.id)!.price,
        }));

        await db.order.create({
            data: {
                status: "PENDING",
                costumerName: input.customerName,
                costumerCpf: removeCpfPunctuation(input.customerCpf),
                orderProducts: {
                    createMany: {
                        data: productsWithPricesAndQuantities,
                    },
                },
                total: productsWithPricesAndQuantities.reduce((acc, product) => {
                    return acc + product.price * product.quantity;
                }, 0),
                comsumptionMethod: input.comsumptionMethod,
                restaurantId: restaurant.id,
            },
        });
        redirect(`/${input.slug}/orders`);
};