import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledTotal = styled.p`
  padding: 1.25rem;
  width: 100%;
  background: black;
  color: white;
  text-align: right;
  font-size: 20px;
  margin: 0;
  background-color: black;
`;

const Total = ({ currentNums, total, checked }) => {
  return (
    <StyledTotal>
      {total.length === 1 && checked
        ? total
        : [currentNums.length ? currentNums : 0]}
    </StyledTotal>
  );
};

Total.propTypes = {
  currentNums: PropTypes.array.isRequired,
  total: PropTypes.array.isRequired,
  checked: PropTypes.bool.isRequired
};

export default Total;
