import {ImageList, ImageListItem} from "@mui/material";
import Zoom from "react-medium-image-zoom";
import {useEffect} from "react";

export default function MyListImages({ images, isXs, setLoading, loading }) {
    useEffect(() => {
        const promises = images.map(
            src =>
                new Promise(resolve => {
                    const img = new Image();
                    img.src = src;
                    img.onload = resolve;
                })
        );

        Promise.all(promises).then(() => setLoading(false));
    },[images]);
    return (
        <ImageList variant="masonry" cols={isXs ? 2 : 3} gap={8}>
            {!loading && images.map((url, index) => (
                <ImageListItem key={index}>
                    <Zoom>
                        <img src={url} alt="" loading="lazy" />
                    </Zoom>
                </ImageListItem>
            ))}
        </ImageList>
    );
}