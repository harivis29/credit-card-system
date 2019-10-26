import React, { Component } from 'react';
import { getExistingCards } from "./../api";

export default class Table extends Component {
   constructor(props) {
      super(props)
      this.state = { 
         cards: [
         ]
      }
      this.headers = ["Name", "Card Number", "Balance", "Limit"]
   }

   componentDidMount(){
     getExistingCards( data => {
        this.setState({
           cards: data
        })       
     });
   }

   componentDidUpdate(prevProps){
      if(this.props.status !== prevProps.status){
         getExistingCards( data => {
            this.setState({
               cards: data
            })       
         });
      }     
   }

   displayTableHeader() {
    return this.headers.map((header, index) => {
       return <th key={index}>{header}</th>
    })
 }

   displayTableData() {
    return this.state.cards.map((card, index) => {
       const { name, cardNumber, balance, limit } = card;
       return (
          <tr key={`${cardNumber}_${index}`}>
             <td>{name}</td>
             <td>{cardNumber}</td>
             <td>{balance}</td>
             <td>{limit}</td>
          </tr>
       )
    })
 }

   render() { 
      return (
        <div id="table-wrap">
        <h4>Existing Cards</h4>
           <table id='cards'>
              <tbody>
                 <tr>{this.displayTableHeader()}</tr>
                 {this.displayTableData()}
              </tbody>
           </table>
        </div>
     )
   }
}