import { Box, Button, Typography, Container, ListItemIcon, Menu, MenuItem, Stack } from "@mui/material";
import { NavLink } from "react-router-dom";
import Basket from "./Basket";
import { CartItem } from "../../../lib/types/search";
import { useGlobals } from "../../hooks/useGlobals";
import { Logout } from "@mui/icons-material";
import { serverApi } from "../../../lib/config";
import FavoriteBorderSharpIcon from '@mui/icons-material/FavoriteBorderSharp';
import BookmarkSharpIcon from '@mui/icons-material/BookmarkSharp';
import Divider from "../divider";

interface OtherNavbarProps {
    cartItems: CartItem[];
    onAdd: (item: CartItem) => void;
    onRemove: (item: CartItem) => void;
    onDelete: (item: CartItem) => void;
    onDeleteAll: () => void;
    setSignupOpen: (isOpen: boolean) => void;
    setLoginOpen: (isOpen: boolean) => void;
    anchorEl: HTMLElement | null;
    handleLogoutClick: (e: React.MouseEvent<HTMLElement>) => void;
    handleCloseLogout: () => void;
    handleLogoutRequest: () => void;
}

export default function OtherNavbar(props: OtherNavbarProps) {
    const { cartItems, onAdd, onRemove, onDelete, onDeleteAll, setLoginOpen, setSignupOpen, anchorEl, handleLogoutClick, handleCloseLogout, handleLogoutRequest } = props;
    const { authMember } = useGlobals();

    return (
        <div className="other-navbar">
            <Container className={'other-container'}>
                <Stack className={'top-bar'}>
                    <Stack className={'left'}>
                        <Box className={'aureum'}>
                            Luxury
                        </Box>
                        <Box className={'store'}>
                            <NavLink to={'/'} className={'txt'}>
                                Store
                            </NavLink>
                        </Box>
                        <Box className={'jewelry'}>
                            <NavLink to={'/jewelry'} className={'txt'}>
                                Jewelry
                            </NavLink>
                        </Box>
                        {authMember ? (
                            <Box className={'jewelry'}>
                                <NavLink to={'/user'} className={'txt'}>
                                    MyPage
                                </NavLink>
                            </Box>
                        ) : null}
                        {authMember ? (
                            <Box className={'buy'}>
                                <NavLink to={'/orders'} className={'txt'}>
                                    Buy
                                </NavLink>
                            </Box>
                        ) : null}
                        <Box className={'help'}>
                            <NavLink to={'/help'} className={'txt'}>
                                Help
                            </NavLink>
                        </Box>
                    </Stack>
                    <Stack className={'right'}>
                        {authMember ? (
                            <>
                                {/* <Box className={'like-save'}>
                                <NavLink to={'/favorite'} className={'like-link'}>
                                    <FavoriteBorderSharpIcon />
                                    <Divider height="20" width="1" bg="#E3C08D" />
                                    <BookmarkSharpIcon />
                                </NavLink>
                            </Box> */}
                                <Basket cartItems={cartItems}
                                    onAdd={onAdd}
                                    onRemove={onRemove}
                                    onDelete={onDelete}
                                    onDeleteAll={onDeleteAll} /></>
                        ) : null}

                        {!authMember ? (
                            <Box className={'signup-login'}>
                                <Button className={'signup-link'}
                                    onClick={() => setSignupOpen(true)}
                                >
                                    SignUp
                                </Button>
                                <Divider height="20" width="2" bg="#E3C08D" />
                                <Button className={'login-link'}
                                    onClick={() => setLoginOpen(true)}
                                >
                                    Login
                                </Button>
                            </Box>
                        ) : (
                            <><Box className={'my'}>
                                <Button className={'my-link'}>
                                    <img className="user-avatar"
                                        src={authMember?.memberImage ? `${serverApi}/${authMember.memberImage}` : "/icons/default-user.svg"}
                                        aria-haspaup={"true"}
                                        onClick={handleLogoutClick} />
                                </Button>
                            </Box><Menu
                                anchorEl={anchorEl}
                                id="account-menu"
                                open={Boolean(anchorEl)}
                                onClose={handleCloseLogout}
                                PaperProps={{
                                    elevation: 0,
                                    sx: {
                                        overflow: 'visible',
                                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                        mt: 1.5,
                                        '& .MuiAvatar-root': {
                                            width: 32,
                                            height: 32,
                                            ml: -0.5,
                                            mr: 1,
                                        },
                                        '&:before': {
                                            content: '""',
                                            display: 'block',
                                            position: 'absolute',
                                            top: 0,
                                            right: 14,
                                            width: 10,
                                            height: 10,
                                            bgcolor: 'background.paper',
                                            transform: 'translateY(-50%) rotate(45deg)',
                                            zIndex: 0,
                                        },
                                    },
                                }}
                                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                            >
                                    <MenuItem onClick={handleLogoutRequest}>
                                        <ListItemIcon>
                                            <Logout fontSize="small" style={{ color: 'blue' }} />
                                        </ListItemIcon>
                                        Logout
                                    </MenuItem>
                                </Menu></>
                        )}
                    </Stack>
                    <Stack className={'text'}>
                        <Typography className={'text-big'}>Lovers of Luxury</Typography>
                        <Typography className={'text-small'}>Only attainable high quality and opulance</Typography>
                    </Stack>
                </Stack>
            </Container>
        </div >
    );
}