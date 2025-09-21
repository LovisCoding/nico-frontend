import {Grid, useMediaQuery} from "@mui/material";
import HeaderMd from "@/components/index/HeaderMd";
import HeaderSm from "@/components/index/HeaderSm";
import {useEffect} from "react";
import axios from "axios";

export default function Shooting() {
    const isSm = useMediaQuery(theme => theme.breakpoints.down('md'))
    useEffect(() => {
        document.title = "Nicolas Edet - Shooting";
        axios.get('/api/sections/shootings')
    },[])
    return (
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
        </Grid>
    )
}

