import React, { useEffect } from 'react';
import Advertisement from "./Advertisement";
import ActiveUsers from "./ActiveUsers";
import "../../css/home.css";
import { useDispatch } from 'react-redux';
import { Dispatch } from '@reduxjs/toolkit';
import MemberService from '../../app/services/MemeberService';
import { Member } from '../../lib/types/member';
import TrendJewelries from './TrendJewelries';
import CategoryJewelries from './CategoryJewelries';
import OurStore from './OurStore';
import { setNewJewelry, setTopUsers, setTrendJewelry } from './slice';
import { Jewelry } from '../../lib/types/jewelry';
import JewelryService from '../../app/services/JewelryService';
import { ProductGender } from '../../lib/types/common';
import NewJewelry from './NewJewelry';

/* REDUX SLICE */
const actionDispatch = (dispatch: Dispatch) => ({
    setTrendJewelry: (data: Jewelry[]) => dispatch(setTrendJewelry(data)),
    setNewJewelry: (data: Jewelry[]) => dispatch(setNewJewelry(data)),
    setTopUSers: (data: Member[]) => dispatch(setTopUsers(data)),
});
export default function HomePage() {
    const { setTrendJewelry, setNewJewelry, setTopUSers } = actionDispatch(useDispatch());

    useEffect(() => {
        const jewelry = new JewelryService();

        jewelry.getJewelries({
            page: 1,
            limit: 4,
            order: "createdAt",
        })
            .then(data => {
                console.log("data passed here");
                setNewJewelry(data);
            }).catch((err) => console.log(err));


        jewelry.getJewelries({
            page: 1,
            limit: 4,
            order: "jewelryViews",
            jewelryGender: ProductGender.WOMAN,
        })
            .then(data => {
                console.log("data passed here");
                setTrendJewelry(data);
            }).catch((err) => console.log(err));

        const member = new MemberService();
        member
            .getTopUsers()
            .then((data) => setTopUSers(data))
            .catch((err) => console.log(err));
    }, [])

    return (<div className={"homepage"}>
        <CategoryJewelries />
        <NewJewelry />
        <TrendJewelries />
        <Advertisement />
        <ActiveUsers />
        <OurStore />
    </div>);
}