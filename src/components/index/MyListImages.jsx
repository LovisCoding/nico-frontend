import { ImageList, ImageListItem } from "@mui/material";
import Zoom from "react-medium-image-zoom";
import { useRef, useEffect } from "react";

export default function MyListImages({ images, isXs, setLoading }) {
    const loadedCount = useRef(0);

    // Reset count when images change
    useEffect(() => {
        loadedCount.current = 0;
    }, [images]);

    const handleImageLoad = () => {
        loadedCount.current += 1;
        if (loadedCount.current >= images.length) {
            setLoading(false);
        }
    };

    if (!images) return null;

    return (
        <ImageList variant="masonry" cols={isXs ? 2 : 3} gap={8}>
            {images.map((url, index) => (
                <Zoom key={index}>
                    <ImageListItem>
                        <img
                            src={url}
                            alt=""
                            onLoad={handleImageLoad}
                            onError={handleImageLoad} // Count errors as loaded to prevent hanging
                        />
                    </ImageListItem>
                </Zoom>
            ))}
        </ImageList>
    );
}