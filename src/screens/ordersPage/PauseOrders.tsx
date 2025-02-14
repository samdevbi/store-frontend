import React from "react";
import { Box, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import TabPanel from "@mui/lab/TabPanel";
import { createSelector } from "@reduxjs/toolkit";
import { retrievePausedOrders } from "./selector";
import { useSelector } from "react-redux";
import { Order, OrderItem, OrderUpdateInput } from "../../lib/types/order";
import { Messages, serverApi } from "../../lib/config";
import { useGlobals } from "../../app/hooks/useGlobals";
import { sweetErrorHandling } from "../../lib/sweetAlert";
import { T } from "../../lib/types/common";
import { OrderStatus } from "../../lib/enums/order.enum";
import OrderService from "../../app/services/OrderService";
import "../../css/order.css";
import { Jewelry } from "../../lib/types/jewelry";


//** Redux Selector */
const pausedOrdersRetriever = createSelector(
    retrievePausedOrders,
    (pausedOrders) => ({ pausedOrders })
);

interface PausedOrdersProps {
    setValue: (input: string) => void;
}


export default function PausedOrders(props: PausedOrdersProps) {
    const { setValue } = props;
    const { authMember, setOrderBuilder } = useGlobals();
    const { pausedOrders } = useSelector(pausedOrdersRetriever);

    /* Handlers*/

    const deleteOrderHandler = async (e: T) => {
        try {
            if (!authMember) throw new Error(Messages.error2);
            const orderId = e.target.value;
            const input: OrderUpdateInput = {
                orderId: orderId,
                orderStatus: OrderStatus.DELETE,
            };

            const confirmation = window.confirm("Do you want to proceed the order?");
            if (confirmation) {
                const order = new OrderService();
                await order.updateOrder(input);
                setOrderBuilder(new Date());
            }

        } catch (err) {
            console.log(err);
            sweetErrorHandling(err).then();
        }
    };

    const processOrderHandler = async (e: T) => {
        try {
            if (!authMember) throw new Error(Messages.error2);
            // Payment Process
            const orderId = e.target.value;
            const input: OrderUpdateInput = {
                orderId: orderId,
                orderStatus: OrderStatus.PROCESS,
            };

            const confirmation = window.confirm("Do you want to process the order?");
            if (confirmation) {
                const order = new OrderService();
                await order.updateOrder(input);
                setValue("2");
                setOrderBuilder(new Date());
            }

        } catch (err) {
            console.log(err);
            sweetErrorHandling(err).then();
        }
    };

    return (
        <TabPanel value={"1"}>
            <Stack>
                {pausedOrders.map((order: Order) => {

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
                                <Button value={order._id} variant="contained" className={"cancel-button"} onClick={deleteOrderHandler}>
                                    Cancel
                                </Button>
                                <Button value={order._id} variant="contained" className={"payment-button"} onClick={processOrderHandler}>
                                    Buy
                                </Button>
                            </Box>
                        </Box>
                    )
                })}

                {!pausedOrders || (pausedOrders?.length === 0 && (
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