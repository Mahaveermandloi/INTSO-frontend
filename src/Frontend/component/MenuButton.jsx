// MenuButton.js
import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';

const MenuButton = ({ onClick }) => {
  return (
    <div className="lg:hidden">
      <button onClick={onClick}>
        <MenuIcon />
      </button>
    </div>
  );
};

export default MenuButton;
