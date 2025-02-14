import { Box, Button, Container, Pagination, Stack, Typography } from "@mui/material";
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function Like() {
    return (<div className={'like'}>
        <Container className={'like-cnt'}>
            <Stack className={'like-crd'}>
                <Box className={'img-crd'}>
                    <img src="/img/cartier.png" className={'img'} alt="" />
                </Box>
                <Box className={'info-box'}>
                    <Box className={'view-btns'}>
                        <Box className={'main'}>
                            <Typography className={"views"}>20
                                <VisibilityIcon className={'vew'}
                                    sx={{ fontSize: 22, marginLeft: "5px", }}
                                />
                            </Typography>
                            <Typography className={"views"}>20
                                <FavoriteOutlinedIcon className={'like'}
                                    sx={{ fontSize: 22, marginLeft: "5px" }}
                                />
                            </Typography>
                        </Box>
                        <BookmarkBorderOutlinedIcon className={'book-mark'} />
                    </Box>
                    <Box className={'info'}>
                        <Typography className={'name'}>Cartier</Typography>
                        <Typography className={'gender'}>Man</Typography>
                    </Box>
                </Box>
            </Stack>
            <Stack className={'like-crd'}>
                <Box className={'img-crd'}>
                    <img src="/img/cartier.png" className={'img'} alt="" />
                </Box>
                <Box className={'info-box'}>
                    <Box className={'view-btns'}>
                        <Box className={'main'}>
                            <Typography className={"views"}>20
                                <VisibilityIcon className={'vew'}
                                    sx={{ fontSize: 22, marginLeft: "5px", }}
                                />
                            </Typography>
                            <Typography className={"views"}>20
                                <FavoriteOutlinedIcon className={'like'}
                                    sx={{ fontSize: 22, marginLeft: "5px" }}
                                />
                            </Typography>
                        </Box>
                        <BookmarkBorderOutlinedIcon className={'book-mark'} />
                    </Box>
                    <Box className={'info'}>
                        <Typography className={'name'}>Cartier</Typography>
                        <Typography className={'gender'}>Man</Typography>
                    </Box>
                </Box>
            </Stack>
            <Stack className={'like-crd'}>
                <Box className={'img-crd'}>
                    <img src="/img/cartier.png" className={'img'} alt="" />
                </Box>
                <Box className={'info-box'}>
                    <Box className={'view-btns'}>
                        <Box className={'main'}>
                            <Typography className={"views"}>20
                                <VisibilityIcon className={'vew'}
                                    sx={{ fontSize: 22, marginLeft: "5px", }}
                                />
                            </Typography>
                            <Typography className={"views"}>20
                                <FavoriteOutlinedIcon className={'like'}
                                    sx={{ fontSize: 22, marginLeft: "5px" }}
                                />
                            </Typography>
                        </Box>
                        <BookmarkBorderOutlinedIcon className={'book-mark'} />
                    </Box>
                    <Box className={'info'}>
                        <Typography className={'name'}>Cartier</Typography>
                        <Typography className={'gender'}>Man</Typography>
                    </Box>
                </Box>
            </Stack>
            <Stack className={'like-crd'}>
                <Box className={'img-crd'}>
                    <img src="/img/cartier.png" className={'img'} alt="" />
                </Box>
                <Box className={'info-box'}>
                    <Box className={'view-btns'}>
                        <Box className={'main'}>
                            <Typography className={"views"}>20
                                <VisibilityIcon className={'vew'}
                                    sx={{ fontSize: 22, marginLeft: "5px", }}
                                />
                            </Typography>
                            <Typography className={"views"}>20
                                <FavoriteOutlinedIcon className={'like'}
                                    sx={{ fontSize: 22, marginLeft: "5px" }}
                                />
                            </Typography>
                        </Box>
                        <BookmarkBorderOutlinedIcon className={'book-mark'} />
                    </Box>
                    <Box className={'info'}>
                        <Typography className={'name'}>Cartier</Typography>
                        <Typography className={'gender'}>Man</Typography>
                    </Box>
                </Box>
            </Stack>
            <Stack className={'like-crd'}>
                <Box className={'img-crd'}>
                    <img src="/img/cartier.png" className={'img'} alt="" />
                </Box>
                <Box className={'info-box'}>
                    <Box className={'view-btns'}>
                        <Box className={'main'}>
                            <Typography className={"views"}>20
                                <VisibilityIcon className={'vew'}
                                    sx={{ fontSize: 22, marginLeft: "5px", }}
                                />
                            </Typography>
                            <Typography className={"views"}>20
                                <FavoriteOutlinedIcon className={'like'}
                                    sx={{ fontSize: 22, marginLeft: "5px" }}
                                />
                            </Typography>
                        </Box>
                        <BookmarkBorderOutlinedIcon className={'book-mark'} />
                    </Box>
                    <Box className={'info'}>
                        <Typography className={'name'}>Cartier</Typography>
                        <Typography className={'gender'}>Man</Typography>
                    </Box>
                </Box>
            </Stack>
            <Stack className={'like-crd'}>
                <Box className={'img-crd'}>
                    <img src="/img/cartier.png" className={'img'} alt="" />
                </Box>
                <Box className={'info-box'}>
                    <Box className={'view-btns'}>
                        <Box className={'main'}>
                            <Typography className={"views"}>20
                                <VisibilityIcon className={'vew'}
                                    sx={{ fontSize: 22, marginLeft: "5px", }}
                                />
                            </Typography>
                            <Typography className={"views"}>20
                                <FavoriteOutlinedIcon className={'like'}
                                    sx={{ fontSize: 22, marginLeft: "5px" }}
                                />
                            </Typography>
                        </Box>
                        <BookmarkBorderOutlinedIcon className={'book-mark'} />
                    </Box>
                    <Box className={'info'}>
                        <Typography className={'name'}>Cartier</Typography>
                        <Typography className={'gender'}>Man</Typography>
                    </Box>
                </Box>
            </Stack>
        </Container>
        <Stack flexDirection={"column"} alignItems={"center"}>
            <Stack className={"pagination-section"}>
                <Pagination
                    renderItem={(item) => (
                        <PaginationItem
                            components={{
                                previous: ArrowBackIcon,
                                next: ArrowForwardIcon,
                            }}
                            {...item}
                        />
                    )}
                />
            </Stack>
        </Stack>
    </div>
    )
}