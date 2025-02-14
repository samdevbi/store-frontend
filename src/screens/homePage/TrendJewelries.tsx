import React from 'react';

import { Box, Button, Container, Stack } from "@mui/material";
import { AspectRatio, CssVarsProvider } from "@mui/joy";
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import CardOverflow from '@mui/joy/CardOverflow';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DescriptionOutlined from '@mui/icons-material/DescriptionOutlined';
import { createSelector } from '@reduxjs/toolkit';
import { retrieveTrendJewelry } from './selector';
import { useSelector } from 'react-redux';
import StarBorderSharpIcon from '@mui/icons-material/StarBorderSharp';
import CheckIcon from '@mui/icons-material/Check';
import BookmarkSharpIcon from '@mui/icons-material/BookmarkSharp';
import { serverApi } from '../../lib/config';
import { Margin } from '@mui/icons-material';
import { Jewelry } from '../../lib/types/jewelry';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { useHistory } from 'react-router-dom';

/* REDUX SELECTOR */
const trendJewelryRetriever = createSelector(
    retrieveTrendJewelry,
    (trendJewelry) => ({ trendJewelry })
);


export default function TrendJewelries() {
    const { trendJewelry } = useSelector(trendJewelryRetriever);
    const history = useHistory();


    const jewelryDetailHandler = (jewelryId: string) => {
        history.push(`/jewelry/${jewelryId}`);
    };

    return (<div className={"trend-jewelry-frame"}>
        <Container>
            <Stack className={"trand-section"}>
                <Box className={"category-title"}>Trend Jewelries</Box>
                <Box className={"category-small"}>Most likely and popular jewelries</Box>
                <Stack className={"cards-frame"}>
                    {trendJewelry.length !== 0 ? (
                        trendJewelry.map((jewelry: Jewelry) => {
                            const imagePath = `${serverApi}/${jewelry.jewelryImages[0]}`;
                            return (
                                <Stack key={jewelry._id} className={'card'} onClick={() => jewelryDetailHandler(jewelry._id)}>
                                    <Stack className={'card-img'}>
                                        <img src={imagePath} className={'img'} alt="" />
                                    </Stack>
                                    <Box className={'buttons'}>
                                        <Button className={'add-to'}>Add to Bag</Button>
                                        <Typography className={"views"}>{jewelry.jewelryViews}
                                            <VisibilityIcon
                                                sx={{ fontSize: 24, marginLeft: "5px" }}
                                            />
                                        </Typography>
                                        {/* <Typography className={"like"}>{jewelry.jewelryViews}
                                            <FavoriteBorderOutlinedIcon
                                                sx={{ fontSize: 24, marginLeft: "5px" }}
                                            />
                                        </Typography> */}
                                    </Box>
                                    <Box className={'info-list'}>
                                        <Box className={'info'}>
                                            <Typography className={'jewelry-name'}>{jewelry.jewelryName}</Typography>
                                            <p className={'yes'}>
                                                <CheckIcon className={'star'} />
                                            </p>
                                        </Box>
                                        <Box className={'info'}>
                                            <Typography className={'jewelry-price'}>{jewelry.jewelryPrice}$</Typography>
                                            <p className={'yes'}>
                                                <CheckIcon className={'star'} />
                                            </p>
                                        </Box>
                                        <Box className={'info'}>
                                            <Typography className={'jewelry-material'}>{jewelry.jewelryMaterial}</Typography>
                                            <p className={'yes'}>
                                                <CheckIcon className={'star'} />
                                            </p>
                                        </Box>
                                    </Box>
                                </Stack>
                            );
                        })) : (<Box className={"no-data"}>Trend Jewelries are not available!</Box>)}
                </Stack>
            </Stack>
        </Container>
    </div>);
}