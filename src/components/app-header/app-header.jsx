import React from 'react';
import './app-header.css';

const AppHeader = () => {
    const title = {
        value: 'My to-do list'
    };
  return (
    <div className="app-header">
      <h1>{title.value}</h1>
    </div>
  );
};

export default AppHeader;
