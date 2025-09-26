import { useEffect, useState } from 'react';
import axios from 'axios';
import {Box, Button, Grid, ImageList, ImageListItem, Stack, Typography, useMediaQuery} from "@mui/material";
import Zoom from "react-medium-image-zoom";
import HeaderSm from "@/components/index/HeaderSm";
import HeaderMd from "@/components/index/HeaderMd";
import MyListImages from "@/components/index/MyListImages";
import Loader from "@/components/Loader";
import api from '@/lib/api';
export default function PortfolioPage() {
    const [images, setImages] = useState([]);
    const isSm = useMediaQuery(theme => theme.breakpoints.down('md'))
    const isXs = useMediaQuery(theme => theme.breakpoints.down('sm'))
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchImages =  () => {
            try {
                  api.get(`sections/name?name=Accueil`).then((res) => {
                      const paths = res.data.images.map(img => "/api/"+img.image.url);
                      setImages(paths);

                  });

            } catch (err) {
                console.error('Erreur chargement images', err);
            }
        };
        fetchImages();
    }, []);

    return (
        <>
            {loading && <Loader/>}
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
            <Grid size={isSm ? 12 : 11} pr={4} pl={isSm ? 2 : 1} pt={3}>
                <MyListImages images={images} isXs={isXs} setLoading={setLoading} loading={loading} />
            </Grid>
        </Grid>
        </>
    );
}
