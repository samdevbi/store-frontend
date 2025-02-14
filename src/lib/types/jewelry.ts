import { JewelryMaterial, JewelryType } from "../enums/jewelry.enum";
import { ProductStatus } from "../enums/product.enum";
import { ProductGender } from "./common";
import { MeLiked } from "./like";
import { MeSaved } from "./save";

export interface Jewelry {
    _id: string;
    jewelryStatus: ProductStatus;
    jewelryType: JewelryType;
    jewelryMaterial: JewelryMaterial;
    jewelryGender: ProductGender;
    jewelryBrand: string;
    jewelryLength: number;
    jewelrySize: number;
    jewelryName: string;
    jewelryPrice: number;
    jewelryDetail: string;
    jewelryDesc: string;
    jewelryImages: string[];
    jewelryViews: number;
    jewelryLikes: number;
    jewelryLeftCount?: number,
    createdAt: Date;
    updatedAt: Date;
    meLikely?: MeLiked;
    meSaved?: MeSaved;
}

export interface JewelryInquiry {
    page: number;
    limit: number;
    order: string;
    jewelryGender?: ProductGender;
    jewelryType?: JewelryType;
    jewelryMaterial?: JewelryMaterial;
    search?: string;
}