import { IProduct } from './Product';

export interface ICheckout {
    id?: number;
    username?: string;
    email?: string;
    phone: string;
    userId?: string;
    address: string;
    products: IProduct[];
    state: number;
}
