import React from 'react';
import { StyledButton } from './Buttons/StyledButton.jsx';
import '../stylesheets/input.css'

const Input = ({ colors, handleColorClick }) => (
  <div className='input'>
    {colors.map((color, i) => (
      <div key={i} className='circle' onClick={handleColorClick} value={i} id={color}></div>
    ))}
  </div>
);

export default Input;