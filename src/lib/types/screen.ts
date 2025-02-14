import { Jewelry } from "./jewelry";
import { Member } from "./member";
import { Order } from "./order";

/** React APP STATE */
export interface AppRootState {
    homePage: HomePageState;
    jewelriesPage: JewelryPageState;
    ordersPage: OrdersPageState;
    favoritePage: FavoritePageState;
};

/** HOMEPAGE*/
export interface HomePageState {
    newJewelry: Jewelry[];
    trendJewelry: Jewelry[];
    topUsers: Member[];
};

/* Jewelry PAGE */
export interface JewelryPageState {
    owner: Member | null;
    jewelryDetail: Jewelry | null;
    jewelries: Jewelry[];
};


/* ORDERS PAGE*/
export interface OrdersPageState {
    pausedOrders: Order[];
    processOrders: Order[];
    finishedOrders: Order[];
};

export interface FavoritePageState {
    like: Jewelry[];
    save: Jewelry[];
}