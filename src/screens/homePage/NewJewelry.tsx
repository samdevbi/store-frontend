import React from 'react';

import { Box, Button, Container, Stack } from "@mui/material";
import { CssVarsProvider } from "@mui/joy";
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';
import CardOverflow from '@mui/joy/CardOverflow';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Divider from "../../app/components/divider"
import { createSelector } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import CheckIcon from '@mui/icons-material/Check';
import { serverApi } from '../../lib/config';
import { retrieveNewJewelry } from './selector';
import { Jewelry } from '../../lib/types/jewelry';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { useHistory } from 'react-router-dom';

/* REDUX SELECTOR */
const popularWatchRetriever = createSelector(
    retrieveNewJewelry,
    (newJewelry) => ({ newJewelry })
);


export default function NewJewelry() {
    const { newJewelry } = useSelector(popularWatchRetriever);

    const history = useHistory();
    const jewelryDetailHandler = (jewelryId: string) => {
        history.push(`/jewelry/${jewelryId}`);
    };

    return (<div className={"popular-watch-frame"}>
        <Container>
            <Stack className={"trand-section"}>
                <Box className={"category-title"}>New Jewelries</Box>
                <Box className={"category-small"}>Each jewelry tells a story, rich with its own history and luxury</Box>
                <Stack className={"cards-frame"}>
                    {newJewelry.length !== 0 ? (
                        newJewelry.map((jewelry: Jewelry) => {
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
                                        {/* <Typography className={"like"}>{jewelry.jewelryLikes}
                                            <FavoriteBorderOutlinedIcon
                                                sx={{ fontSize: 24, marginLeft: "5px" }}
                                            />
                                        </Typography> */}
                                    </Box>
                                    <Box className={'info-list'}>
                                        <Box className={'info'}>
                                            <Typography className={'watch-name'}>{jewelry.jewelryName}</Typography>
                                            <p className={'yes'}>
                                                <CheckIcon className={'star'} />
                                            </p>
                                        </Box>
                                        <Box className={'info'}>
                                            <Typography className={'watch-price'}>{jewelry.jewelryPrice}$</Typography>
                                            <p className={'yes'}>
                                                <CheckIcon className={'star'} />
                                            </p>
                                        </Box>
                                        <Box className={'info'}>
                                            <Typography className={'watch-func'}>{jewelry.jewelryGender}</Typography>
                                            <p className={'yes'}>
                                                <CheckIcon className={'star'} />
                                            </p>
                                        </Box>
                                    </Box>
                                </Stack>
                            );
                        })) : (<Box className={"no-data"}>Popular Jewelries are not available!</Box>)}
                </Stack>
            </Stack>
        </Container>
    </div>);
}