import {
  Grid,
  Stack,
  Typography,
  useMediaQuery,
  ImageList,
  ImageListItem,
} from "@mui/material";
import { useEffect, useState } from "react";
import Zoom from "react-medium-image-zoom";
import HeaderMd from "../components/index/HeaderMd.jsx";
import HeaderSm from "../components/index/HeaderSm.jsx";
import Loader from "../components/Loader.jsx";
import api from "../lib/api.js";
import { formatImageUrl } from "../components/upload/image-transfer/transferUtils.js";
import SEO from "../components/SEO.jsx";

export default function Shooting() {
  const isSm = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const isXs = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("sections/shootings")
      .then((res) => {
        setData(Array.isArray(res.data) ? res.data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur chargement shootings", err);
        setLoading(false);
      });
  }, []);

  // Nombre de colonnes responsive pour l'ImageList
  const getCols = () => {
    if (isXs) return 1; // très petit écran
    if (isSm) return 2; // tablette / petit laptop
    return 4;           // écran desktop
  };

  return (
    <>
      <SEO title="Shooting" description="Découvrez mes dernières séances photos et projets artistiques." />
      {loading && <Loader />}
      <Grid container>
        {!isSm ? (
          <Grid size="auto">
            <HeaderMd />
          </Grid>
        ) : (
          <Grid size={12} mt={4}>
            <HeaderSm />
          </Grid>
        )}

        <Grid size={isSm ? 12 : "grow"} px={2} pt={1}>
          {data
            .filter((shoot) => Array.isArray(shoot?.images) && shoot.images.length > 0)
            .map((shoot, index) => (
              <Stack mt={2} key={shoot.id || index} spacing={2}>
                <Typography variant="h2">{shoot.title}</Typography>

                <ImageList
                  variant="masonry"
                  cols={getCols()}
                  gap={8}
                  sx={{ width: "100%", m: 0 }}
                >
                  {shoot.images.map((image, i) => (
                    <ImageListItem key={image.id || image.imageId || i}>
                      <Zoom>
                        <img
                          src={formatImageUrl(image?.image?.url)}
                          alt={image?.image?.alt || shoot.title || ""}
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
