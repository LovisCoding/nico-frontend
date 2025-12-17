import { Box, Button, Grid, Link, Stack } from '@mui/material';
import { PiEnvelopeLight, PiInstagramLogoThin } from 'react-icons/pi';
import { useNavigate, useRoutes } from 'react-router';

export default function HeaderMd() {

  const navigate = useNavigate();
  const sxText = {
    '&:hover': {
      textDecoration: 'underline'
    },
    width: 'fit-content',
    pl: 1,
    pr: 0,
    py: 0.5,
    justifyContent: 'flex-start',

  }
  const goTo = (link) => {
    navigate(link ?? '')
    return;
  }
  return (
    <Stack direction={'column'} px={2} mt={1} sx={{ position: 'sticky', top: '8px' }}>
      <Box component={'a'} href={'#'} pb={3} pl={1} onClick={(e) => { e.preventDefault(); goTo('/'); }}>
        <img src={'/logo.png'} alt={'logo'} style={{ width: '80px' }} />
      </Box>
      <Button variant={'h6'} component={'a'} sx={sxText} onClick={() => goTo('/')} >Accueil</Button>
      <Button variant={'h6'} component={'a'} sx={sxText} onClick={() => goTo('/shooting')} >Shooting</Button>
      <Stack direction={'row'} alignItems={'center'} display={'flex'} justifyContent={'space-evenly'} >
        <Link sx={{ ...sxText, minWidth: 0, p: 0 }} href={'https://www.instagram.com/ncdet_/'} target="_blank" rel="noopener noreferrer" >
          <PiInstagramLogoThin color={'black'} />
        </Link>
        <Link sx={{ ...sxText, minWidth: 0, pl: 1 }} href={'mailto:edetnicolas1@gmail.com'} target="_blank" rel="noopener noreferrer" >
          <PiEnvelopeLight color={'grey'} />
        </Link>
      </Stack>



    </Stack>
  )
}