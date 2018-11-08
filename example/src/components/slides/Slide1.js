import React from 'react'
import { FullpageSection } from '@ap.cx/react-fullpage'

const Slide1 = () => (
  <FullpageSection style={{
    backgroundColor: '#F5F4F2',
    color: '#05293B',
    height: '80vh',
    padding: '1em',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }}>
    <div>
      <h1 style={{
        fontSize: '3.4em',
        letterSpacing: -0.14,
        marginTop: '0.54em',
        marginBottom: '0.4em',
      }}>React Fullpage</h1>
      <h2 style={{
        fontSize: '1.75em',
        letterSpacing: -0.14,
        marginTop: '0.3em',
        marginBottom: '0.4em',
      }}>Create Fullscreen Scrolling Websites</h2>
      <p>Version 0.1.9-alpha</p>
    </div>
  </FullpageSection>
);

export default Slide1;
