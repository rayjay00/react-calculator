import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledContainer = styled.section`
  ${props => (props.main ? `margin: 5vh auto` : `margin: 0 auto`)};
  display: flex;
  flex-flow: ${props => (props.column ? `column` : `row wrap`)};
  width: ${props => (props.column ? `100%` : `300px`)};
  justify-content: space-between;
  ${props => props.column && `flex: 1 10%`};
  ${props => props.nums && `flex: 1 50%`};
  ${props => props.main && `border-radius: 15px`};
`;

const Container = ({ main, column, nums, children }) => {
  return (
    <StyledContainer main={main} column={column} nums={nums}>
      {children}
    </StyledContainer>
  );
};

Container.propTypes = {
  main: PropTypes.string.isRequired,
  column: PropTypes.bool.isRequired,
  nums: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired
};

export default Container;
