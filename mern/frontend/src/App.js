import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(){
    super();
    this.state = {people:[], name:'', city: ''};
    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
    this.delete = this.delete.bind(this);
  }

  componentDidMount(){
    axios.get('http://localhost:4000/people').then(payload =>{
        return this.setState({people: payload.data});
    });
  }

  handleChange(e, type){
    if(type === 'name'){
    this.setState({name: e.target.value});
    }else{
      this.setState({city: e.target.value});
    }
  }

  delete(e,i){
    e.preventDefault();
    axios.delete(`http://localhost:4000/delete/${i}`).then(payload => {
      // console.log(payload.data);
      this.setState({people: payload.data});
    });

  }

  submit(e){
    e.preventDefault();
    axios.post('http://localhost:4000/save', {name:this.state.name, city: this.state.city})
    .then(payload => this.setState({people: payload.data, name: '', city:''}));
  }

  render() {
    let list = this.state.people.map((person,i) =>{
      return <li key={i}>Name: {person.name}, City: {person.city} <button onClick={(e) => this.delete(e, i)}>Delete</button></li>;
    });
    return (
      <div>
      <h1>List of people</h1>
      <ul>
        {list}
      </ul>
      <h1>Add person</h1>
      <form onSubmit={(e) => this.submit(e)}>
        <input onChange={(e) => this.handleChange(e,'name')} value={this.state.name} placeholder="name"/>
        <input onChange={(e) => this.handleChange(e, 'city')} value={this.state.city} placeholder="city"/>
        <input type="submit"/>
      </form>
      </div>
    );
  }
}

export default App;
