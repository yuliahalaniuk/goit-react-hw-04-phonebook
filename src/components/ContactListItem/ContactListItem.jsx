import React from 'react';
import PropTypes from 'prop-types';

import css from './ContactListItem.module.css';

const ContactListItem = ({ id, name, number, handleDelete }) => (
  <li className={css.contactItem}>
    <span>
      {name}: {number}
    </span>
    <button
      className={css.contactItemBtn}
      type="button"
      onClick={() => {
        handleDelete(id);
      }}
    >
      Delete
    </button>
  </li>
);

ContactListItem.prorTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default ContactListItem;
