import { Box, Stack, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper";
import { plans } from "../../lib/data/plans";

SwiperCore.use([Autoplay, Navigation, Pagination]);

export default function OurStore() {
  return (
    <div className={'our'}>
      <Typography className={'name'}>
        Our Store
      </Typography>
      <Stack className={'our-store'}>
        <Stack className={'main-text'}>
          <Typography className={'title'}>Luxury Paradise</Typography>
          <Typography className={'context'}>
            In a world where the hustle and bustle of everyday life can often feel overwhelming,
            the allure of a luxury paradise calls to those seeking an escape from the ordinary.
            Picture a place where pristine beaches stretch for miles, lush landscapes abound,
            and every detail is meticulously curated to ensure comfort and indulgence.
            This is a realm where time slows down, and the stresses of daily life melt away—a true sanctuary for the senses.
            Luxury is not just about opulence; it’s about creating experiences that are memorable and transformative.
            A luxury paradise offers an environment that fosters relaxation, rejuvenation, and exploration.
            It encompasses exquisite accommodations, gourmet dining, and personalized services that cater to your every whim.
            Here, every moment is crafted to provide unparalleled enjoyment and satisfaction.
            A luxury paradise often emphasizes wellness and relaxation. Spas in these destinations provide a range of treatments designed to rejuvenate the body and mind.
            Indulge in a soothing massage, unwind in a private hot tub, or participate in yoga sessions on the beach as the sun rises.
            The focus on wellness encourages guests to reconnect with themselves and embrace a sense of tranquility that is often hard to find in daily life.
          </Typography>
        </Stack>
        <Stack className={'main-img'}>
          <img src="/img/store.jpg" className={'img'} alt="" />
        </Stack>
      </Stack>
    </div>
  );
}
