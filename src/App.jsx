import { Button, Dialog } from '@mui/material';
import React, { useState } from 'react';
import Cuestionario  from './components/Cuestionario.jsx';


function App() {
  const [open, setOpen] = useState(false);

  const _handleClick = () => {
    setOpen(true);
  };

  const _handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Cuestionario/>
    </div>
  );
}

export default App;
