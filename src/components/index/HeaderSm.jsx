import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemButton, ListItemText, Box } from "@mui/material";
import { useState } from "react";
import {MdMenu} from "react-icons/md";

export default function HeaderSm() {
    const [open, setOpen] = useState(false);

    const links = [
        { label: "Accueil", to: "/" },
        { label: "Shootings", to: "/shooting" },
        { label: "Instagram", to: "https://www.instagram.com/ncdet_/" },
    ];

    const toggleDrawer = (value) => () => setOpen(value);

    return (
        <AppBar position="static" color="transparent" elevation={0} >
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }} >
                {/* Logo à gauche */}
                <Box component="a" href="#">
                    <img src="/logo.png" alt="logo" style={{ width: "60px" }} />
                </Box>

                {/* Icône menu à droite */}
                <IconButton edge="end" onClick={toggleDrawer(true)}>
                    <MdMenu />
                </IconButton>

                {/* Drawer */}
                <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
                        <List>
                            {links.map((link, index) => (
                                <ListItem key={index} disablePadding>
                                    <ListItemButton component="a" href={link.to}>
                                        <ListItemText primary={link.label} />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                </Drawer>
            </Toolbar>
        </AppBar>
    );
}
