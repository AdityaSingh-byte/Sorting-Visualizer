import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import NavBar from '../../stateless/navbar/navbar-stateless';
import DrawerList from '../../stateless/sidebar/sidebar'; 

export default function NavBarStatful() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => {
    setOpen(newOpen); 
    
  };

  return (
    <div>
      <NavBar toggleDrawer={toggleDrawer} />
      <Drawer open={open}onClose={() => toggleDrawer(false)}>
        <DrawerList toggleDrawer={toggleDrawer} />
      </Drawer>
    </div>
  );
}
