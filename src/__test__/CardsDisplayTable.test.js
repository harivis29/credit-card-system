import React from 'react';
import { shallow} from 'enzyme';
import CardsDisplayTable from "./../components/CardsDisplayTable";


describe('AddCardForm', () => {
    const wrapper = shallow(<CardsDisplayTable />);

    it('render with one h4 heading', () => {
        expect(wrapper.find("h4")).toHaveLength(1);
    }) 

    it('render with table element', () => {
        expect(wrapper.find("table")).toHaveLength(1);
    }) 

})