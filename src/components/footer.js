import React, { Component } from 'react';

class Footer extends Component {

    createLink(url)
    {
        return () => {
            const newWindow = window.open(url,'_blank');
            newWindow.opener = null;
        }
    }

    render() {

        var fullname = this.props.data.fullname;
        if(this.props.data.socialInfo)
        {
            var networks = this.props.data.socialInfo.map((network) => {
                return <li key={network.name}><a onClick={this.createLink(network.url)}><i className={network.className}></i></a></li>
            });
        }

        return (
            <footer>

                <a id="go-top" className="smoothscroll go-to-top" title="Back to Top" href="#home">
                    <i className="fas fa-chevron-up fa-2x"></i>
                </a>

                <div className="row">
                    <div className="copywrite">&copy; Copyright 2019 {fullname}</div>
                    <ul className="social-links">
                        {networks}
                    </ul>
                </div>

            </footer>
        );
    }
}

export default Footer;
