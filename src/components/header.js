import React, { Component } from 'react';
import classNames from 'classnames';

class Header extends Component {

    constructor(props) {
        super(props);

        this.state = {
            navMenuOpen: false,
        };

        this.openNav = this.openNav.bind(this);
        this.closeNav = this.closeNav.bind(this);
    }

    createLink(url)
    {
        return () => {
            const newWindow = window.open(url,'_blank');
            newWindow.opener = null;
        }
    }

    openNav() {
        this.setState({navMenuOpen: true});
    }

    closeNav() {
        this.setState({navMenuOpen: false});
    }

    render() {

        var ref = this.props.innerRef;
        var fullname = this.props.data.fullname;
        var jobTitle = this.props.data.jobTitle;
        if(this.props.data.socialInfo)
        {
            var networks = this.props.data.socialInfo.map((network) => {
                return <li key={network.name}><button onClick={this.createLink(network.url)}><i className={network.className}></i></button></li>
            });
        }

        var createNavLink = (name, navId, iconClass) =>
        {
            return  <li className={this.props.currentPage === navId ? 'current' : ''}>
                        <a className="smoothscroll" href={navId} onClick={this.closeNav}>
                            <i className={'nav-item-icon ' + (iconClass || '')}></i>
                            {name}
                        </a>
                    </li>
        }

        const navWrapClassNames = classNames({
            'nav-wrap': true,
            'opaque': this.props.opaqueNavbar,
            'open': this.state.navMenuOpen,
        });

        const navbar =  <nav id="nav-wrap" className={navWrapClassNames}>
                            <div className="open-nav" onClick={this.openNav}>
                                <i className="fas fa-bars fa-2x"></i>
                            </div>
                            <div className="nav-background-overlay" onClick={this.closeNav}></div>
                            <ul id="nav" className="nav-list">
                                <div className="close-nav-wrapper">
                                    <div className="close-nav" onClick={this.closeNav}>
                                        <i className="fas fa-bars fa-2x"></i>
                                    </div>
                                </div>
                                {createNavLink('Home', '#home', 'fas fa-home fa-2x')}
                                {createNavLink('About', '#about', 'fas fa-user fa-2x')}
                                {createNavLink('Experience', '#experience', 'fas fa-tools fa-2x')}
                                {createNavLink('Contact', '#contact', 'fas fa-paper-plane fa-2x')}
                            </ul>
                        </nav>

        return (
            <header id="home" className="nav-wrapper" ref={ref}>

                {navbar}

                <div className="row banner">
                    <div className="banner-text">
                        <h1 className="responsive-headline">I'm {fullname}</h1>
                        <h3>I'm a Bristol-based full-stack <span>{jobTitle}</span>, specialising in <span>web</span> and <span>hybrid applications</span>. Here you can find some information about me, my skills and experience and how to get in contact. </h3>
                        <hr />
                        <ul className="social">
                        {networks}
                        </ul>
                    </div>
                </div>

                <div className="scrolldown">
                    <a className="smoothscroll" href="#about"><i className="fas fa-chevron-circle-down"></i></a>
                </div>

            </header>
        );
    }
}

export default Header;