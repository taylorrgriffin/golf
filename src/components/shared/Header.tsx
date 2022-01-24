import React from 'react';
import { Typography } from '@mui/material';

const Header = () => {
  return (
    <div style={styles.container}>
      <Typography variant="h1" component="h1">
        Golf
      </Typography>
      <Typography variant="h4" component="h2">
        A ZAVADIL CARD GAME
      </Typography>
    </div>
  )
}

let styles = {
  container: {
    backgroundColor: 'black',
    width: '100vw',
    textAlign: 'left' as const,
    padding: '10px',
    paddingLeft: '30px',
    color: 'white'
  }
}

export default Header;