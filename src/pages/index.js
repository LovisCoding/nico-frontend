import { useEffect, useState } from 'react';
import axios from 'axios';
import {Box, Button, Grid, ImageList, ImageListItem, Stack, Typography, useMediaQuery} from "@mui/material";
import Zoom from "react-medium-image-zoom";
import HeaderSm from "@/components/index/HeaderSm";
import HeaderMd from "@/components/index/HeaderMd";
import MyListImages from "@/components/index/MyListImages";
export default function PortfolioPage() {
    const [images, setImages] = useState([]);
    const isSm = useMediaQuery(theme => theme.breakpoints.down('md'))
    const isXs = useMediaQuery(theme => theme.breakpoints.down('sm'))
    useEffect(() => {
        const fetchImages = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/list-images`);
                setImages(res.data.images); // res.data.images = [url1, url2, ...]
            } catch (err) {
                console.error('Erreur chargement images');
            }
        };
        fetchImages();
    }, []);


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
            <Grid size={isSm ? 12 : 11} pr={4} pl={isSm ? 2 : 1} pt={3}>
                <MyListImages images={images} isXs={isXs} />
            </Grid>
        </Grid>
        /*<div style={{ padding: 20 }}>
            <h2>Mon Portfolio</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {images.map((url, i) => (
                    <img key={i} src={url} alt={`img-${i}`} style={{ width: 200, borderRadius: 8 }} />
                ))}
            </div>
        </div>*/
    );
}
