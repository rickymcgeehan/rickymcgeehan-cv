import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import App from './App';
import Header from './components/header';
import About from './components/about';
import Experience from './components/experience';
import Contact from './components/contact';
import Footer from './components/footer';
import cvData from './cv-data.json';


function rendersSingleComponent(wrapper, component, componentName) {
	it('renders a single "' + componentName + '" section', () => {
		expect(wrapper.find(component).length).toEqual(1)
	});
}

describe('<App />', () => {
	it('renders without crashing', () => {
	  const div = document.createElement('div');
	  ReactDOM.render(<App />, div);
	  ReactDOM.unmountComponentAtNode(div);
	});

	const wrapper = shallow(<App />);
	it('renders div with class name "app"', () => {
		expect(wrapper.hasClass('app')).toEqual(true);
	});

	rendersSingleComponent(wrapper, Header, "Header");
	rendersSingleComponent(wrapper, About, "About");
	rendersSingleComponent(wrapper, Experience, "Experience");
	rendersSingleComponent(wrapper, Contact, "Contact");
	rendersSingleComponent(wrapper, Footer, "Footer");
});

// TODO: write tests for Header

describe('<About />', () => {
	const wrapper = shallow(<About data={cvData}/>);

	it('renders an avatar with correct "src" and "alt" attributes', () => {
		expect(wrapper.exists('img[src="' + cvData.avatar + '"][alt="' + cvData.fullname + '"]')).toEqual(true)
	});

	it ('renders a bio description correctly', () => {
		expect(wrapper.exists('p.about-description')).toEqual(true);
	});

	it ('renders an address correctly', () => {
		const addressItems = [cvData.street, cvData.city + ', ' + cvData.postcode, cvData.phone, cvData.email];
		const addressLines = wrapper.find('p.address span');

		for (var i=0; i<addressLines; i++) {
			expect(addressLines.at(i).text()).toEqual(addressItems[i]);
		}
	});
});

describe('<Experience />', () => {
	const wrapper = shallow(<Experience data={cvData}/>);

	it('renders education items correctly', () => {
		const educationHeaders = wrapper.find('.education-item h3');
		const educationCertificates = wrapper.find('.education-item .certificate');
		const educationDates = wrapper.find('.education-item .date');
		const educationDescriptions = wrapper.find('.education-item .description');

		for (var i=0; i < cvData.education.length; i++) {
			const educationItem = cvData.education[i];
			expect(educationHeaders.at(i).text()).toEqual(educationItem.institution);
			expect(educationCertificates.at(i).text()).toEqual(educationItem.certificate);
			expect(educationDates.at(i).text()).toEqual(educationItem.start + ' - ' + educationItem.end);
			expect(educationDescriptions.at(i).text()).toEqual(educationItem.description);
		}
	});

	it('renders work items correctly', () => {
		const workHeaders = wrapper.find('.work-item h3');
		const workTitles = wrapper.find('.work-item .job-title');
		const workDates = wrapper.find('.work-item .date');
		const workDescriptions = wrapper.find('.work-item .description');

		for (var i=0; i < cvData.work.length; i++) {
			const workItem = cvData.work[i];
			expect(workHeaders.at(i).text()).toEqual(workItem.company);
			expect(workTitles.at(i).text()).toEqual(workItem.jobTitle);
			expect(workDates.at(i).text()).toEqual(workItem.start + ' - ' + workItem.end);
			expect(workDescriptions.at(i).text()).toEqual(workItem.description);
		}
	});

	it('renders skill items correctly', () => {
		const skillTitles = wrapper.find('ul.skills li .bar-title');
		const skillBars = wrapper.find('ul.skills li .bar-inner');

		for (var i=0; i < cvData.skills.length; i++) {
			const skillItem = cvData.skills[i];
			expect(skillTitles.at(i).text()).toEqual(skillItem.name);
			expect(skillBars.at(i).props().style.width).toEqual(skillItem.level);
		}
	});
});

describe('<Contact />', () => {
	const wrapper = mount(<Contact data={cvData}/>);

	it ('renders a contact address correctly', () => {
		const addressItems = [cvData.street, cvData.city + ', ' + cvData.postcode, cvData.phone];
		const addressLines = wrapper.find('p.address span');

		for (var i=0; i<addressLines; i++) {
			expect(addressLines.at(i).text()).toEqual(addressItems[i]);
		}
	});

	it('renders contact form correctly', () => {
		expect(wrapper.exists('input.contact-input[name="contactName"][required=true]')).toEqual(true);
		expect(wrapper.exists('input.contact-input[name="contactEmail"][required=true]')).toEqual(true);
		expect(wrapper.exists('input.contact-input[name="contactSubject"][required=false]')).toEqual(true);
		expect(wrapper.exists('textarea.contact-input[name="contactMessage"][required=true]')).toEqual(true);
	});

	// TODO: Test field validation and clicking submit button
});

// TODO: write tests for Footer

// TODO: write tests for screen sizes (?)