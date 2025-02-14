import React from 'react';

import { Box, Typography, Container, Stack } from "@mui/material";
import Divider from '../../app/components/divider';
import { NavLink } from 'react-router-dom';

export default function CategoryJewelries() {
    return (<div className={"category"}>
        <Container className={'category-list'}>
            <Typography className={'main-text'}>Category Jewelries</Typography>
            <Stack className={'category-main'}>
                <NavLink to={'/jewelry'} className={"category-1"}>
                    <Stack className={'card-view'}>
                        <Typography className={'bracelets'}>Earings</Typography>
                    </Stack>
                </NavLink>
                <NavLink to={'/jewelry'} className={"category-1"}>
                    <Stack className={'card-view2'}>
                        <Typography className={'bracelets'}>Necklaces</Typography>
                    </Stack>
                </NavLink>
                <NavLink to={'/jewelry'} className={"category-1"}>
                    <Stack className={'card-view3'}>
                        <Typography className={'bracelets'}>Rings</Typography>
                    </Stack>
                </NavLink>
                <NavLink to={'/jewelry'} className={"category-1"}>
                    <Stack className={'card-view4'}>
                        <Typography className={'bracelets'}>Bracelets</Typography>
                    </Stack>
                </NavLink>
            </Stack>
        </Container>
    </div>);
}