import React from 'react';
import { TestButton } from './Buttons/TestButton.jsx';
import styled from 'styled-components'

const ModifiedButton = styled(TestButton)`
font-size: 2rem;
`;

const Rules = () => (
  <div className='rules'>
   <ModifiedButton>New Game</ModifiedButton>
   <ModifiedButton>Rules</ModifiedButton>
   <div className='difficulty'>Difficulty: Easy, Normal, Hard, Unfair</div>
   <div className='score'>Won: 0 Lost: 0</div>
   <div className='timer'>Timer: 15 sec</div>
  </div>
);

export default Rules;