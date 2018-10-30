import React from 'react'
import { FullpageSection } from '@ap.cx/react-fullpage'

const Slide3 = () => (
  <FullpageSection style={{
    backgroundColor: '#EBEAE5',
    color: '#05293B',
    height: '80vh',
    padding: '1em',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  }}>

    <h1 style={{
      fontSize: '3.4em',
      letterSpacing: -0.14,
      marginTop: '0.54em',
      marginBottom: '0',
    }}>Use key</h1>

    <div style={{
      maxWidth: 660,
    }}><img style={{
      width: '100%',
    }} src='assets/keys.gif' alt='Next Back keys'/></div>

    <p
      style={{
        marginTop: '0.54em',
      }}
    >You can use key <span role="img" aria-label="key up">⬆️</span> and <span role="img" aria-label="key down">⬇️</span> or key <span role="img" aria-label="key down">⬅️</span> and <span role="img" aria-label="key right">➡️</span></p>

  </FullpageSection>
);

export default Slide3;
