import { useEffect, useState } from 'react';
import { Box, Button, Grid, ImageList, ImageListItem, Stack, Typography, useMediaQuery } from "@mui/material";
import Loader from '../components/Loader.jsx';
import HeaderMd from '../components/index/HeaderMd.jsx';
import HeaderSm from '../components/index/HeaderSm.jsx';
import MyListImages from '../components/index/MyListImages.jsx';
import api from '../lib/api.js';
import SEO from '../components/SEO.jsx';

export default function App() {
    const [images, setImages] = useState(null);
    const isSm = useMediaQuery(theme => theme.breakpoints.down('md'))
    const isXs = useMediaQuery(theme => theme.breakpoints.down('sm'))
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchImages = () => {
            try {
                api.get(`sections/name?name=Accueil`).then((res) => {
                    const paths = res.data.images.map(img => "/api/" + img.image.url);
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
            <SEO title="Accueil" />
            {loading && <Loader />}
            <Grid container>
                {!isSm ? (
                    <>
                        <Grid size="auto">
                            <HeaderMd />
                        </Grid>
                    </>
                ) : (
                    <Grid size={12} mt={4}>
                        <HeaderSm />
                    </Grid>
                )}
                <Grid size={isSm ? 12 : "grow"} px={2} pt={1}>
                    <MyListImages images={images} isXs={isXs} setLoading={setLoading} loading={loading} />
                </Grid>
            </Grid>
        </>
    );
}
