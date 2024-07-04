import React from 'react';
import './Tooltip.css'
const Tooltip = ({ text, children }) => {
  return (
    <div className="tooltip">
      {children}
      <span className="tooltip-text">{text}</span>
    </div>
  );
}

export default Tooltip;