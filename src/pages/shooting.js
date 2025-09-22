import {Grid, Stack, Typography, useMediaQuery} from "@mui/material";
import HeaderMd from "@/components/index/HeaderMd";
import HeaderSm from "@/components/index/HeaderSm";
import {useEffect, useState} from "react";
import axios from "axios";
import Zoom from "react-medium-image-zoom";

export default function Shooting() {
    const isSm = useMediaQuery(theme => theme.breakpoints.down('md'))
    const [data, setData] = useState([]);
    useEffect(() => {
        document.title = "Nicolas Edet - Shooting";
        axios.get('/api/sections/shootings')
            .then(r => setData(Array.isArray(r.data) ? r.data : []))
            .catch(e => console.log(e))
    }, [])
    return (
        <>
        <Grid container>
        {!isSm ? (
        <>
            <Grid size={1}>
                <HeaderMd/>
            </Grid>
        </>
    ): (
        <Grid size={12} mt={4}>
            <HeaderSm/>
        </Grid>
    )}
            <Grid size={isSm ? 12 : 11}>
            {data.map((shoot, index) => (
                <Stack mt={2} key={index}>
                    <Typography variant='h2'>{shoot.title}</Typography>
                    <Grid container>
                        {shoot.images.map((image, index) => (
                            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                <Zoom>
                                    <img src={'/api/' +image} alt="" loading="lazy" />
                                </Zoom>
                            </Grid>
                        ))}
                    </Grid>
                </Stack>
            ))}
            </Grid>
        </Grid>


        </>
    )
}

