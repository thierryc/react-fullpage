import React, { Component } from 'react'

import Fullpage, { FullpageSection } from '@ap.cx/react-fullpage'

export default class App extends Component {
  render () {
    return (
      <Fullpage>
        <FullpageSection style={{
          backgroundColor: 'lime',
          height: '80vh',
          padding: '1em',
        }}>1</FullpageSection>
        <FullpageSection style={{
          backgroundColor: 'coral',
          padding: '1em',
        }}>2</FullpageSection>
        <FullpageSection style={{
          backgroundColor: 'firebrick',
          padding: '1em',
        }}>3</FullpageSection>
      </Fullpage>
    )
  }
}
