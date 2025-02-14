import { createSelector } from "@reduxjs/toolkit";
import { AppRootState } from "../../lib/types/screen";
import { create } from "@mui/material/styles/createTransitions";
import HomePage from ".";

const selectFavoritePage = (state: AppRootState) => state.favoritePage;

export const retrievePausedOrders = createSelector(
   selectFavoritePage,
   (FavoritePage) => FavoritePage.like
);

export const retrieveProcessOrders = createSelector(
   selectFavoritePage,
   (FavoritePage) => FavoritePage.save
);