import { Box, Button, Container, InputBase, Stack } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";
import { SyntheticEvent, useState } from "react";
import Like from "./Like";
import Save from "./Save";
import "../../css/favorite.css";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { Jewelry } from "../../lib/types/jewelry";
import { Dispatch } from "@reduxjs/toolkit";
import { setLike, setSave } from "./slice";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useGlobals } from "../../app/hooks/useGlobals";

const actionDispatch = (dispatch: Dispatch) => ({
    setLike: (data: Jewelry[]) => dispatch(setLike(data)),
    setSave: (data: Jewelry[]) => dispatch(setSave(data)),
});

export default function FavoritePage() {
    const { setLike, setSave } = actionDispatch(useDispatch());
    const history = useHistory();
    const { authMember } = useGlobals();
    const [value, setValue] = useState("1");
    const [like, setMyLike] = useState<Jewelry>();
    const [save, setMySave] = useState<Jewelry>();
    const handleChange = (e: SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };
    return (
        <div className={'fav-page'}>
            <Container className={'cnt'}>
                <TabContext value={value}>
                    <Box className={"fav-box"}>
                        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                aria-label="basic tabs example"
                                className={"table-list"}>
                                <FavoriteBorderIcon className={'like'} />
                                <Tab className={'txt'} label="LIKE" value={"1"} />
                                <BookmarkBorderIcon className={'save'} />
                                <Tab className={'txt'} label="SAVE" value={"2"} />
                            </Tabs>
                        </Box>
                    </Box>
                    <Stack className={"fav-main"}>
                        <TabPanel value={"1"}>
                            <Like />
                        </TabPanel>
                        <TabPanel value={"2"}>
                            <Save />
                        </TabPanel>
                    </Stack>
                </TabContext>
            </Container>
        </div>
    )
}