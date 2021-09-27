import { createTheme } from '@mui/material/styles';
import { cyan, orange } from '@mui/material/colors';

const palette = {
    mode: 'light',
    primary: {
        main: cyan[700]
    },
    secondary: {
        main: orange[800]
    }
};

const typography = {
    h1: {
        fontSize: '5rem',
    },
    subtitle1: {
        fontWeight: 500
    }
};

const theme = createTheme({ palette, typography });

theme.typography.h2 = {
    ...theme.typography.h6,
    fontSize: theme.typography.subtitle1.fontSize,
    fontWeight: theme.typography.fontWeightBold,
    letterSpacing: '0.1em',
    borderBottom: '3px solid',
    borderColor: theme.palette.primary.main,
    marginBottom: theme.spacing(5),
    display: 'inline-block',
    textTransform: 'uppercase'
};
theme.typography.h3 = {
    ...theme.typography.h5,
    fontWeight: theme.typography.fontWeightBold
};
theme.typography.body1 = {
    fontSize: theme.typography.pxToRem(17.5),
    color: theme.palette.text.secondary
};
theme.typography.body2 = {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
};

// Create a theme instance.
export default theme;
