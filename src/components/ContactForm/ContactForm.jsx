import React, { Component } from 'react';
import PropTypes from 'prop-types';

import css from './ContactForm.module.css';

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  inputChangeHandle = e => {
    const { value, name } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state);
    this.setState({ name: '', number: '' });
  };

  render() {
    const { handleSubmit, inputChangeHandle } = this;
    const { name, number } = this.state;

    return (
      <form onSubmit={handleSubmit} className={css.form}>
        <label className={css.formLabel}>
          Name
          <input
            className={css.formInput}
            type="text"
            name="name"
            value={name}
            pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            required
            onChange={inputChangeHandle}
            placeholder="Jack Sparrow"
          ></input>
        </label>

        <label className={css.formLabel}>
          Number
          <input
            className={css.formInput}
            type="tel"
            name="number"
            value={number}
            pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
            required
            onChange={inputChangeHandle}
            placeholder="+380 000 000 000"
          ></input>
        </label>

        <button type="submit" className={css.addContactBtn}>
          Add contact
        </button>
      </form>
    );
  }
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default ContactForm;
