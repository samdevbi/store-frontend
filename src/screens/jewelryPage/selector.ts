import { createSelector } from "@reduxjs/toolkit";
import { AppRootState } from "../../lib/types/screen";

const selectJewelriesPage = (state: AppRootState) => state.jewelriesPage;

export const retrieveOwner = createSelector(
   selectJewelriesPage,
   (JewelriesPage) => JewelriesPage.owner
);

export const retrieveJewelryDetail = createSelector(
   selectJewelriesPage,
   (JewelriesPage) => JewelriesPage.jewelryDetail
);

export const retrieveJewelries = createSelector(
   selectJewelriesPage,
   (JewelriesPage) => JewelriesPage.jewelries
);