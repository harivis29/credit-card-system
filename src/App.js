import React, { Component } from "react";
import AddCardForm from "./components/AddCardForm";
import Table from "./components/CardsDisplayTable";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      status: "success"
    }
    this.updateStatus = this.updateStatus.bind(this);
  }

  updateStatus(reqState) {
    this.setState({
      status: reqState
    })
  }
  render() {
    return (
      <div className="App">
      <h1>Credit Card System</h1>
      <AddCardForm updateStatus={this.updateStatus} />
      <Table status={this.state.status} />
      </div>
    );
  }
}

export default App;
