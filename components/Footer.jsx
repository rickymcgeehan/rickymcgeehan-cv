import AppBar from '@mui/material/AppBar';
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import styled from '@emotion/styled';
import SocialLinks from './SocialLinks';

const BackToTopButton = styled(Fab)({
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
});

const FooterSocialLinks = styled(SocialLinks)(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-around'
    }
}));

/**
 * Footer with copywrite, social links and 'back to top' button.
 */
export default function Footer() {
    return (
        <AppBar component="footer" position="relative">
            <BackToTopButton variant="hover" component="a" href="#home" aria-label="scroll to top">
                <KeyboardArrowUpIcon fontSize="large" />
            </BackToTopButton>
            <Toolbar
                component={Stack}
                direction={{ xs: 'column', sm: 'row-reverse' }}
                justifyContent="center"
                pb={4}
                pt={{ xs: 7, sm: 4 }}
            >
                <FooterSocialLinks />
                <Typography variant="caption" flex={1} mr={{ xs: 0, sm: 2 }} mt={{ xs: 4, sm: 0 }} textAlign={{ xs: 'center', sm: 'left' }}>
                    <span aria-hidden>{'© '}</span>
                    <span>Copyright 2021 Ricky McGeehan</span>
                </Typography>
            </Toolbar>
        </AppBar>
    );
}
