import {
  Grid,
  Stack,
  Typography,
  useMediaQuery,
  ImageList,
  ImageListItem,
  useTheme,
} from "@mui/material";

import { useEffect, useState } from "react";
import axios from "axios";
import Zoom from "react-medium-image-zoom";
import HeaderMd from "../components/index/HeaderMd.jsx";
import HeaderSm from "../components/index/HeaderSm.jsx";

export default function Shooting() {
  const theme = useTheme();
  const isMdDown = useMediaQuery(theme.breakpoints.down("md"));
  const isSmDown = useMediaQuery(theme.breakpoints.down("sm"));

  const [data, setData] = useState([]);

  useEffect(() => {
    document.title = "Nicolas Edet - Shooting";
    axios
      .get("/api/sections/shootings")
      .then((r) => setData(Array.isArray(r.data) ? r.data : []))
      .catch((e) => console.log(e));
  }, []);

  // Nombre de colonnes responsive pour l'ImageList
  const getCols = () => {
    if (isSmDown) return 1; // très petit écran
    if (isMdDown) return 2; // tablette / petit laptop
    return 4;               // écran desktop
  };

  return (
    <>
      <Grid container>
        {!isMdDown ? (
          <Grid size="auto">
            <HeaderMd />
          </Grid>
        ) : (
          <Grid size={12} mt={4}>
            <HeaderSm />
          </Grid>
        )}

        <Grid size={isMdDown ? 12 : "grow"} px={2} pt={1}>
          {data
            .filter(shoot => Array.isArray(shoot.images) && shoot.images.length > 0)
            .map((shoot, index) => (
              <Stack mt={2} key={index} spacing={2}>
                <Typography variant="h2">{shoot.title}</Typography>

                <ImageList
                  variant="masonry"
                  cols={getCols()}
                  gap={8}
                  sx={{ width: "100%", m: 0 }}
                >
                  {shoot.images.map((image, i) => (
                    <ImageListItem key={i}>
                      <Zoom>
                        <img
                          src={"/api/" + image.image.url}
                          alt={image.image.alt || shoot.title || ""}
                          loading="lazy"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            display: "block",
                          }}
                        />
                      </Zoom>
                    </ImageListItem>
                  ))}
                </ImageList>
              </Stack>
            ))}
        </Grid>
      </Grid>
    </>
  );
}
