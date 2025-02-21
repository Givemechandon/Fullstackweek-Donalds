import { notFound } from "next/navigation";

import { db } from "@/lib/prisma";

import RestaurantHeader from "./components/header";

interface RestaurantMenuPageProps {
    params: Promise<{slug: string}>
    searchParams: Promise<{comsumptionMethod: string}>;
}

const isComsumptionMethodValid = (ComsumptionMethod: string) => {
    return ["DINE_IN" , "TAKEAWAY"].includes(ComsumptionMethod.toUpperCase());
}

const RestaurantMenuPage = async ({params, searchParams}: RestaurantMenuPageProps) => {
    const {slug} = await params;
    const {comsumptionMethod} = await searchParams;
    if (!isComsumptionMethodValid(comsumptionMethod)) {
        return notFound();
    }
    const restaurant = await db.restaurant.findUnique({where: {slug}});
    if (!restaurant) {
        return notFound();
    }
    return (
        <div>
            <RestaurantHeader restaurant={restaurant}/>
        </div>
    );
};
 
export default RestaurantMenuPage;


// http://localhost:3000/fsw-donalds/menu?comsumptionMethod=dine_in