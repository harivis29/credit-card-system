import React, { Component } from "react";
import { addCard } from "./../api";

export default class AddCardForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            cardNumber: "4024007124",
            limit: 0,
            balance: 0,
            validCard: true
        }
        this.handleChange = this.handleChange.bind(this);
        this.addCardDetails = this.addCardDetails.bind(this);
    }

    handleChange(evt) {
        let { id, value, validity: { valid } } = evt.target,
            newState = { ...this.state };
        if (!valid) return;
        newState[id] = value.trim();
        newState["validCard"] = true;
        this.setState(newState);
    }

    addCardDetails(evt) {
        evt.preventDefault();
        let valid = this.validateWithLuhnAlgo(this.state.cardNumber)
        this.setState({
            validCard: valid
        });
        if(valid){
            this.prepareAndSaveData();
        }   
    }

    prepareAndSaveData(){
        let cardObj = {},
        { name, cardNumber, balance, limit} = this.state;
        cardObj["name"] = name;
        cardObj["cardNumber"] = cardNumber;
        cardObj["balance"] = balance;
        cardObj["limit"] = limit;
        this.props.updateStatus("request");

        addCard(cardObj, data => {
            this.props.updateStatus("success");
            this.clearForm();
        })
    }

    clearForm(){
        this.setState({
            name: "",
            cardNumber: "",
            limit: 0
        })
    }

    validateWithLuhnAlgo(num) {
        let inputNum = num.toString();
        let sum = 0;
        let doubleUp = false;
        for (let i = inputNum.length - 1; i >= 0; i--) {
            let curDigit = parseInt(inputNum.charAt(i));
            if (doubleUp) {
                if ((curDigit * 2) > 9) {
                    sum += (curDigit * 2) - 9;
                }
                else {
                    sum += curDigit * 2;
                }
            }
            else {
                sum += curDigit;
            }
            doubleUp = !doubleUp
        }
        return (sum % 10) === 0 ? true : false;

    };

    render() {
        const { name, cardNumber, limit, validCard } = this.state,
            isDisabled = (name === "" || cardNumber === "" || limit === "");
        return (
            <div id="form-wrap">
                <h4 id="title">Add</h4>
                <form onSubmit={this.addCardDetails}>
                    Name
                    <br />
                    <input id="name" pattern="^[A-Za-z0-9- ]+$" type="text" value={name} onChange={this.handleChange} />
                    <br /> <br /> 
                    Card number<br />
                    <input id="cardNumber" pattern="[0-9]*" maxLength="10" type="text" value={cardNumber} onChange={this.handleChange} />
                    <label className="alert-label" style={{display: (validCard ? 'none': 'inline')}}>Invalid credit card number</label>
                    <br /><br />
                    Limit<br />
                    <input id="limit" type="number" min="0" value={limit} onChange={this.handleChange} />
                    <br /><br />
                    <button id="submitBtn" disabled={isDisabled} type="submit" value="Submit">Add</button>
                </form>
            </div>
        )
    }
}