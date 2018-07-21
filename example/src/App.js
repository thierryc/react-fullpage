import React, { Component } from 'react'
import Fullpage, { FullpageSection } from '@ap.cx/react-fullpage'
import "babel-polyfill";

export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      backgroundColor: 'coral',
      extraSlide: []
    }
    this.addSlide = this.addSlide.bind(this);
  }

  onChange(e) {
    console.log(e);
  }

  addSlide() {
    const { extraSlide } = this.state;
    const content = <div>
      <h1>New content {extraSlide.length + 1}</h1>
      <p>Lorem ipsum content.</p>
    </div>
    this.setState({
      extraSlide: extraSlide.concat([{content}])
    });
    console.log(this.state);
  }

  render () {

    const { extraSlide } = this.state;

    return (
      <Fullpage
        desktopForceStep={true}
        onChange={this.onChange}
        >

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
            <h1 style={{fontSize: '4em'}}>React Fullpage 0.0.10</h1>
            <h2 style={{fontSize: '2em'}}>Create Fullscreen Scrolling Websites</h2>
            <p>0.0.10: now you can use key <span role="img" aria-label="key up">⬆️</span> and <span role="img" aria-label="key down">⬇️</span> or key <span role="img" aria-label="key down">⬅️</span> and <span role="img" aria-label="key right">➡️</span></p>
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
          <div>
            <h1 style={{fontSize: '4em'}}>2</h1>
            <button onClick={this.addSlide}>addSlide</button>
          </div>
        </FullpageSection>

        {
          extraSlide.map((slide, index) => (
            <FullpageSection style={{
              backgroundColor: 'purple',
              color: 'white',
              padding: '1em',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            key={`extraSlide${index}`}
            >
            <div>{slide.content}</div>
            </FullpageSection>
          ))
        }

        <FullpageSection style={{
          backgroundColor: 'firebrick',
          color: 'white',
          padding: '1em',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div>
            <h1 style={{fontSize: '4em'}}>3</h1>
            <button onClick={this.addSlide}>addSlide</button>
          </div>
        </FullpageSection>

        <FullpageSection style={{
          backgroundColor: 'orange',
          color: 'firebrick',
          height: '80vh',
          padding: '1em',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <h1 style={{fontSize: '2em'}}>4 Small</h1>
        </FullpageSection>

      </Fullpage>
    )
  }
}
