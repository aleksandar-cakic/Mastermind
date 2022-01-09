import React from 'react';
import { StyledButton } from './Buttons/StyledButton.jsx';
import '../stylesheets/input.css'

const Input = ({ colors, handleColorClick, currentColor }) => (
  <div className='input'>
    {colors.map((color, i) => (
      <div key={i} className={`circle ${color === currentColor ? 'border_checked' : 'border_unchecked'}`}  onClick={handleColorClick} value={i} id={color}></div>
    ))}
  </div>
);

export default Input;