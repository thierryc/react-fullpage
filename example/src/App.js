import React, { Component } from 'react'
import Fullpage, { FullpageSection } from '@ap.cx/react-fullpage'

export default class App extends Component {
  render () {

    return (
      <Fullpage onChange={console.log}>
        <FullpageSection style={{
          backgroundColor: 'lime',
          color: 'darkGreen',
          height: '80vh',
          padding: '1em',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div>
            <h1 style={{fontSize: '4em'}}>React Fullpage</h1>
            <h2 style={{fontSize: '2em'}}>Create Fullscreen Scrolling Websites</h2>
          </div>
        </FullpageSection>
        <FullpageSection style={{
          backgroundColor: 'coral',
          color: 'white',
          padding: '1em',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <h1 style={{fontSize: '4em'}}>2</h1>
        </FullpageSection>
        <FullpageSection style={{
          backgroundColor: 'firebrick',
          color: 'white',
          padding: '1em',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <h1 style={{fontSize: '4em'}}>3</h1>
        </FullpageSection>
      </Fullpage>
    )
  }
}
