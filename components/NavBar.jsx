import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import HoverIconButton from './HoverIconButton';
import { navigation } from '../util/config';

/**
 * Navigation header. Collapses into a side-menu on small screens.
 *
 * @param {string} color The navbar color setting.
 * @param {string} current The current section being viewed.
 */
export default function NavBar({ color, current }) {
    const router = useRouter();
    const theme = useTheme();
    const collapseNavigation = useMediaQuery(theme.breakpoints.down('sm'));

    const [drawerOpen, setDrawerOpen] = useState(false);

    /**
     * Handle side-menu being opened.
     */
    const handleDrawerOpen = useCallback(() => setDrawerOpen(true), [setDrawerOpen]);

    /**
     * Handle side-menu being closed.
     */
    const handleDrawerClose = useCallback((event) => {
        const isCloseEvent = !(event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift'));
        if (isCloseEvent) {
            setDrawerOpen(false);
        }
    },
    [setDrawerOpen]);

    /**
     * Create a menu item click handler. Close the side-menu and navigate to
     * the specified anchor.
     */
    const createDrawerOptionHandler = (href) => () => {
        setDrawerOpen(false);
        router.replace(`/${href}`);
    };

    /**
     * Reset the side-menu back to its closed state whenever the nav header is shown.
     */
    useEffect(() => {
        if (!collapseNavigation) {
            // the navigation is no longer collapsed, close menu
            setDrawerOpen(false);
        }
    },
    [collapseNavigation, setDrawerOpen]);

    return (
        <AppBar color={color} position="fixed" elevation={0}>
            <Toolbar variant="dense" disableGutters>
                {
                    collapseNavigation ? (
                        <>
                            <HoverIconButton
                                hoverColor="secondary"
                                size="large"
                                onClick={handleDrawerOpen}
                                aria-label="open navigation menu"
                            >
                                <MenuIcon fontSize="large" />
                            </HoverIconButton>
                            <Drawer
                                anchor="left"
                                disableScrollLock
                                open={drawerOpen}
                                onClose={handleDrawerClose}
                                PaperProps={{ sx: { width: 240, backgroundImage: 'none', bgcolor: 'background.drawer' } }}
                            >
                                <AppBar component="div" color="background" position="relative" elevation={0}>
                                    <Toolbar variant="dense" disableGutters sx={{ justifyContent: 'flex-end' }}>
                                        <HoverIconButton
                                            hoverColor="secondary"
                                            size="large"
                                            onClick={handleDrawerClose}
                                            aria-label="close navigation menu"
                                        >
                                            <MenuIcon fontSize="large" />
                                        </HoverIconButton>
                                    </Toolbar>
                                </AppBar>
                                <List>
                                    {
                                        navigation.map(({ name, href, Icon }) => {
                                            const sx = {
                                                py: 2,
                                                ':hover': {
                                                    color: 'secondary.main'
                                                }
                                            };

                                            if (href === current) {
                                                sx.color = 'secondary.main';
                                            }

                                            return (
                                                <ListItem
                                                    key={href}
                                                    button
                                                    onClick={createDrawerOptionHandler(href)}
                                                    sx={sx}
                                                >
                                                    <ListItemIcon sx={{ color: 'inherit' }}>
                                                        <Icon />
                                                    </ListItemIcon>
                                                    <ListItemText
                                                        primary={name}
                                                        primaryTypographyProps={{
                                                            variant: 'button',
                                                            sx: { letterSpacing: '0.18em', fontWeight: 'fontWeightMedium' }
                                                        }}
                                                    />
                                                </ListItem>
                                            );
                                        })
                                    }
                                </List>
                            </Drawer>
                        </>
                    ) : (
                        <Box component="nav" width="100%" display="flex" justifyContent="center">
                            {
                                navigation.map(({ name, href }) => (
                                    <Button
                                        key={href}
                                        variant={href === current ? 'text' : 'textHover'}
                                        color="secondary"
                                        size="small"
                                        component={Link}
                                        href={href}
                                        sx={{ mx: 1, letterSpacing: '0.18em' }}
                                    >
                                        {name}
                                    </Button>
                                ))
                            }
                        </Box>
                    )
                }
            </Toolbar>
        </AppBar>
    );
}
