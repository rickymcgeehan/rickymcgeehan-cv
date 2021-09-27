import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import { visuallyHidden } from '@mui/utils';
import join from '../util/join';

// details of education
const education = [
    {
        key: 'uob',
        title: 'University of Bristol',
        role: 'MEng Computer Science (2:1)',
        start: 'Oct 2011',
        end: 'June 2015',
        description: join(
            'I studied at The University of Bristol, one of the UK’s leading institutions for Computer Science. ',
            'During my 4-year degree course, I gained a thorough grounding in the fundamentals of Computer Science, ',
            'both theoretical and practical. I had exposure to many programming languages and the opportunity to use ',
            'the very latest technologies in a variety of applications. I learned to manage resources and time ',
            'constraints to meet strict deadlines; both as an individual and whilst collaborating as part of a ',
            'group. Towards the end of my degree, I specialised in Web Development, Graphics and Animation, Human ',
            'Computer Interaction (HCI) and Language Engineering.'
        )
    },
    {
        key: 'jhgs',
        title: 'John Hampden Grammar School',
        role: 'Secondary School',
        start: 'Sep 2004',
        end: 'June 2011',
        description: join(
            'A-Levels: Computing (A*); Physics (A*); Maths (A)',
            '\n\n',
            'I participated in many extracurricular activities whilst at school including playing in the football ',
            'team for many years and creating a business with the Young Enterprise scheme.'
        )
    }
];

// details of employment history
const employment = [
    {
        key: 'dlt',
        title: 'Deloitte Digital',
        role: 'Senior Consultant & Front-end Craft Lead',
        start: 'Nov 2019',
        end: 'Present',
        description: (
            <>
                <Typography paragraph>
                    {
                        join(
                            'As the Front-end Craft Lead for Deloitte’s UK Systems Design and Engineering ',
                            'capability, I am responsible for setting down standards and best practices, defining ',
                            'learning and development pathways and enabling us to improve our front-end capabilities ',
                            'through coaching, mentoring and knowledge-sharing. I also have a crucial role in the ',
                            'recruitment of Front-end candidates at all levels. This involves screening CVs, ',
                            'conducting interviews, reviewing assessment results and providing feedback.'
                        )
                    }
                </Typography>
                <Typography paragraph>
                    {
                        join(
                            'I have taken a leading role in many greenfield projects for public sector clients during ',
                            'my time at Deloitte. Whilst every project is different, my responsibilities generally ',
                            'include architecture design, implementing complex features, assuring quality through ',
                            'automated testing and code review and mentoring other developers. In addition to this, ',
                            'I am often required to liaise with clients in order to break their requirements down ',
                            'into measurable tasks and present complicated technical information in an ',
                            'understandable way.'
                        )
                    }

                </Typography>
                <Typography variant="body2">
                    <em>
                        <strong>Key Skills &amp; Technologies: </strong>
                        {
                            [
                                'ES6 JavaScript', 'React', 'Redux', 'Material-UI', 'HTML5', 'CSS3', 'Sass',
                                'WCAG 2.1', 'NodeJs', 'Express', 'REST', 'Docker', 'Jest', 'Cucumber',
                                'Enzyme', 'Testing Library', 'Puppeteer', 'ESLint', 'Camunda', 'Form.io',
                                'Keystone', 'Leaflet', 'MongoDB', 'Neo4j', 'GIT', 'Figma', 'Postman',
                                'Lighthouse', 'Jira', 'Confluence', 'Agile', 'Scrum'
                            ]
                            .join(', ')
                        }
                    </em>
                </Typography>
            </>
        )
    },
    {
        key: 'tmts',
        title: 'Toumetis',
        role: 'Software Developer',
        start: 'Sep 2015',
        end: 'Dec 2018',
        description: join(
            'During my time as a Software Developer at Toumetis, I worked on a number of commercial hybrid ',
            'applications in the IOT space. All the projects were founded in JavaScript, CSS and HTML, however many ',
            'also utilised native elements written in Objective-C or Java and some were built on frameworks such as ',
            'Angular 2 and Ionic. I was able to gain experience in creating new applications from the ground-up, but ',
            'also in maintaining well-established applications with a vast and complicated code-base. Working under ',
            'many different project managers, collaborating with UI designers and liaising with clients, the role ',
            'demanded versatility and the the ability to work with large distributed teams across the globe. I ',
            'regularly participated in group code reviews and gave constructive feedback so that the best coding ',
            'standards were upheld and others could benefit from my experience.'
        )
    }
];

