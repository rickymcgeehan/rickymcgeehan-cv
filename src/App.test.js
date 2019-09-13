import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
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
			expect(addressLines[i].text).toEqual(addressItems[i]);
		}
	});
});

// TODO: write tests for Experience

// TODO: write tests for Contact

// TODO: write tests for Footer

// TODO: write tests for screen sizes (?)