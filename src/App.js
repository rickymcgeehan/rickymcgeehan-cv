import React, { Component } from 'react';
import { Waypoint } from 'react-waypoint';
import './styles/app.scss';
import './styles/media-queries.scss';
import Header from './components/header';
import About from './components/about';
import Experience from './components/experience';
import Contact from './components/contact';
import Footer from './components/footer';
import cvData from './cv-data.json';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentPage: "#home",
            opaqueNavbar: true,
            cvData: cvData
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
