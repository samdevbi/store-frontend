import React from 'react';

import { Box, Container, Stack, Typography } from "@mui/material";
import { CssVarsProvider } from '@mui/joy';
import { createSelector } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import CheckIcon from '@mui/icons-material/Check';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { serverApi } from '../../lib/config';
import { Member } from '../../lib/types/member';
import { retrieveTopUsers } from './selector';

/* REDUX SELECTOR */
const topUsersRetriever = createSelector(
    retrieveTopUsers,
    (topUsers) => ({ topUsers })
);

export default function ActiveUsers() {
    const { topUsers } = useSelector(topUsersRetriever);
    return (<div className={"active-users"}>
        <Container>
            <Stack className={"trand-section"}>
                <Box className={"category-title"}>Our Active Users</Box>
                <Box className={"category-small"}>Here are our most active users</Box>
                <Stack className={"cards-frame"}>
                    {topUsers.length !== 0 ? (
                        topUsers.map((member: Member) => {
                            return (
                                <Stack key={member._id} className={'card'}>
                                    <Stack className={'card-img'}>
                                        <img src={`${serverApi}/${member.memberImage}`} className={'img'} alt="" />
                                    </Stack>
                                    <Box className={'info-list'}>
                                        <Box className={'info'}>
                                            <Typography className={'user-name'}>{member.memberNick}</Typography>
                                            <p className={'yes'}>
                                                <CheckIcon className={'star'} />
                                            </p>
                                        </Box>
                                        <Box className={'info'}>
                                            <Typography className={'user-location'}>{member.memberAddress}</Typography>
                                            <p className={'yes'}>
                                                <CheckIcon className={'star'} />
                                            </p>
                                        </Box>
                                    </Box>
                                </Stack>
                            );
                        })) : (<Box className={"no-data"}> No Active Users!</Box>)}
                </Stack>
            </Stack>
        </Container>
    </div>);
}