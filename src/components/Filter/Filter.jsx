import React from 'react';
import PropTypes from 'prop-types';
import css from './Filter.module.css';

const Filter = ({ filter, handleFilterChange }) => (
  <label className={css.filterTitle}>
    Filter
    <input
      className={css.filterInput}
      type="text"
      value={filter}
      onChange={handleFilterChange}
    ></input>
  </label>
);

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  handleFilterChange: PropTypes.func.isRequired,
};

export default Filter;