// technical skills
const skills = [
    { name: 'JavaScript (ES6)', score: 95 },
    { name: 'TypeScript', score: 75 },
    { name: 'HTML5', score: 95 },
    { name: 'CSS (SASS)', score: 95 },
    { name: 'WCAG 2.1', score: 85 },
    { name: 'React', score: 95 },
    { name: 'Next.js', score: 65 },
    { name: 'Angular 2+', score: 60 },
    { name: 'Material UI', score: 95 },
    { name: 'Ionic', score: 60 },
    { name: 'NodeJs', score: 90 },
    { name: 'Docker', score: 75 },
    { name: 'MongoDB', score: 50 },
    { name: 'Neo4j', score: 60 },
    { name: 'Keystone', score: 80 },
    { name: 'GIT', score: 90 },
];

/**
 * An experience section which lists positions under a section heading.
 */
const ExprienceSection = ({ title, children }) => (
    <Grid container component="section" textAlign={{ xs: 'center', md: 'justify' }}>
        <Grid item xs={12} md={3}>
            <Typography variant="h2">{title}</Typography>
        </Grid>
        <Grid item xs={12} md={9}>
            {children}
        </Grid>
    </Grid>
);

ExprienceSection.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired
};

/**
 * An experience item with a title, role, time period and description.
 */
const ExperienceItem = ({ key, title, role, start, end, description }) => (
    <Box key={key} mb={5}>
        <Typography variant="h3">{title}</Typography>
        <Typography align="inherit" color="textSecondary" paragraph>
            <em>{role}</em>
            <span>
                &nbsp;
                &nbsp;
                {'\u2022'}
                &nbsp;
                &nbsp;
                {`${start} - ${end}`}
            </span>
        </Typography>
        {
            typeof description !== 'string' ? description : (
                <Typography align="inherit" whiteSpace="pre-wrap">{description}</Typography>
            )
        }
    </Box>
);

ExperienceItem.propTypes = {
    key: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    start: PropTypes.string.isRequired,
    end: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
};

/**
 * Experience section of the website.
 */
export default function Experience() {
    return (
        <Container maxWidth="md" sx={{ textAlign: 'center', pt: 5, pb: 7 }}>
            <ExprienceSection title="Education">
                {education.map(ExperienceItem)}
            </ExprienceSection>
            <Divider sx={{ mb: 5 }} />
            <ExprienceSection title="Employment">
                {employment.map(ExperienceItem)}
            </ExprienceSection>
            <Divider sx={{ mb: 5 }} />
            <ExprienceSection title="Skills">
                <Typography mb={5} align="inherit">
                    {
                        join(
                            'I have a keen interest in Front-end development and I like to stay up to date with the ',
                            'latest emerging technologies and frameworks. Although I have specialised in Front-end ',
                            'development, I am also proficient in various Back-end technologies such as building ',
                            'RESTful APIs and database design and interaction. I think it’s important to write ',
                            'clean, scalable and modularised code that is easy to understand and I believe that ',
                            'it\'s important to always strive for the highest coding standards. Moreover, I have a ',
                            'sound knowledge of the WCAG guidelines and I like to champion the use of semantic HTML ',
                            'and WAI-ARIA attributes to make sure that the apps and websites that I work on can be ',
                            'enjoyed by everyone.'
                        )
                    }
                </Typography>
            </ExprienceSection>
            <Grid container spacing={{ xs: 2, sm: 4 }}>
                {
                    skills.map(({ name, score }) => (
                        <Grid component="figure" key={name} item xs={6} textAlign="left">
                            <Typography variant="subtitle1" component="figurecaption" gutterBottom>
                                {name}
                                <Typography component="span" sx={visuallyHidden}>
                                    {`: ${(score / 10).toFixed(1)} out of 10`}
                                </Typography>
                            </Typography>
                            <LinearProgress
                                role="presentation"
                                aria-hidden
                                variant="determinate"
                                value={score}
                                sx={{ height: 15 }}
                            />
                        </Grid>
                    ))
                }
            </Grid>
        </Container>
    );
}
