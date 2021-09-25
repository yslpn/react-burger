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
    ingredients: Array<string>;
    number: number;
    _id: string;
    owner: { email?: string; name?: string; password?: string, token?: string };
    status: 'done' | 'pending' | 'created' | 'cancel';
    name: string;
    createdAt: Date;
    price: number;
}

