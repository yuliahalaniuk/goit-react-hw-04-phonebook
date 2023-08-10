import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import css from './App.module.css';

import ContactForm from '../ContactForm/ContactForm';
import ContactList from '../ContactList/ContactList';
import Filter from '../Filter/Filter';

const LS_CONTACTS = 'contacts_list';

const INITIAL_CONTACTS = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

const App = () => {
  const [filter, setFilter] = useState('');
  const [contacts, setContacts] = useState(() => {
    const savedContacts = localStorage.getItem(LS_CONTACTS);

    return savedContacts ? JSON.parse(savedContacts) : INITIAL_CONTACTS;
  });

  const addNewContact = ({ name, number }) => {
    contacts.find(contact => contact.name === name)
      ? alert(`${name} is already in your contacts.`)
      : setContacts(prevState => [
          ...prevState,
          { name, number, id: nanoid() },
        ]);
  };

  const handleDelete = deleteID => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== deleteID)
    );
  };

  const handleFilterChange = e => {
    setFilter(e.currentTarget.value);
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  useEffect(() => {
    localStorage.setItem(LS_CONTACTS, JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div className={css.container}>
      <div className={css.wrapper}>
        <h1 className={css.phonebookTitle}>Phonebook</h1>
        <ContactForm onSubmit={addNewContact} />

        <h2 className={css.contactListTitle}>Contacts</h2>

        <Filter filter={filter} handleFilterChange={handleFilterChange} />
        <ContactList
          contactList={getVisibleContacts()}
          handleDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default App;
