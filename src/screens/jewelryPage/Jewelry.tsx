import React, { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { Box, Button, Container, InputBase, Menu, MenuItem, Stack, Typography } from "@mui/material";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Badge from "@mui/material/Badge";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import "../../css/jewelry.css";
import { setJewelries } from "./slice";
import { createSelector, Dispatch } from "@reduxjs/toolkit";
import { retrieveJewelries } from "./selector";
import { useDispatch, useSelector } from "react-redux";
import ProductService from "../../app/services/JewelryService";
import { ProductCollection } from "../../lib/enums/product.enum";
import { Messages, serverApi } from "../../lib/config";
import { useHistory } from "react-router-dom";
import { CartItem } from "../../lib/types/search";
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CheckIcon from '@mui/icons-material/Check';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import TripOriginOutlinedIcon from '@mui/icons-material/TripOriginOutlined';
import { Jewelry, JewelryInquiry } from "../../lib/types/jewelry";
import JewelryService from "../../app/services/JewelryService";
import { ProductGender } from "../../lib/types/common";
import { JewelryMaterial, JewelryType } from "../../lib/enums/jewelry.enum";
import OurStore from "../homePage/OurStore";
import { useGlobals } from "../../app/hooks/useGlobals";
import OrderService from "../../app/services/OrderService";
import { sweetErrorHandling } from "../../lib/sweetAlert";
/* Redux Slice and Selector */
const actionDispatch = (dispatch: Dispatch) => ({
    setJewelries: (data: Jewelry[]) => dispatch(setJewelries(data)),
});
const jewelriesRetriever = createSelector(retrieveJewelries, (jewelries) => ({
    jewelries,
}));

interface ProductsProps {
    onAdd: (item: CartItem) => void;
}


export default function JewelryPage(props: ProductsProps) {
    const { onAdd } = props;
    const authMember = useGlobals();
    const { setJewelries } = actionDispatch(useDispatch());
    const { jewelries } = useSelector(jewelriesRetriever);
    const [jewelrySearch, setJewelrySearch] = useState<JewelryInquiry>({
        page: 1,
        limit: 16,
        order: 'createdAt',
        search: ''
    });
    const [searchText, setSearchText] = useState<string>("");

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [sortingOpen, setSortingOpen] = useState(false);
    const [filterSortName, setFilterSortName] = useState('New');

    useEffect(() => {
        const jewelry = new JewelryService();

        jewelry.getJewelries(jewelrySearch)
            .then((data) => setJewelries(data))
            .catch((err) => console.log(err));
    }, [jewelrySearch]);

    useEffect(() => {
        if (searchText === "") {
            jewelrySearch.search = "";
            setJewelrySearch({ ...jewelrySearch });
        }
    }, []);

    const history = useHistory();

    /* Handler */
    const searchJewelryGenderHandler = (jewelryGender: ProductGender) => {
        jewelrySearch.page = 1;
        jewelrySearch.jewelryGender = jewelryGender;
        setJewelrySearch({ ...jewelrySearch });
    }

    const searchJewelryTypeHandler = (jewelryType: JewelryType) => {
        jewelrySearch.page = 1;
        jewelrySearch.jewelryType = jewelryType;
        setJewelrySearch({ ...jewelrySearch });
    }

    const searchJewelryMaterialHandler = (jewelryMaterial: JewelryMaterial) => {
        jewelrySearch.page = 1;
        jewelrySearch.jewelryMaterial = jewelryMaterial;
        setJewelrySearch({ ...jewelrySearch });
    }

    const jewelryDetailHandler = (jewelryId: string) => {
        history.push(`/jewelry/${jewelryId}`);
    };

    const paginationHandler = (e: ChangeEvent<any>, value: number) => {
        jewelrySearch.page = value;
        setJewelrySearch({ ...jewelrySearch });
    };

    const sortingClickHandler = (e: MouseEvent<HTMLElement>) => {
        setAnchorEl(e.currentTarget);
        setSortingOpen(true);
    };

    const sortingCloseHandler = () => {
        setSortingOpen(false);
        setAnchorEl(null);
    };

    const sortingHandler = (e: React.MouseEvent<HTMLLIElement>) => {
        switch (e.currentTarget.id) {
            case 'new':
                jewelrySearch.page = 1;
                jewelrySearch.order = "createdAt"
                setJewelrySearch({ ...jewelrySearch, order: 'createdAt' });
                setFilterSortName('New');
                break;
            case 'view':
                jewelrySearch.page = 1;
                jewelrySearch.order = "jewelryViews"
                setJewelrySearch({ ...jewelrySearch, order: 'jewelryViews' });
                setFilterSortName('View');
                break;
            case 'price':
                jewelrySearch.page = 1;
                jewelrySearch.order = "jewelryPrice"
                setJewelrySearch({ ...jewelrySearch, order: 'jewelryPrice' });
                setFilterSortName('Price');
                break;
        }
        setSortingOpen(false);
        setAnchorEl(null);
    };

    return (
        <div className={"jewelry"}>
            <Container className={'jewelry-cnt'}>
                <Stack className={'top'}>
                    <Stack className={'top-bar'}>
                        <Box className={'gender-btn'}>
                            <Button
                                variant={'outlined'}
                                className={'male-btn'}
                                color={jewelrySearch.jewelryGender === ProductGender.MAN ? "primary" : "secondary"}
                                onClick={() => searchJewelryGenderHandler(ProductGender.MAN)}>
                                Man
                            </Button>
                            <Button
                                variant={'outlined'}
                                className={'female-btn'}
                                color={jewelrySearch.jewelryGender === ProductGender.WOMAN ? "primary" : "secondary"}
                                onClick={() => searchJewelryGenderHandler(ProductGender.WOMAN)}>
                                Woman
                            </Button>
                        </Box>
                        <Box className={'search'}>
                            <InputBase className={'search-input'} />
                            <Button className={'search-btn'}>
                                Search
                                <SearchIcon className={'finder'} />
                            </Button>
                        </Box>
                        <Stack className={'sorting'}>
                            <Typography className={'sort-name'}>Sort:</Typography>
                            <Button className={'menu-btn'} onClick={sortingClickHandler} endIcon={<KeyboardArrowDownOutlinedIcon />}>
                                {filterSortName}
                            </Button>
                            <Menu anchorEl={anchorEl} open={sortingOpen} onClose={sortingCloseHandler} className={'menu'}>
                                <MenuItem
                                    onClick={sortingHandler}
                                    id={'new'}
                                    disableRipple
                                    className={'menu-item'} sx={{ fontFamily: "Roboto Serif", fontSize: "16px", fontWeight: "lighter", letterSpacing: "2px" }}>
                                    New
                                </MenuItem>
                                <MenuItem
                                    onClick={sortingHandler}
                                    id={'view'}
                                    disableRipple
                                    className={'menu-item'} sx={{ fontFamily: "Roboto Serif", fontSize: "16px", fontWeight: "lighter", letterSpacing: "2px" }}>
                                    View
                                </MenuItem>
                                <MenuItem
                                    onClick={sortingHandler}
                                    id={'price'}
                                    disableRipple
                                    className={'menu-item'} sx={{ fontFamily: "Roboto Serif", fontSize: "16px", fontWeight: "lighter", letterSpacing: "2px" }}>
                                    Price
                                </MenuItem>
                            </Menu>
                        </Stack>
                    </Stack>
                    <Stack className={'category-jewelry'}>
                        <Stack className={'category-first'}>
                            <Typography className={'category-jewelry-title'}>Category:</Typography>
                            <Box className={'material'}>
                                <Button
                                    variant={'outlined'}
                                    className={'mtr-btn'}
                                    color={jewelrySearch.jewelryMaterial === JewelryMaterial.GOLD ? "primary" : "secondary"}
                                    onClick={() => searchJewelryMaterialHandler(JewelryMaterial.GOLD)}
                                >
                                    Gold
                                    <TripOriginOutlinedIcon className={'gold'} />
                                </Button>
                                <Button
                                    variant={'outlined'}
                                    className={'mtr-btn'}
                                    color={jewelrySearch.jewelryMaterial === JewelryMaterial.SILVER ? "primary" : "secondary"}
                                    onClick={() => searchJewelryMaterialHandler(JewelryMaterial.SILVER)}
                                >
                                    Silver
                                    <TripOriginOutlinedIcon className={'silver'} />
                                </Button>
                                <Button
                                    variant={'outlined'}
                                    className={'mtr-btn'}
                                    color={jewelrySearch.jewelryMaterial === JewelryMaterial.TITANIUM ? "primary" : "secondary"}
                                    onClick={() => searchJewelryMaterialHandler(JewelryMaterial.TITANIUM)}
                                >
                                    Titanium
                                    <TripOriginOutlinedIcon className={'titanium'} />
                                </Button>
                                <Button
                                    variant={'outlined'}
                                    className={'mtr-btn'}
                                    color={jewelrySearch.jewelryMaterial === JewelryMaterial.PLATINUM ? "primary" : "secondary"}
                                    onClick={() => searchJewelryMaterialHandler(JewelryMaterial.PLATINUM)}
                                >
                                    Platinum
                                    <TripOriginOutlinedIcon className={'platinum'} />
                                </Button>
                            </Box>
                        </Stack>
                        <Box className={'category-box'}>
                            <Button
                                variant={'outlined'}
                                className={'bracelets'}
                                color={jewelrySearch.jewelryType === JewelryType.BRACELET ? "primary" : "secondary"}
                                onClick={() => searchJewelryTypeHandler(JewelryType.BRACELET)}
                            >
                                Bracelets
                            </Button>
                            <Button
                                variant={'outlined'}
                                className={'necklaces'}
                                color={jewelrySearch.jewelryType === JewelryType.NECKLACE ? "primary" : "secondary"}
                                onClick={() => searchJewelryTypeHandler(JewelryType.NECKLACE)}
                            >
                                Necklaces
                            </Button>
                            <Button
                                variant={'outlined'}
                                className={'rings'}
                                color={jewelrySearch.jewelryType === JewelryType.RING ? "primary" : "secondary"}
                                onClick={() => searchJewelryTypeHandler(JewelryType.RING)}
                            >
                                Rings
                            </Button>
                            <Button
                                variant={'outlined'}
                                className={'earings'}
                                color={jewelrySearch.jewelryType === JewelryType.EARRING ? "primary" : "secondary"}
                                onClick={() => searchJewelryTypeHandler(JewelryType.EARRING)}
                            >
                                Earings
                            </Button>
                        </Box>
                    </Stack>
                </Stack>
                <Stack className={'jewelry-frame'}>
                    {jewelries.length !== 0 ? (
                        jewelries.map((jewelry: Jewelry) => {
                            const imagePath = `${serverApi}/${jewelry?.jewelryImages[0]}`;
                            return (
                                <Stack key={jewelry._id} className={'card'} >
                                    <Stack className={'card-img'}>
                                        <img src={imagePath} className={'img'} alt="" />
                                    </Stack>
                                    <Box className={'buttons'}>
                                        <Box className={'sale-btns'}>
                                            <Button className={'buy'} onClick={() => { jewelryDetailHandler(jewelry._id) }} >Detail Page
                                            </Button>
                                            <Button className={'add-to'}
                                                onClick={(e) => {
                                                    onAdd({
                                                        _id: jewelry._id,
                                                        quantity: 1,
                                                        name: jewelry.jewelryName,
                                                        price: jewelry.jewelryPrice,
                                                        image: jewelry.jewelryImages[0],
                                                    });
                                                    e.stopPropagation();
                                                }}>
                                                Add To
                                                <LocalMallOutlinedIcon className={'icons'} />
                                            </Button>
                                        </Box>
                                        <Box className={'view-btns'}>
                                            <Typography className={'jewelry-name'}>{jewelry.jewelryName}</Typography>
                                            <Typography className={"views"}>{jewelry.jewelryViews}
                                                <VisibilityIcon
                                                    sx={{ fontSize: 22, marginLeft: "5px" }}
                                                />
                                            </Typography>
                                            {/* <Typography className={"views"}>{jewelry.jewelryLikes}
                                                <FavoriteOutlinedIcon className={'like'}
                                                    sx={{ fontSize: 22, marginLeft: "5px" }}
                                                />
                                            </Typography> */}
                                            {/* <BookmarkBorderOutlinedIcon className={'book-mark'} /> */}
                                        </Box>
                                    </Box>
                                    <Box className={'info-list'}>
                                        <Box className={'info'}>
                                            <Typography className={'jewelry'}>{jewelry.jewelryPrice}$</Typography>
                                            <p className={'yes'}>
                                                <CheckIcon className={'star'} />
                                            </p>
                                        </Box>
                                        <Box className={'info'}>
                                            <Typography className={'jewelry'}>{jewelry.jewelryMaterial}</Typography>
                                            <p className={'yes'}>
                                                <CheckIcon className={'star'} />
                                            </p>
                                        </Box>
                                        <Box className={'info'}>
                                            <Typography className={'jewelry'}>{jewelry.jewelryGender}</Typography>
                                            <p className={'yes'}>
                                                <CheckIcon className={'star'} />
                                            </p>
                                        </Box>
                                    </Box>
                                </Stack>
                            );
                        })) : (<Box className={"no-data"}> No Jewelry List!!</Box>)}
                </Stack>

                <Stack flexDirection={"column"} alignItems={"center"}>
                    <Stack className={"pagination-section"}>
                        <Pagination
                            count={jewelries.length !== 0 ? jewelrySearch.page + 1 : jewelrySearch.page}
                            page={jewelrySearch.page}
                            renderItem={(item) => (
                                <PaginationItem
                                    components={{
                                        previous: ArrowBackIcon,
                                        next: ArrowForwardIcon,
                                    }}
                                    {...item}
                                />
                            )}
                            onChange={paginationHandler}
                        />
                    </Stack>
                </Stack>
                <Stack>
                    <OurStore />
                </Stack>
                <div className={"address"}>
                    <Container>
                        <Stack className={"address-area"}>
                            <Box className={"title"}>Our Address</Box>
                            <iframe
                                className={'frame'}
                                style={{ marginTop: "40px" }}
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1581.9573897862667!2d126.99419083893493!3d37.53350611999727!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca2363a08fae9%3A0xb0cbcaa2a1b0a156!2sLazzat!5e0!3m2!1sen!2skr!4v1721257612631!5m2!1sen!2skr"
                                width="1320"
                                height="500"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </Stack>
                    </Container>
                </div>
            </Container>
        </div>
    );
}