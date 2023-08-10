import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import css from './App.module.css';

import ContactForm from '../ContactForm/ContactForm';
import ContactList from '../ContactList/ContactList';
import Filter from '../Filter/Filter';

const INITIAL_STATE = {
  contacts: [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ],
  filter: '',
};

const LS_CONTACTS = 'contacts_list';

class App extends Component {
  state = INITIAL_STATE;

  addNewContact = ({ name, number }) => {
    const newContact = {
      name,
      number,
      id: nanoid(),
    };

    this.state.contacts.find(contact => contact.name === newContact.name)
      ? alert(`${newContact.name} is already in your contacts.`)
      : this.setState(prevState => ({
          contacts: [...prevState.contacts, newContact],
        }));
  };

  handleDelete = deleteID => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(contact => contact.id !== deleteID),
      };
    });
  };

  handleFilterChange = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getVisibleContacts = () => {
    const normalizedFilter = this.state.filter.toLowerCase();
    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem(LS_CONTACTS, JSON.stringify(this.state.contacts));
    }
  }

  componentDidMount() {
    const savedContacts = localStorage.getItem(LS_CONTACTS);

    if (savedContacts) {
      this.setState({ contacts: JSON.parse(savedContacts) });
    }
  }

  render() {
    const {
      addNewContact,
      handleFilterChange,
      handleDelete,
      getVisibleContacts,
    } = this;
    const { filter } = this.state;

    const visibleContacts = getVisibleContacts();

    return (
      <div className={css.container}>
        <div className={css.wrapper}>
          <h1 className={css.phonebookTitle}>Phonebook</h1>
          <ContactForm onSubmit={addNewContact} />

          <h2 className={css.contactListTitle}>Contacts</h2>

          <Filter filter={filter} handleFilterChange={handleFilterChange} />
          <ContactList
            contactList={visibleContacts}
            handleDelete={handleDelete}
          />
        </div>
      </div>
    );
  }
}

export default App;
