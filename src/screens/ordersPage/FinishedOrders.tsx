import React from "react";
import { Box, Stack } from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";
import { createSelector } from "@reduxjs/toolkit";
import { retrieveFinishedOrders } from "./selector";
import { useSelector } from "react-redux";
import { serverApi } from "../../lib/config";
import { Jewelry } from "../../lib/types/jewelry";
import { Order, OrderItem } from "../../lib/types/order";

//** Redux Selector */
const finishedOrdersRetriever = createSelector(
    retrieveFinishedOrders,
    (finishedOrders) => ({ finishedOrders })
);

export default function FinishedOrders() {
    const { finishedOrders } = useSelector(finishedOrdersRetriever);

    return (
        <TabPanel value={"3"}>
            <Stack>
                {finishedOrders.map((order: Order) => {

                    return (
                        <Box key={order._id} className={"order-main-box"}>
                            <Box className={"order-box-scroll"}>
                                {order.orderItems.map((item: OrderItem) => {
                                    const jewelry: Jewelry = order.productData.filter(
                                        (ele: Jewelry) => item.productId === ele._id
                                    )[0];
                                    const imagePath = `${serverApi}/${jewelry?.jewelryImages[0]}`;
                                    return (
                                        <Box key={item._id} className={"orders-name-price"}>
                                            <Box className={'box-img'}>
                                                <img
                                                    src={imagePath}
                                                    className={"order-dish-img"} />
                                                <p className={"title-dish"}>{jewelry?.jewelryName}</p>
                                                <p className={"title-gender"}>For:{jewelry?.jewelryGender}</p>
                                            </Box>
                                            <Box className={"price-box"}>
                                                <p className={'jewelry-price'}>${item.itemPrice}</p>
                                                <img src={"/icons/close.svg"} />
                                                <p className={'jewelry-quantity'}>{item.itemQuantity}</p>
                                                <img src={"/icons/pause.svg"} />
                                                <p className={'jewelry-total'} style={{ marginLeft: "15px" }}>${item.itemQuantity * item.itemPrice}</p>
                                            </Box>
                                        </Box>
                                    );
                                })}
                            </Box>
                            <Box className={"total-price-box"}>
                                <Box className={"box-total"}>
                                    <p>Product price</p>
                                    <p>${order.orderTotal - order.orderDelivery}</p>
                                    <img src={"/icons/plus.svg"} style={{ marginLeft: "10px" }} />
                                    <p>delivery cost</p>
                                    <p>${order.orderDelivery}</p>
                                    <img
                                        src={"/icons/pause.svg"}
                                        style={{ marginLeft: "10px" }} />
                                    <p>Total</p>
                                    <p>${order.orderTotal}</p>
                                </Box>
                            </Box>
                        </Box>
                    )
                })}

                {!finishedOrders || (finishedOrders?.length === 0 && (
                    <Box display={"flex"} flexDirection={"row"} justifyContent={"center"}>
                        <img
                            src={"/icons/noimage-list.svg"}
                            style={{ width: 300, height: 300 }} />
                    </Box>
                ))}
            </Stack>
        </TabPanel>
    );
}