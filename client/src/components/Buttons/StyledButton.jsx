import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
background-color: #66ccff;
width: 15rem;
height: 3rem;
border: none;
border-radius: 10px;
color: white;
text-align: center;
text-decoration: none;
display: inline-block;
font-size: 2rem;
`;

const StyledButton = ({ children, className, onClick }) => {
  return (
    <Button onClick={onClick} className={className}>{children}</Button>
  )
}

export default StyledButton;