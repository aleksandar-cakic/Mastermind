import React from 'react';
import Pegs from './pegs.jsx';
import RowCheck from './rowCheck.jsx';
import Feedback from './Feedback.jsx';
import '../stylesheets/row.css';


const Row = () => (
  <div className='row'>
    <Pegs />
    <Pegs />
    <Pegs />
    <Pegs />
    <RowCheck />
    <Feedback />
  </div>
)

export default Row;