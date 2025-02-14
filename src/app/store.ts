import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import HomePageReducer from '../screens/homePage/slice';
import reduxLogger from 'redux-logger';
import OrdersPageReducer from '../screens/ordersPage/slice';
import JewelryPageReducer from '../screens/jewelryPage/slice';
import FavoritePageReducer from '../screens/favoritePage/slice';

export const store = configureStore({
  middleware: (getDefaultMiddlware) =>
    //@ts-ignore
    getDefaultMiddlware().concat(reduxLogger),
  reducer: {
    homePage: HomePageReducer,
    jewelriesPage: JewelryPageReducer,
    ordersPage: OrdersPageReducer,
    favoritePage: FavoritePageReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
