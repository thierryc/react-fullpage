import React, { Component } from 'react'
import Fullpage, { FullpageSection } from '@ap.cx/react-fullpage'

export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      backgroundColor: 'coral'
    }
  }

  onChange() {}

  render () {

    return (
      <Fullpage onChange={this.onChange}>
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
          backgroundColor: this.state.backgroundColor,
          color: 'white',
          padding: '1em',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'background-color 1000ms linear',
        }}
        onShow={() => {
          this.setState({
            backgroundColor: 'teal'
          })
        }}
        onHide={() => {
          this.setState({
            backgroundColor: 'coral'
          })
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
