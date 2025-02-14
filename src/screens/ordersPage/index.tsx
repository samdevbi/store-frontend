import { useState, SyntheticEvent, useEffect } from "react";
import { Box, Button, Container, InputBase, Stack } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PauseOrders from "./PauseOrders";
import ProcessOrders from "./ProcessOrders";
import FinishedOrders from "./FinishedOrders";
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { Order, OrderInquiry } from "../../lib/types/order";
import { setFinishedOrders, setPausedOrders, setProcessOrders } from "./slice";
import { Dispatch } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { OrderStatus } from "../../lib/enums/order.enum";
import OrderService from "../../app/services/OrderService";
import { useGlobals } from "../../app/hooks/useGlobals";
import { useHistory } from "react-router-dom";
import { MemberType } from "../../lib/enums/member.enum";
import "../../css/order.css";
import { serverApi } from "../../lib/config";



const actionDispatch = (dispatch: Dispatch) => ({
  setPausedOrders: (data: Order[]) => dispatch(setPausedOrders(data)),
  setProcessOrders: (data: Order[]) => dispatch(setProcessOrders(data)),
  setFinishedOrders: (data: Order[]) => dispatch(setFinishedOrders(data)),
});



export default function OrdersPage() {
  const { setPausedOrders, setProcessOrders, setFinishedOrders } = actionDispatch(useDispatch());
  const history = useHistory();
  const { orderBuilder, authMember } = useGlobals();
  const [value, setValue] = useState("1");
  const [orderInquiry, setOrderInquiry] = useState<OrderInquiry>({
    page: 1,
    limit: 5,
    orderStatus: OrderStatus.PAUSE,
  });

  useEffect(() => {
    const order = new OrderService();
    order.getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.PAUSE }).then((data) => setPausedOrders(data)).catch((err) => console.log(err));
    order.getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.PROCESS }).then((data) => setProcessOrders(data)).catch((err) => console.log(err));
    order.getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.FINISH }).then((data) => setFinishedOrders(data)).catch((err) => console.log(err));


  }, [orderInquiry, orderBuilder]);


  const handleChange = (e: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  if (!authMember) history.push("/");


  return <div className={"order-page"}>
    <Container className={"order-container"}>
      <Stack className={"order"}>
        <TabContext value={value}>
          <Box className={"order-nav-frame"}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
                className={"table-list"}>
                <Tab label="PAUSED ORDERS" value={"1"} />
                <Tab label="PROCESS ORDERS" value={"2"} />
                <Tab label="FINISHED ORDERS" value={"3"} />
              </Tabs>
            </Box>
          </Box>
          <Stack className={"order-main-context"}>
            <PauseOrders setValue={setValue} />
            <ProcessOrders setValue={setValue} />
            <FinishedOrders />
          </Stack>
        </TabContext>
      </Stack>

      <Stack className={"order-right"}>
        <Box className={"order-info-box"}>
          <Box className={"member-box"}>
            <div className={"order-user-img"}>
              <img src={authMember?.memberImage ? `${serverApi}/${authMember.memberImage}` : "/icons/default-user.svg"}
                className={"order-user-avatar"} />
              <div className={"order-user-prof"} >
                <img src="/icons/user-badge.svg" alt="" />
              </div>
            </div>
            <span className={"order-user-name"}>{authMember?.memberNick}</span>
            <span className={"order-user-prof"}>{authMember?.memberType}</span>
          </Box>
          <Box className={"liner"}></Box>
          <Box className={"order-user-address"}>
            <div style={{ display: "flex" }}>
              <LocationOnIcon />
              {authMember?.memberAddress ? authMember?.memberAddress : "Do not exist"}
            </div>
          </Box>
        </Box>

        <Box className={"info-card"}>
          <InputBase type="text" placeholder=" Card number: 5243 4090 2002 7495" className={"card-num-input"} />
          <Box className={"small-input"}>
            <InputBase type="text" placeholder=" 07/24" className={"card-code-input"} />
            <InputBase type="text" placeholder=" CVV: 010" className={"card-cvv-input"} />
          </Box>
          <InputBase type="text" placeholder="  Justin Robertson" className={"card-name-input"} />

          <Box className={"card-list"}>
            <Button>
              <img src="./img/western-union-card.svg" />
            </Button>
            <Button>
              <img src="./img/master-card.svg" />
            </Button>
            <Button>
              <img src="./img/paypal-card.svg" />
            </Button>
            <Button>
              <img src="./img/visa-card.svg" />
            </Button>
          </Box>
        </Box>
      </Stack>

    </Container>
  </div>;
}