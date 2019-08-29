import React, { Component } from 'react';
import { Waypoint } from 'react-waypoint';
import './styles/app.scss';
import './styles/media-queries.scss';
import Header from './components/header';
import About from './components/about';
import Experience from './components/experience';
import Contact from './components/contact';
import Footer from './components/footer';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentPage: "#home",
            opaqueNavbar: true,
            cvData: {
                downloadUrl: "/files/rickymcgeehan-cv.pdf",
                fullname: 'Ricky McGeehan',
                avatar: '/images/avatar.jpg',
                jobTitle: 'Software Developer',
                about: "I am a confident, sociable person with strong leadership qualities who can work on his own initiative but is also an excellent team player. I relish responsibility and embrace the unknown as a chance to learn. I take an organised and proactive approach to achieving goals and my experience in industry has honed my app and web development skill set. I have been lucky enough to travel the world, both on vacation and through work and in my free time I enjoy playing football, scuba diving, snowboarding and all kinds of water-sports. These interests have given me well-rounded life experience that complements my technical ability.",
                socialInfo: [
                    {name: 'Facebook', className: 'fab fa-facebook', url: 'https://www.facebook.com/rickymcgeehan'},
                    {name: 'Instagram', className: 'fab fa-instagram', url: 'https://www.instagram.com/rum.ricky'},
                    {name: 'LinkedIn', className: 'fab fa-linkedin', url: 'https://www.linkedin.com/in/rickymcgeehan'}
                ],
                contactInfo: {
                    phone: '+447771594076',
                    email: 'rickymcgeehan@hotmail.com',
                    address: {
                        street: '183 Blind Lane',
                        city: 'High Wycombe',
                        county: 'Buckinghamshire',
                        postcode: 'HP10 9LE'
                    }   
                },
                education: [
                    {institution: 'John Hampden Grammar School', certificate: 'Secondary School', start: 'Sep 2004', end: 'June 2011', description: 'A-Levels: Computing (A*); Physics (A*); Maths (A)\n\nI participated in many extracurricular activities whilst at school including playing in the football team for many years and creating a business with the Young Enterprise scheme.'},
                    {institution: 'University of Bristol', certificate: 'MEng Computer Science (2:1)', start: 'Oct 2011', end: 'June 2015', description: 'I studied at The University of Bristol, one of the UK’s leading institutions for Computer Science. During my 4-year degree course, I gained a thorough grounding in the fundamentals of Computer Science, both theoretical and practical. I had exposure to many programming languages and the opportunity to use the very latest technologies in a variety of applications. I learned to manage resources and time constraints to meet strict deadlines; both as an individual and whilst collaborating as part of a group. Towards the end of my degree, I specialised in Web Development, Graphics and Animation, Human Computer Interaction (HCI) and Language Engineering.'}
                ],
                work: [
                    {company: 'Toumetis Ltd.', jobTitle: 'Software Developer', start: 'Sep 2015', end: 'Dec 2018', description: 'During my time at Toumetis, I worked as a Software Developer on a number of commercial hybrid applications. All the projects were founded in JavaScript, CSS and HTML, however many also utilised native elements written in Objective-C or Java and some were built on frameworks such as Angular and Ionic. I was able to gain experience in creating new applications from the ground-up, but also in maintaining well-established applications with a vast, complicated code-base. Working under many different project managers, collaborating with UI designers and liaising with clients, the role demanded versatility and the the ability to work with large distributed teams across the globe. I regularly participated in group code reviews and gave constructive feedback so that the best coding standards were upheld and others could benefit from my experience.'}
                ],
                skillsDescription: 'I have a keen interest in front-end development which has led me to explore many JS frameworks and interfaces. Although I have specialised in front-end, I\'m also proficient in various areas of the back-end including server maintenance, building APIs and database design and interaction. In addition, I have experience in native languages such as Objective-C and Java from working on hybrid applications that required native components. I think it’s important to write clean, scalable and modularised code that is easy to understand and to always strive for the highest coding standards.',
                skills: [
                    {name: 'JavaScript', level: '90%'},
                    {name: 'CSS (SASS & SCSS)', level: '90%'},
                    {name: 'HTML5', level: '90%'},
                    {name: 'Ionic 2', level: '90%'},
                    {name: 'TypeScript', level: '85%'},
                    {name: 'Git', level: '80%'},
                    {name: 'NodeJS', level: '70%'},
                    {name: 'Angular 2', level: '70%'},
                    {name: 'SQL', level: '65%'},
                    {name: 'React JS', level: '40%'},
                    {name: 'Java', level: '40%'},
                    {name: 'Objective-C', level: '40%'},
                    {name: 'AWS', level: '30%'},
                ],
            }
        };
    }

    render() {

        var header = <Header data={this.state.cvData} 
                             currentPage={this.state.currentPage} 
                             opaqueNavbar={this.state.opaqueNavbar} 
                             innerRef={React.createRef()}/>;

        var about = <About data={this.state.cvData} innerRef={React.createRef()}/>;

        var experience = <Experience data={this.state.cvData} innerRef={React.createRef()}/>;
        
        var contact = <Contact data={this.state.cvData} innerRef={React.createRef()}/>;

        var pages = [
            {pageComponent: header, id: '#home'},
            {pageComponent: about, id: '#about'},
            {pageComponent: experience, id: '#experience'},
        ];

        var createSectionWithWaypoints = (section, navId) =>
        {
            var pageIndex = pages.findIndex(function(page)
            {
                return page.id === navId;
            });

            var onEnter = () =>
            {
                this.setState({currentPage: navId});
            }

            var onLeave = (props) =>
            {
                if (props.currentPosition === "below" && pageIndex > 0)
                    this.setState({currentPage: pages[pageIndex-1].id});
                else if (props.currentPosition === "above" && pageIndex < pages.length-1)
                    this.setState({currentPage: pages[pageIndex+1].id});
            }

            return <Waypoint topOffset="30%" bottomOffset="30%" onEnter={onEnter} onLeave={onLeave}>
                        {section}
                    </Waypoint>;
        }

        var updateNavbarAppearance = (props) =>
        {
            if (props.currentPosition === "above")
                this.setState({opaqueNavbar: true});
            else
                this.setState({opaqueNavbar: false});
        }

        return (
            <div className="app">
                {createSectionWithWaypoints(header, '#home')}
                <Waypoint onEnter={updateNavbarAppearance} onLeave={updateNavbarAppearance}></Waypoint>
                {createSectionWithWaypoints(about, '#about')}
                {createSectionWithWaypoints(experience, '#experience')}
                {createSectionWithWaypoints(contact, '#contact')}
                <Footer data={this.state.cvData}/>
            </div>
        );
    }
}

export default App;
