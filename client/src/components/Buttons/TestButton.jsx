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

export const TestButton = ({ children, className }) => {
  return <Button className={className}>{children}</Button>
}