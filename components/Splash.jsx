import React from 'react';
import Image from 'next/image';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Fab from '@mui/material/Fab';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Typography from '@mui/material/Typography';
import styled from '@emotion/styled';
import splashImg from '../public/images/splash.jpg';
import SocialLinks from './SocialLinks';

const ShadowedText = styled(Typography)({ textShadow: '0 1px 3px rgb(0 0 0 / 80%)' });

const BackgroundImage = styled(Image)({ zIndex: 0 });

/**
 * Splash screen section of the website.
 */
export default function Splash() {
    return (
        <>
            <BackgroundImage
                src={splashImg}
                alt="Image of laptop on mobile device"
                layout="fill"
                objectFit="cover"
                objectPosition="center"
            />
            <Container
                sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    zIndex: 1,
                    pb: 5
                }}
            >
                <Box flex={1} display="flex" flexDirection="column" alignItems="center">
                    <Box flex={1} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                        <ShadowedText variant="h1" paragraph fontWeight="fontWeightBold">
                            I&#39;m Ricky McGeehan
                        </ShadowedText>
                        <ShadowedText
                            variant="subtitle1"
                            component="p"
                            mb={{ xs: 4, sm: 6 }}
                            width={{ xs: 'auto', sm: '75%', md: '65%' }}
                        >
                            {'I\'m a Bristol-based full-stack '}
                            <strong>Software Developer</strong>
                            {', specialising in '}
                            <strong>web</strong>
                            {' and '}
                            <strong>hybrid applications</strong>
                            .
                            {' Here you can find some information about me, my skills and experience and how to get in contact.'}
                        </ShadowedText>
                        <SocialLinks />
                    </Box>
                    <Fab variant="hover" component="a" href="#about" size="medium" aria-label="scroll to next section">
                        <KeyboardArrowDownIcon fontSize="large" />
                    </Fab>
                </Box>
            </Container>
        </>
    );
}
