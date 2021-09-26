import { Location } from 'history';

export interface TLocation extends Location {
    from: string;
    pushLocation?: Location;
}

export type TIngredient = {
    _id: string;
    name: string;
    type: string;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v: number;
}

export type TOrder = {
    _id: string;
    ingredients: Array<string>;
    status: 'done' | 'pending' | 'created' | 'cancel';
    name: string;
    createdAt: Date;
    updatedAt: Date;
    number: number;
    owner?: { email?: string; name?: string; password?: string, token?: string };
    price?: number;
}