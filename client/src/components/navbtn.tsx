import React from "react";

interface NavBtnProps {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const NavBtn: React.FC<NavBtnProps> = (
  {selected, onClick, children}
) => {

  const btnStyles = {
    padding: '10px 15px',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s, color 0.3s, transform 0.3s',
    backgroundColor: selected ? '#000' : 'transparent',
    color: selected ? '#fff' : '#000',
  }

  return (
    <div onClick={onClick} style={btnStyles}>
      {children}
    </div>
  )
};

export default NavBtn;
