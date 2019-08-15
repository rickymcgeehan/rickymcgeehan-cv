import React, { Component } from 'react';
import axios from 'axios';
import classNames from 'classnames';

const txtFieldState = {
    value: "",
    valid: true,
    typeMismatch: false,
};

const Field = ({
    valid,
    type,
    fieldId,
    fieldName,
    typeMismatch,
    formatErrorTxt,
    requiredTxt,
    required,
    size,
    onChange,
    isTextArea,
    className
}) => {

    var inputEl;
    if (isTextArea)
        inputEl = <textarea cols="50" rows="10" className="contact-input" defaultValue="" name={fieldName} id={fieldId} required={required} onChange={onChange}/>
    else
        inputEl = <input className="contact-input" defaultValue="" type={type} name={fieldId} size={size} id={fieldId} required={required} onChange={onChange}/>

    return (
        <div className={className}>
            <label htmlFor={fieldId}>
                <span className="label-text">
                    {fieldName}
                    {(required ? <span className="required">*</span> : "")}
                </span>
            </label>
            {inputEl}
        </div>
    );
};

class Contact extends Component {
    constructor(props) {
        super(props);

        this.state = {
            sending: false,
            success: false,
            errorMessage: '',
            fields: {
                contactName: {
                    ...txtFieldState,
                    fieldName: "Name",
                    required: true,
                    requiredTxt: "You need to tell me your name!",
                    size: 35,
                    type: "text",
                    idx: 0
                },
                contactEmail: {
                    ...txtFieldState,
                    fieldName: "Email",
                    required: true,
                    requiredTxt: "You haven't entered an email address!",
                    formatErrorTxt: "The email address you entered is invalid!",
                    size: 35,
                    type: "email",
                    idx: 1
                },
                contactSubject: {
                    ...txtFieldState,
                    fieldName: "Subject",
                    required: false,
                    requiredTxt: "Subject is required.",
                    size: 35,
                    type: "text",
                    idx: 2
                },
                contactMessage: {
                    ...txtFieldState,
                    fieldName: "Message",
                    required: true,
                    requiredTxt: "You're trying to send me an empty message!",
                    isTextArea: true,
                    idx: 3
                }
            },
            allFieldsValid: false,
            errorField: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    mapFieldInputs = () => {
        return Object.keys(this.state.fields).map(fieldId => {
            return {
                fieldId: fieldId,
                ...this.state.fields[fieldId]
            };
        });
    };

    handleChange(event) 
    {

        const formValues = this.reduceFormValues(event.target.form);
        const allFieldsValid = this.checkAllFieldsValid(formValues);

        this.setState({ fields: formValues, allFieldsValid });
    }

    checkAllFieldsValid(formValues) 
    {
        return !Object.keys(formValues)
        .map(f => formValues[f])
        .some(field => !field.valid);
    }

    reduceFormValues(form) 
    {
        const fieldEls = Array.prototype.slice.call(form.elements).filter(el => el.name.length > 0);

        return fieldEls.map(f => {
            const { typeMismatch } = f.validity;
            const { id, name, type, value, size } = f;

            return {
                id,
                name,
                type,
                typeMismatch,
                value,
                size,
                valid: f.checkValidity(),
            };
        })
        .reduce((memo, currentField) => {
            //then we finally use reduce, ready to put it in our state
            const { value, valid, typeMismatch, type, size } = currentField;
            const { fieldName, required, requiredTxt, formatErrorTxt, idx, isTextArea } = this.state.fields[currentField.id];
            const fieldId = currentField.id;

            //we'll need to map these properties back to state so we use reducer...
            memo[fieldId] = {
                value,
                valid,
                required,
                typeMismatch,
                fieldName,
                requiredTxt,
                formatErrorTxt,
                idx,
                fieldId,
                size,
                type,
                isTextArea
            };

            return memo;
        }, {});
    }

    async handleSubmit(event) 
    {
        event.preventDefault();

        if (this.state.sending)
            return;

        const formValues = this.reduceFormValues(event.target);
        const allFieldsValid = this.checkAllFieldsValid(formValues);

        this.setState({ fields: formValues, allFieldsValid });

        if (!allFieldsValid)
        {
            const orderedFields = Object.keys(formValues).map(idx => {
                var formValue = formValues[idx];
                // formValue.classList.remove('error'); // make sure no fields are showing an error before highlighting the correct one
                return formValue;
            })
            .sort((a,b) => (a.idx > b.idx) ? 1 : -1);

            const invalidField = orderedFields.find(f => !f.valid);
            const errMsg = (invalidField.required && invalidField.value.length === 0) ? invalidField.requiredTxt : invalidField.formatErrorTxt;
            return this.setState({
                errorMessage: errMsg,
                errorField: invalidField.fieldId
            });
        }

        var name = this.state.fields.contactName.value;
        var email = this.state.fields.contactEmail.value;
        var subject = this.state.fields.contactSubject.value;
        var message = this.state.fields.contactMessage.value;

        this.setState({sending: true, success: false, errorMessage: ''});

        await axios.post('https://us-central1-rickymcgeehan-cv.cloudfunctions.net/api/sendmessage/', {
            name,
            email,
            subject,
            message
        })
        .then((res) => {
            this.setState({
                sending: false,
                success: true,
                name: '',
                email: '',
                subject: '',
                message: '',
                errorMessage: ''
            });
        },
        (err) => {
            this.setState({
                sending: false,
                errorMessage: "Oops, your message failed to send! Please try again.",
            });
        });
    }

    render() {

        var ref = this.props.innerRef;
        if(this.props.data)
        {
            var name = this.props.data.fullname;
            var street = this.props.data.contactInfo.address.street;
            var city = this.props.data.contactInfo.address.city;
            var postcode = this.props.data.contactInfo.address.postcode;
            var phone = this.props.data.contactInfo.phone;
        }

        const submitClassNames = classNames({
            'submit-row': true,
            'sending': this.state.sending,
            'success': this.state.success,
            'error': !!this.state.errorMessage,
        });

        const renderFields = this.mapFieldInputs().map(f => {

            const inputRowClassNames = classNames({
                'input-row': true,
                'error': this.state.errorField === f.fieldId && !f.valid,
            });

            return <Field {...f} className={inputRowClassNames} onChange={this.handleChange} key={f.fieldId}/>;
        });

        return (
            <section id="contact" className="alt-background contact-section" ref={ref}>

                <div className="row section-head">

                    <h1><span>Get In Touch.</span></h1>
                    <i className="fas fa-envelope fa-4x header-icon"></i>

                    <div className="contact-description">
                        If you'd like to get in touch please feel free to drop me an email or use the contact details below.
                    </div>

                </div>

                <div className="row main-content">

                    <div className="contact-form">

                        <form noValidate action="" method="post" id="contactForm" name="contactForm" onSubmit={this.handleSubmit}>
                            <fieldset>

                                {renderFields}

                                <div className={submitClassNames}>
                                    <div className="status-message message-error">
                                        <i className="fas fa-exclamation-triangle"></i>
                                        <span>{this.state.errorMessage}</span>
                                    </div>
                                    <div className="status-message message-success">
                                        <i className="fas fa-check"></i>Your message was sent, thank you!<br />
                                    </div>
                                    <div className="loading-spinner">
                                        <i className="fas fa-circle-notch fa-spin fa-2x"></i>
                                    </div>
                                    <button className="submit button" disabled={this.state.sending}>Submit</button>
                                </div>

                            </fieldset>
                        </form>

                    </div>


                    <aside>
                        <h4>Address and Phone</h4>
                        <p className="address">
                            {name}<br />
                            {street} <br />
                            {city}, {postcode}<br />
                            <span>{phone}</span>
                        </p>
                    </aside>

                </div>

            </section>
        );
    }
}
export default Contact;