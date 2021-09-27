import { createTheme } from '@mui/material/styles';
import { cyan, grey, orange } from '@mui/material/colors';

const palette = {
    mode: 'dark',
    primary: {
        main: cyan[700]
    },
    secondary: {
        main: orange[800]
    },
    background: {
        drawer: '#292929',
        paper: grey[900]
    }
};

const theme = createTheme({ palette });

theme.typography.h1 = {
    ...theme.typography.h1,
    fontSize: theme.typography.pxToRem(48),
    [theme.breakpoints.up('sm')]: { fontSize: theme.typography.pxToRem(64) },
    [theme.breakpoints.up('md')]: { fontSize: theme.typography.pxToRem(84) }
};

theme.typography.h2 = {
    ...theme.typography.h5,
    fontWeight: theme.typography.fontWeightBold
};

theme.typography.subtitle1 = {
    ...theme.subtitle1,
    [theme.breakpoints.up('sm')]: { fontSize: theme.typography.h6.fontSize }
};

theme.typography.body1 = {
    ...theme.typography.body1,
    fontSize: theme.typography.pxToRem(17.5),
    color: theme.palette.text.secondary
};

theme.components = {
    MuiButtonBase: {
        styleOverrides: {
            root: {
                transition: theme.transitions.create(['color', 'background-color'], { duration: theme.transitions.duration.short }),
            }
        }
    },
    MuiButton: {
        variants: [
            {
                props: { variant: 'textHover' },
                style: {
                    color: theme.palette.text.primary,
                    ':hover': {
                        color: theme.palette.primary.main,
                        backgroundColor: 'transparent'
                    }
                }
            },
            {
                props: { variant: 'textHover', color: 'secondary' },
                style: {
                    ':hover': {
                        color: theme.palette.secondary.main
                    }
                }
            },
            {
                props: { variant: 'textHover', size: 'small' },
                style: {
                    padding: '4px 5px',
                    fontSize: theme.typography.pxToRem(13)
                }
            },
            {
                props: { variant: 'textHover', size: 'large' },
                style: {
                    padding: '8px 11px',
                    fontSize: theme.typography.pxToRem(15)
                }
            },
            {
                props: { variant: 'containedHover' },
                style: {
                    backgroundColor: theme.palette.grey[800],
                    color: theme.palette.getContrastText(theme.palette.grey[800]),
                    ':hover': {
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.primary.contrastText
                    }
                }
            },
            {
                props: { variant: 'containedHover', size: 'small' },
                style: {
                    padding: '4px 10px',
                    fontSize: theme.typography.pxToRem(13)
                }
            },
            {
                props: { variant: 'containedHover', size: 'large' },
                style: {
                    padding: '8px 22px',
                    fontSize: theme.typography.pxToRem(15)
                }
            },
            {
                props: { variant: 'containedHover', color: 'secondary' },
                style: {
                    ':hover': {
                        backgroundColor: theme.palette.secondary.main,
                        color: theme.palette.secondary.contrastText
                    }
                }
            }
        ]
    },
    MuiIconButton: {
        styleOverrides: {
            root: {
                transition: theme.transitions.create(['color', 'background-color'], { duration: theme.transitions.duration.short }),
            }
        }
    },
    MuiFab: {
        variants: [
            {
                props: { variant: 'hover' },
                style: {
                    backgroundColor: theme.palette.grey[300],
                    color: theme.palette.getContrastText(theme.palette.grey[300]),
                    ':hover': {
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.primary.contrastText
                    }
                }
            },
            {
                props: { variant: 'hover', color: 'secondary' },
                style: {
                    ':hover': {
                        backgroundColor: theme.palette.secondary.main,
                        color: theme.palette.secondary.contrastText
                    }
                }
            }
        ]
    },
    MuiFilledInput: {
        styleOverrides: {
            input: {
                '&:-webkit-autofill': {
                    boxShadow: `0 0 0 100px ${theme.palette.primary.dark} inset`
                }
            }
        }
    }
};

// Create a theme instance.
export default theme;
