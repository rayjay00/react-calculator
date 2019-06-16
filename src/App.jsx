import React, { useState } from 'react';
import * as math from 'mathjs';
import './App.css';
import { createGlobalStyle } from 'styled-components';
import Container from './components/Container';
import Total from './components/Total';
import NumberSquare from './components/NumberSquare';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #efefef;
    font-family: 'Play', sans-serif;
    font-size: 1.25rem;
    color: white;
  }
`;

const App = () => {
  const [entry, setEntry] = useState([]);
  const [total, setTotal] = useState([]);
  const [checked, setChecked] = useState(false);

  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  // unsafe operations are ones that will cause an error if the
  const unsafeOperations = ['/', '*', '.'];
  const safeOperations = ['+', '-'];

  const allOperations = [...safeOperations].concat([...unsafeOperations]);

  const handleClick = num => {
    // adjust the num
    const mostRecentInput = total[total.length - 1];
    const previousOperation = unsafeOperations.indexOf(num) > -1;
    const currentOperation = unsafeOperations.indexOf(mostRecentInput) > -1;
    // now we check them
    if (previousOperation && currentOperation) {
      if (
        (num === '+' || num === '-') &&
        (mostRecentInput === '-' || mostRecentInput === '+')
      ) {
        setEntry([...entry, num]);
        setTotal([...total, num]);
      } else if (
        (num === '+' || num === '-') &&
        (mostRecentInput === '*' || mostRecentInput === '/')
      ) {
        setEntry([...entry, num]);
        setTotal([...total, num]);
      } else {
        entry.pop();
        total.pop();
        setEntry([...entry, num]);
        setTotal([...total, num]);
      }
    } else if (!total.length && (num === '/' || num === '*')) {
      // if we start with an operation other than + or -, we don't want to remove it
      console.error('please enter a valid input - thanks!');
    } else {
      setEntry([...entry, num]);
      setTotal([...total, num]);
    }
  };

  const handleClear = () => {
    setEntry([]);
    setTotal([]);
  };

  // rather than showing every calculation on input, we want to use the equal sign to toggle displaying what's been calculated
  const handleCalculated = () => {
    // If the most recently entered item isn't a symbol, calculate the number
    // By not doing this, subsequent entries of items after initial checking (without hitting clear)
    // will display all previous operations. ex: 14+7 instead of 2+12+7

    if (!isNaN(Number(entry[entry.length - 1])) && entry.length > 0) {
      setTotal([math.eval(entry.join(''))]);
      // setTotal([])
      setEntry([math.eval(entry.join(''))]);
      setChecked(true);
    } else {
      console.error(
        `The end of input must be a number. You might also see this error because you haven't entered any numbers.`
      );
    }
  };

  const displayButtons = (arr, func) => {
    return arr.map(item => {
      return (
        <NumberSquare
          key={item}
          num={item}
          addNum={item === '=' ? handleCalculated : func}
        />
      );
    });
  };

  return (
    <React.Fragment>
      <GlobalStyle />
      <Container main="true">
        <Total currentNums={entry} total={total} checked={checked} />
        <NumberSquare addNum={handleClear} num="Clear" />
        <Container>
          <Container nums="true">
            {displayButtons(numbers, handleClick)}
          </Container>
          <Container operations={true} column={true}>
            {displayButtons(allOperations, handleClick)}
          </Container>
        </Container>
        <NumberSquare addNum={() => handleCalculated(entry)} num="=" />
      </Container>
    </React.Fragment>
  );
};

export default App;
