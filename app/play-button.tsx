import React from 'react';
import PropTypes from 'prop-types';
import styles from './RoundedButton.module.css'; // Import CSS module

const RoundedButton = ({  className }) => {
  return (
    <button className={`${styles['rounded-button']} ${className}`}>
      Play
    </button>
  );
};


RoundedButton.defaultProps = {
  className: '',
};

export default RoundedButton;
