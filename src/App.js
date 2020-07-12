import React, { Component } from 'react';
import { v4 as uuid } from 'uuid';
import ContactForm from './components/ContactForm/ContactForm';
import ContactList from './components/ContactList/ContactList';
import Filter from './components/Filter/Filter';

const INITIAL_STATE = {
  name: '',
  number: '',
};

export default class App extends Component {
  state = {
    contacts: [],
    filter: '',
    ...INITIAL_STATE,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({ [name]: value });
  };

  handleSubmit = evt => {
    evt.preventDefault();

    const { name, number, contacts } = this.state;

    if (!contacts.find(e => e.name === name)) {
      this.setState(prevState => ({
        contacts: [
          ...this.state.contacts,
          {
            id: uuid(),
            name: name,
            number: number,
          },
        ],
      }));
      this.reset();
    } else {
      alert(`${name} is already in contacts`);
    }
  };

  handleDelete = evt => {
    evt.preventDefault();
    const id = evt.target.id;
    const contacts = this.state.contacts.filter(e => e.id !== id);
    this.setState({
      contacts: contacts,
    });
  };

  reset = () => {
    this.setState({ ...INITIAL_STATE });
  };

  componentDidMount() {
    if (localStorage.contacts) {
      const contacts = JSON.parse(localStorage.contacts);
      this.setState({
        contacts: contacts,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const { contacts, name, number, filter } = this.state;

    return (
      <div className="container">
        <h1>Phonebook</h1>
        <ContactForm
          name={name}
          number={number}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
        <h2>Contacts</h2>
        <Filter handleChange={this.handleChange} filter={filter} />
        <ContactList
          contacts={contacts}
          filter={filter}
          handleDelete={this.handleDelete}
        />
      </div>
    );
  }
}
