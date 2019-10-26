import React from 'react';
import { shallow } from 'enzyme';
import AddCardForm from "./../components/AddCardForm";


describe('AddCardForm', () => {
    const spy = jest.spyOn(AddCardForm.prototype, 'addCardDetails');
    const wrapper = shallow(<AddCardForm />);


    it('render with one h4 heading', () => {
        expect(wrapper.find("h4")).toHaveLength(1);
    }) 
    it('render with one add button', () => {
        expect(wrapper.find("button")).toHaveLength(1);
    })

    it('render with three input fields', () => {
        expect(wrapper.find("input")).toHaveLength(3);
    })

    it('update state on name change', () => { 
        let evt = { target : { id: "name", value: "test", validity: {valid: true}}}
        wrapper.find("#name").simulate("change", evt);
        expect(wrapper.state().name).toBe("test");
    })

    it('update state on card number change', () => { 
        let evt = { target : { id: "cardNumber", value: "12345", validity: {valid: true}}}
        wrapper.find("#cardNumber").simulate("change", evt);
        expect(wrapper.state().cardNumber).toBe("12345");


        //check with valid false, state should not change
        evt = { target : { id: "cardNumber", value: "123456789", validity: {valid: false}}}
        wrapper.find("#cardNumber").simulate("change", evt);
        expect(wrapper.state().cardNumber).toBe("12345");
    })

    it('update state on limit change', () => { 
        let evt = { target : { id: "limit", value: "100", validity: {valid: true}}}
        wrapper.find("#limit").simulate("change", evt);
        expect(wrapper.state().limit).toBe("100");
    })

    it('check if credit card validation working correctly', () => { 
        expect(wrapper.instance().validateWithLuhnAlgo(123)).toBe(false);

        expect(wrapper.instance().validateWithLuhnAlgo(4024007124)).toBe(true);
    })


});

