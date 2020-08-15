import { Image } from './image';
export class Product {
    _id: string;
    nameAR: string;
    nameTR: string;
    descriptionAR: string;
    descriptionTR: string;
    images: Image[];
}