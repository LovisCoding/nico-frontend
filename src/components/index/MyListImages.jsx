import { ImageList, ImageListItem } from "@mui/material";
import Zoom from "react-medium-image-zoom";


export default function MyListImages({ images, isXs }) {
    if (!images) return null;

    return (
        <ImageList variant="masonry" cols={isXs ? 2 : 3} gap={8}>
            {images.map((url, index) => (
                <Zoom key={index}>
                    <ImageListItem>
                        <img src={url} alt="" loading="lazy" />
                    </ImageListItem>
                </Zoom>
            ))}
        </ImageList>
    );
}