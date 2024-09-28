import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import NavBar from './navbar-stateless';
import DrawerList from '../sidebar/sidebar'; 

export default function NavBarStateful() {
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
