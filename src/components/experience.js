import React, { Component } from 'react';

class Experience extends Component {
    render() {

        var ref = this.props.innerRef;
        if(this.props.data)
        {
            var skillsDescription = this.props.data.skillsDescription;

            var education = this.props.data.education.map(function(education) {
                return  <div className="education-item" key={education.institution}>
                            <h3>{education.institution}</h3>
                            <p className="info">{education.certificate} <span>&bull;</span><em className="date">{education.start} - {education.end}</em></p>
                            <p className="description">{education.description}</p>
                        </div>
            });

            var work = this.props.data.work.map(function(work) {
                return  <div key={work.company}>
                            <h3>{work.company}</h3>
                            <p className="info">{work.jobTitle}<span>&bull;</span> <em className="date">{work.start} - {work.end}</em></p>
                            <p className="description">{work.description}</p>
                        </div>
            });

            var skills = this.props.data.skills.map(function(skills) {
                var className = 'bar-expand '+skills.name.toLowerCase();
                return  <li key={skills.name}>
                            <div className="bar-title">{skills.name}</div>
                            <div className={className}>
                                <div className="bar-inner" style={{width:skills.level}}></div>
                            </div>
                        </li>
            });
        }

        return (
            <section id="experience" className="experience-section" ref={ref}>

                <div className="experience-content education">
                    <div className="header">
                        <h1>Education</h1>
                    </div>

                    <div className="main">
                        <div className="row item">
                            <div className="twelve columns">
                            {education}
                            </div>
                        </div>
                    </div>
                </div>


                <div className="experience-content work">

                    <div className="header">
                        <h1>Work</h1>
                    </div>

                    <div className="main">
                        {work}
                    </div>
                </div>



                <div className="experience-content skill">

                    <div className="header">
                        <h1>Skills</h1>
                    </div>

                    <div className="main">

                        <p className="description">{skillsDescription}</p>

                        <div className="bars">
                            <ul className="skills">
                                {skills}
                            </ul>
                        </div>
                    </div>
                </div>

            </section>
        );
    }
}

export default Experience;