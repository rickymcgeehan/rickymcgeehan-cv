import Image from 'next/image';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import DownloadIcon from '@mui/icons-material/Download';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import styled from '@emotion/styled';
import profileImg from '../public/images/profile.jpg';
import join from '../util/join';

const Avatar = styled(Image)({ borderRadius: '50%' });

/**
 * About section of the website.
 */
export default function About() {
    return (
        <Container sx={{ pt: 5, pb: 7 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={3} textAlign="center">
                    <Avatar src={profileImg} alt="Ricky McGeehan" width={160} height={160} />
                </Grid>
                <Grid item xs={12} md={9}>
                    <Box component="section" mb={5}>
                        <Typography variant="h2" paragraph>About Me</Typography>
                        <Typography>
                            {
                                join(
                                    'I am a confident, sociable person with strong leadership qualities who can work ',
                                    'on his own initiative but is also an excellent team player. I relish ',
                                    'responsibility and embrace the unknown as a chance to learn. I take an ',
                                    'organised and proactive approach to achieving goals and my experience in ',
                                    'industry has honed my app and web development skill set. I have been lucky ',
                                    'enough to travel the world, both on vacation and through work and in my free ',
                                    'time I enjoy playing football, scuba diving, snowboarding and all kinds of ',
                                    'water-sports. These interests have given me well-rounded life experience that ',
                                    'complements my technical ability.'
                                )
                            }
                        </Typography>
                    </Box>
                    <div>
                        <Box component="section" display="inline-block" mb={5} mr={5}>
                            <Typography variant="h2" paragraph>Contact Details</Typography>
                            <Typography>Ricky McGeehan</Typography>
                            <Typography>10 Bower Walk</Typography>
                            <Typography>Bristol</Typography>
                            <Typography>BS3 5AN</Typography>
                            <Typography>+447771 594 076</Typography>
                            <Typography>rickymcgeehan@hotmail.com</Typography>
                        </Box>
                        <Box display="inline-block" mb={5} sx={{ verticalAlign: 'top' }}>
                            <Button
                                component="a"
                                variant="containedHover"
                                size="large"
                                elevation={0}
                                href="/files/rickymcgeehan-cv.pdf"
                                startIcon={<DownloadIcon />}
                            >
                                Download CV
                            </Button>
                        </Box>
                    </div>
                </Grid>
            </Grid>
        </Container>
    );
}
