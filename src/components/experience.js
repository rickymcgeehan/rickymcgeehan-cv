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
                            <p className="info">
                                <span className="certificate">{education.certificate}</span>
                                <span className="separator">&bull;</span>
                                <em className="date">{education.start} - {education.end}</em>
                            </p>
                            <p className="description">{education.description}</p>
                        </div>
            });

            var work = this.props.data.work.map(function(work) {
                return  <div className="work-item" key={work.company}>
                            <h3>{work.company}</h3>
                            <p className="info">
                                <span className="job-title">{work.jobTitle}</span>
                                <span className="separator">&bull;</span>
                                <em className="date">{work.start} - {work.end}</em>
                            </p>
                            <p className="description">{work.description}</p>
                        </div>
            });

            var skills = this.props.data.skills.map(function(skills) {
                return  <li key={skills.name}>
                            <div className="bar-title">{skills.name}</div>
                            <div className="bar-expand">
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
                        {education}
                    </div>
                </div>


                <div className="experience-content work">

                    <div className="header">
                        <h1>Employment</h1>
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