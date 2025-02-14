import React from "react";
import { Box, Container, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import styled from "styled-components";
import TelegramIcon from '@mui/icons-material/Telegram';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';

const Footers = styled.div`
  width: 100%;
  height: 590px;
  display: flex;
  background: #343434;
  background-size: cover;
`;

export default function Footer() {
  const authMember = null;

  return (
    <Footers>
      <Container className={'footer-page'}>
        <Stack className={'main-footer'}>
          <Stack className={'main-footer-context'}>
            <Typography className={'main-footer-name'}>Luxury Paradise</Typography>
            <Typography className={'main-footer-desc'}>
              In your luxurious villa, you find yourself enveloped in comfort,
              surrounded by plush bedding and exquisite textiles.
              Outside your window, a breathtaking view unfolds—coconut palms sway gently,
              vibrant flowers bloom in brilliant colors, and birds dance through the clear sky.
            </Typography>
            <Box className={'main-footer-media'}>
              <TelegramIcon className={'footer-icons'} />
              <InstagramIcon className={'footer-icons'} />
              <YouTubeIcon className={'footer-icons'} />
              <FacebookIcon className={'footer-icons'} />
              <XIcon className={'footer-icons'} />
            </Box>
          </Stack>
          <Stack className={'main-footer-pages'}>
            <Typography className={'pages-footer'}>Pages</Typography>
            <Link className={'footer-page'} to={"/"}>Store</Link>
            <Link className={'footer-page'} to={"/watch/all"}>Watch</Link>
            <Link className={'footer-page'} to={"/jewelry/all"}>Jewelry</Link>
            <Link className={'footer-page'} to={"/help"}>Help</Link>
          </Stack>
          <Stack className={'footer-us'}>
            <Typography className={'find-use'}>Found Us</Typography>
            <Typography className={'find-loc'}>South Korea</Typography>
            <Typography className={'find-loc'}>WWW.LuxuryParadise.com</Typography>
            <Typography className={'find-loc'}>010-4867-5455</Typography>
            <Typography className={'find-loc'}>Luxury Paradise Store</Typography>
            <Typography className={'find-loc'}>luxury@gmail.com</Typography>
          </Stack>
        </Stack>
        <Stack
          style={{ border: "1px solid #C5C8C9", width: "100%", opacity: "0.2" }}
          sx={{ mt: "80px" }}
        ></Stack>
        <Stack className={"copyright-txt"}>
          © Coder Rakhmatillaev Samandar Global, All rights reserved.
        </Stack>
      </Container>
    </Footers>
  );
}
