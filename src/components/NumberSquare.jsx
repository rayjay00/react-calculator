import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledSquare = styled.div`
  padding: 1rem;
  text-align: center;
  font-weight: bold;
  font-weight: bold;
  background-color: #8b2635;
  ${props =>
    props.num === '=' || props.num === 'Clear' ? `width: 100%` : `flex: 1 20%`};
`;

const NumberSquare = ({ addNum, num }) => {
  return (
    <StyledSquare num={num} onClick={() => addNum(num)}>
      {num === '=' ? 'Calculate' : num}
    </StyledSquare>
  );
};

NumberSquare.propTypes = {
  addNum: PropTypes.func.isRequired,
  num: PropTypes.number.isRequired
};

export default NumberSquare;
