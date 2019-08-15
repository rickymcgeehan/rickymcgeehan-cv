import React, { Component } from 'react';

class About extends Component {
    render() {

        var ref = this.props.innerRef;
        if(this.props.data)
        {
            var fullname = this.props.data.fullname;
            var about = this.props.data.about;
            var avatar = this.props.data.avatar;
            var street = this.props.data.contactInfo.address.street;
            var city = this.props.data.contactInfo.address.city;
            var postcode = this.props.data.contactInfo.address.postcode;
            var phone = this.props.data.contactInfo.phone;
            var email = this.props.data.contactInfo.email;
            var cvDownloadUrl = this.props.data.downloadUrl;

            var openDownload = () => {
                const newWindow = window.open(cvDownloadUrl,'_blank');
                newWindow.opener = null;
            }
        }



        return (
            <section id="about" className="alt-background about-section" ref={ref}>

                <div className="content">

                    <img className="avatar"  src={avatar} alt={fullname} />

                    <div className="main">
                        <h2>About Me</h2>

                        <p>{about}</p>

                        <div className="row">
                            <div className="contact-details">
                                <h2>Contact Details</h2>
                                <p className="address">
                                    <span>{fullname}</span><br />
                                    <span>{street}<br />
                                    {city}, {postcode}
                                    </span><br />
                                    <span>{phone}</span><br />
                                    <span>{email}</span>
                                </p>
                            </div>
                            <a onClick={openDownload} className="button download-button"><i className="icon fas fa-download"></i>Download CV</a>
                        </div>
                    </div>

                </div>

            </section>
            );
    }
}

export default About;