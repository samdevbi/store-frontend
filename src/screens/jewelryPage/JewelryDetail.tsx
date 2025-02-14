
import React, { useEffect } from "react";
import { Container, Stack, Box, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Divider from "../../app/components/divider";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper";
import { createSelector, Dispatch } from "@reduxjs/toolkit";
import { Member } from "../../lib/types/member";
import { useParams } from "react-router-dom";
import MemberService from "../../app/services/MemeberService";
import { useDispatch, useSelector } from "react-redux";
import { serverApi } from "../../lib/config";
import { CartItem } from "../../lib/types/search";
import { setJewelryDetail, setOwner } from "./slice";
import { retrieveJewelryDetail, retrieveOwner } from "./selector";
import { Jewelry } from "../../lib/types/jewelry";
import JewelryService from "../../app/services/JewelryService";
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import { JewelryType } from "../../lib/enums/jewelry.enum";


/* Redux Slice and Selector */
const actionDispatch = (dispatch: Dispatch) => ({
    setOwner: (data: Member) => dispatch(setOwner(data)),
    setJewelryDetail: (data: Jewelry) => dispatch(setJewelryDetail(data)),
});
const jewelryDetailRetriever = createSelector(retrieveJewelryDetail, (jewelryDetail) => ({
    jewelryDetail,
}));
const ownerRetriever = createSelector(retrieveOwner, (owner) => ({
    owner,
}));
interface JewelryDetailProps {
    onAdd: (item: CartItem) => void;
}

export default function JewelryDetail(props: JewelryDetailProps) {
    const { onAdd } = props;
    const { jewelryId } = useParams<{ jewelryId: string }>();
    const { setOwner, setJewelryDetail } = actionDispatch(useDispatch());
    const { jewelryDetail } = useSelector(jewelryDetailRetriever);
    const { owner } = useSelector(ownerRetriever);

    useEffect(() => {
        const jewelry = new JewelryService();
        jewelry
            .getJewelry(jewelryId)
            .then((data) => setJewelryDetail(data))
            .catch((err) => console.log(err));

        const member = new MemberService();
        member
            .getOwner()
            .then((data) => setOwner(data as unknown as Member))
            .catch((err) => console.log());
    }, []);

    if (!jewelryDetail) return null;

    return (
        <div className={"chosen-product"}>
            <Box className={"box"}>Jewelry Detail</Box>
            <Container className={"product-container"}>
                <Stack className={'main-img-box'}>
                    <Stack className={"chosen-product-slider"}>
                        <Swiper
                            loop={true}
                            spaceBetween={10}
                            navigation={true}
                            modules={[FreeMode, Navigation, Thumbs]}
                            className="swiper-area"
                        >
                            {jewelryDetail?.jewelryImages.map((ele: string, index: number) => {
                                const imagePath = `${serverApi}/${ele}`;
                                return (
                                    <SwiperSlide key={index} >
                                        <img className="slider-image" src={imagePath} />
                                    </SwiperSlide>
                                );
                            })}
                        </Swiper>
                    </Stack>
                    <Stack className={'img-box'}>
                        <Typography className={'detail'}>Jewelry Detail:</Typography>
                        <Typography className={'text'}>{jewelryDetail?.jewelryDetail}</Typography>
                    </Stack>
                </Stack>
                <Stack className={"chosen-product-info"}>
                    <Box className={"info-box"}>
                        <strong className={"product-name"}>
                            {jewelryDetail?.jewelryName}
                        </strong>
                        <Box className={'detail'}>
                            <Box className={'type'}>
                                <p className={'product-type text'}>Jewelry Type: </p>
                                <p className={'product-type text-main'}>{jewelryDetail?.jewelryType}</p>
                            </Box>
                            <Box className={'type'}>
                                <p className={'product-materila text'}>Jewelry Material: </p>
                                <p className={'product-type text-main'}>{jewelryDetail?.jewelryMaterial}</p>
                            </Box>
                            <Box className={'type'}>
                                <p className={'product-gender text'}>For: </p>
                                <p className={'product-type text-main'}>{jewelryDetail?.jewelryGender}</p>
                            </Box>
                            <Box className={'type'}>
                                <p className={'product-size text'}>Jewelry size or length: </p>
                                <p className={'product-type text-main'}>{jewelryDetail?.jewelryType === JewelryType.RING ? jewelryDetail.jewelrySize : jewelryDetail?.jewelryLength}</p>
                            </Box>
                        </Box>
                        <span className={"resto-name"}>Owner: {owner?.memberNick}</span>
                        <span className={"resto-name"}>Phone: {owner?.memberPhone}</span>
                        <Box className={"rating-box"}>
                            <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
                            <div className={"evaluation-box"}>
                                <div className={"product-view"}>
                                    <RemoveRedEyeIcon sx={{ mr: "10px" }} />
                                    <span>{jewelryDetail?.jewelryViews}</span>
                                </div>
                                {/* <div className={"product-view"}>
                                    <FavoriteOutlinedIcon sx={{ mr: "10px" }} />
                                    <span>{jewelryDetail?.jewelryViews}</span>
                                </div> */}
                            </div>
                        </Box>
                        <p className={"product-desc"}>
                            {jewelryDetail?.jewelryDesc
                                ? jewelryDetail?.jewelryDesc
                                : "No description"}
                        </p>
                        <Divider height="1" width="100%" bg="#000000" />
                        <div className={"product-price"}>
                            <span>Price:</span>
                            <span>${jewelryDetail?.jewelryPrice}</span>
                        </div>
                        <div className={"button-box"}>
                            <Button
                                onClick={(e) => {
                                    onAdd({
                                        _id: jewelryDetail?._id,
                                        name: jewelryDetail?.jewelryName,
                                        price: jewelryDetail?.jewelryPrice,
                                        image: jewelryDetail?.jewelryImages[0],
                                        quantity: 1,
                                    });
                                    e.stopPropagation();
                                }}
                                variant="contained"
                            >
                                Add To
                            </Button>
                        </div>
                    </Box>
                </Stack>
            </Container>
        </div>
    );
}