import { Box, Container, Stack, Typography } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Settings } from "./Settings";
import { useHistory } from "react-router-dom";
import { useGlobals } from "../../app/hooks/useGlobals";
import "../../css/userPage.css";
import { MemberType } from "../../lib/enums/member.enum";
import { serverApi } from "../../lib/config";
import Divider from "../../app/components/divider";
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import PinDropIcon from '@mui/icons-material/PinDrop';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import BadgeIcon from '@mui/icons-material/Badge';

export default function UserPage() {
  const history = useHistory();
  const { authMember } = useGlobals();
  if (!authMember) history.push('/');

  return (
    <div className={"user-page"}>
      <Container className={"container"}>
        <Typography className={'title'}>My Page:</Typography>
        <Divider height="1" width="1300" bg="black" />
        <Stack className={"my-frame"}>
          <Stack className={"my-right"}>
            <Stack className={'right'}>
              <Box className={'user-img'}>
                <img src={authMember?.memberImage ? `${serverApi}/${authMember.memberImage}` : "/icons/default-user.svg"} className={'img'} alt="" />
                <Box className={'media'}>
                  <FacebookIcon className={'media-icn facebook'} />
                  <InstagramIcon className={'media-icn instagram'} />
                  <TelegramIcon className={'media-icn telegram'} />
                  <YouTubeIcon className={'media-icn youtube'} />
                </Box>
              </Box>
              <Divider height="2" width="130" bg="black" />
              <Box className={'info'}>
                <Typography className={'name'}>{authMember?.memberNick}</Typography>
                <Divider height="1" width="300" bg="black" />
                <Typography className={'two'}>
                  <ContactPhoneIcon className={'phone'} />
                  : {authMember?.memberPhone}</Typography>
                <Divider height="1" width="300" bg="black" />
                <Typography className={'two'}>
                  <PinDropIcon className={'phone'} />
                  : {authMember?.memberAddress}
                </Typography>
                <Divider height="1" width="300" bg="black" />
                <Typography className={'two'}>
                  <AlternateEmailIcon className={'phone'} />
                  : {authMember?.memberEmail}
                </Typography>
                <Divider height="1" width="300" bg="black" />
                <Box className={'desc'}>
                  <Typography className={'descr'}>Description:</Typography>
                  <Typography className={'context'}>
                    {authMember?.memberDesc}
                  </Typography>
                  <Divider height="1" width="300" bg="black" />
                </Box>
              </Box>
            </Stack>
          </Stack>
          <Stack className={"my-left"}>
            <Box className={"menu-content"}>
              <Settings />
            </Box>
          </Stack>
        </Stack>
        <Divider height="1" width="1300" bg="black" />
      </Container>
    </div>
  );
}
