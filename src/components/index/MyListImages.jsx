import {ImageList, ImageListItem} from "@mui/material";
import Zoom from "react-medium-image-zoom";

export default function MyListImages({ images, isXs }) {
    return (
        <ImageList variant="masonry" cols={isXs ? 2 : 3}  gap={8} >
            {images.map((url, index) => (
                <ImageListItem key={index}>
                    <Zoom>
                        <img
                            srcSet={url}
                            src={url}
                            alt={`img-${index}`}
                            loading="lazy"
                        />
                    </Zoom>

                </ImageListItem>
            ))}
        </ImageList>
    );
}