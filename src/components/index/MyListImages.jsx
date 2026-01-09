import { ImageList, ImageListItem } from "@mui/material";
import Zoom from "react-medium-image-zoom";
import { useRef, useEffect } from "react";

export default function MyListImages({ images, isXs, setLoading }) {
    const loadedCount = useRef(0);

    useEffect(() => {
        // Safe check: if no images (empty array), stop loading immediately
        if (images && images.length === 0) {
            setLoading(false);
            return;
        }
        loadedCount.current = 0;

        // Safety timeout in case onLoad never fires for some reason (5 seconds max)
        const safetyTimeout = setTimeout(() => {
            setLoading(false);
        }, 5000);

        return () => clearTimeout(safetyTimeout);
    }, [images, setLoading]);

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
                            onError={handleImageLoad}
                            // Check if already loaded from cache immediately
                            ref={(img) => {
                                if (img && img.complete) {
                                    handleImageLoad();
                                }
                            }}
                        />
                    </ImageListItem>
                </Zoom>
            ))}
        </ImageList>
    );
}