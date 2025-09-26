import {Box, Button, Grid, Stack} from "@mui/material";
import { PiEnvelopeLight, PiInstagramLogoThin } from 'react-icons/pi';
import {router} from "next/client";

export default function HeaderMd() {
    const sxText = {
        '&:hover' :{
            textDecoration: 'underline'
        },
        width: 'fit-content',
        pl:1,
        pr:0,
        py:0.5,
        justifyContent: 'flex-start',

    }
    const goTo = (link) => {
        router.push(link ?? '')
        return
    }
    return (
        <Stack direction={'column'} pl={2} mt={3}>
            <Box component={'a'} href={'#'} pb={3}>
                <img src={'/logo.png'} alt={'logo'} style={{width: '60px'}}/>
            </Box>
            <Button variant={'h6'} component={'a'} sx={sxText} onClick={() => goTo('/')} >Accueil</Button>
            {/*<Button variant={'h6'} component={'a'} sx={sxText} onClick={() => goTo('/shooting')} >Shooting</Button>*/}
          <Stack direction={'row'} alignItems={'center'} display={'flex'} justifyContent={'space-around'} px={2}>
            <Button component={'p'} sx={{...sxText, minWidth:0,  p:0}} onClick={() => goTo('https://www.instagram.com/ncdet_/')} >
              <PiInstagramLogoThin color={'black'}/>
            </Button>
            <Button component={'p'} sx={{...sxText, minWidth:0, p:0}} onClick={() => goTo('mailto:edetnicolas1@gmail.com')} >
              <PiEnvelopeLight color={'grey'} />
            </Button>
          </Stack>



        </Stack>
    )
}