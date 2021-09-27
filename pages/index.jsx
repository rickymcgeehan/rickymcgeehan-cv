import { useCallback, useState } from 'react';
import Head from 'next/head';
import { Waypoint } from 'react-waypoint';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Toolbar from '@mui/material/Toolbar';
import { ThemeProvider } from '@mui/material/styles';
import altTheme from '../util/alt-theme';
import { siteTitle } from '../util/config';
import NavBar from '../components/NavBar';
import Splash from '../components/Splash';
import About from '../components/About';
import Experience from '../components/Experience';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

// all sections of the website
const sections = [
    {
        id: 'home',
        Component: Splash,
        as: 'section',
        sx: {
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
        }
    },
    { id: 'about', Component: About, as: 'section' },
    { id: 'experience', Component: Experience, isAltTheme: true },
    { id: 'contact', Component: Contact, as: 'section' }
];

/**
 * A section of the website.
 */
const Section = ({ id, Component, sx, as, onEnter, onLeave }) => {
    /**
     * Handle the user scrolling into the section.
     */
    const handleEnter = useCallback((props) => {
        if (onEnter) {
            onEnter(id, props);
        }
    }, [id, onEnter]);

    /**
     * Handle the user scrolling into the section.
     */
    const handleLeave = useCallback((props) => {
        if (onLeave) {
            onLeave(id, props);
        }
    }, [id, onLeave]);

    return (
        <Waypoint bottomOffset="30%" topOffset="30%" onEnter={handleEnter} onLeave={handleLeave}>
            <Paper id={id} square elevation={0} component={as} sx={{ position: 'relative', ...sx }}>
                <Toolbar variant="dense" />
                <Component />
            </Paper>
        </Waypoint>
    );
};

/**
 * A section of the website with alternative styling.
 *
 * @param {string} id The element id of the section.
 * @param {Object} id The element id of the section.
 */
const AltThemeSection = ({ id, Component, sx, as, onEnter, onLeave }) => (
    <ThemeProvider theme={altTheme}>
        <CssBaseline />
        <Section {...{ id, Component, sx, as, onEnter, onLeave }} />
    </ThemeProvider>
);

export default function Home() {
    const [currentSection, setCurrentSection] = useState('#home');
    const [navBarColor, setNavBarColor] = useState('background');

    /**
     * Update the current section whenever entering a new one.
     *
     * @param {string} id The element id of the section.
     */
    const onEnterSection = useCallback((id) => {
        if (currentSection !== id) {
            setCurrentSection(id);
        }
    }, [currentSection, setCurrentSection]);

    return (
        <>
            <Head>
                <title>{siteTitle}</title>
                <meta name="og:title" content={siteTitle} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta
                    property="og:image"
                    content={`${process.env.BASE_URL}/public/images/profile.jpg`}
                />
                <meta name="og:title" content={siteTitle} />
                <meta name="twitter:card" content="summary_large_image" />
            </Head>
            <NavBar color={navBarColor} current={`#${currentSection}`} />
            {
                sections.map(({ id, Component, as, sx, isAltTheme }, idx) => {
                    const SectionComponent = isAltTheme ? AltThemeSection : Section;
                    const onLeaveSection = (sectionId, { currentPosition }) => {
                        if (currentPosition === 'below' && idx > 0) {
                            // user has scrolled above section waypoint,
                            // update current to be the previous section
                            setCurrentSection(sections[idx - 1].id);
                        } else if (currentPosition === 'above' && idx < sections.length - 1) {
                            // user has scrolled above section waypoint,
                            // update current to be the next section
                            setCurrentSection(sections[idx + 1].id);
                        }
                    };

                    const nodes = [
                        <SectionComponent
                            key={id}
                            {...{ id, Component, as, sx }}
                            onEnter={onEnterSection}
                            onLeave={onLeaveSection}

                        />
                    ];

                    if (id === 'home') {
                        // add waypoint to switch navbar from 'transparent' to 'background'
                        const updateNavbar = ({ currentPosition }) => {
                            setNavBarColor(currentPosition === 'above' ? 'background' : 'transparent');
                        };
                        nodes.push(<Waypoint key="navbar-waypoint" onEnter={updateNavbar} onLeave={updateNavbar} />);
                    }

                    return nodes;
                })
            }
            <Footer />
        </>
    );
}
