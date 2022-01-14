import React, { useState, useRef } from 'react';
import { StyledButton } from './Buttons/StyledButton.jsx';
import '../stylesheets/input.css';

const Input = ({ colors, handleColorClick, currentColor, currentDiff, id, name }) => {

  return (
    <div className='input'>
      {currentDiff === 'Unfair'
        ? colors.map((color, i) => (
          <div
            key={i}
            className={`circle ${color === currentColor
              ? 'border_checked'
              : 'border_unchecked'}`}
            onClick={handleColorClick}
            value={i}
            id={color}
            name={color}>
          </div>
        ))
        : colors.slice(0, 8).map((color, i) => (
          <div
            key={i}
            className={`circle ${color === currentColor
              ? 'border_checked'
              : 'border_unchecked'}`}
            onClick={handleColorClick}
            value={i}
            id={color}
            name={color}>
          </div>
        ))}
    </div >
  )
}

export default Input;