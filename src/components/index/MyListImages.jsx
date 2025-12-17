import { ImageList, ImageListItem } from "@mui/material";
import Zoom from "react-medium-image-zoom";
import { useEffect } from "react";

export default function MyListImages({ images, isXs, setLoading, loading }) {
    useEffect(() => {
        if (!images) return;
        const promises = images.map(
            src =>
                new Promise(resolve => {
                    const img = new Image();
                    img.src = src;
                    img.onload = resolve;
                })
        );

        Promise.all(promises).then(() => setLoading(false));
    }, [images, setLoading]);

    if (!images) return null;

    return (
        <ImageList variant="masonry" cols={isXs ? 2 : 3} gap={8}>
            {!loading && images.map((url, index) => (
                <Zoom key={index}>
                    <ImageListItem>
                        <img src={url} alt="" loading="lazy" />
                    </ImageListItem>
                </Zoom>
            ))}
        </ImageList>
    );
}