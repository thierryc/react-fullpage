import React, { Component } from 'react'
import Fullpage, { FullPageSections, FullpageSection, FullpageCount, FullpageNavigation } from '@ap.cx/react-fullpage'
import "babel-polyfill";

export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      backgroundColor: 'coral',
      extraSlide: []
    }
    this.addSlide = this.addSlide.bind(this);
    this.removeSlide = this.removeSlide.bind(this);
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

  removeSlide() {
    const { extraSlide } = this.state;
    this.setState({
      extraSlide: extraSlide.slice(0, -1)
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

          <FullpageNavigation
            style={{
              backgroundColor: 'orange',
              position: 'fixed',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          />

          <FullPageSections>
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
                <p>Version 0.1.3-alpha</p>
              </div>
            </FullpageSection>

            <FullpageSection style={{
              backgroundColor: 'lime',
              color: 'darkGreen',
              height: '100vh',
              padding: '1em',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <div>
                <h1 style={{fontSize: '4em'}}>Image</h1>
              </div>
            </FullpageSection>

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
                <h1 style={{fontSize: '4em'}}>Use key</h1>
                <p>You can use key <span role="img" aria-label="key up">⬆️</span> and <span role="img" aria-label="key down">⬇️</span> or key <span role="img" aria-label="key down">⬅️</span> and <span role="img" aria-label="key right">➡️</span></p>
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
                <h1 style={{fontSize: '4em'}}><FullpageSection.Number/></h1>
                <button onClick={this.addSlide}>addSlide</button>
                <p style={{ fontSize: '2em'}}>Page <FullpageSection.Number style={{ fontSize: '3em'}}/> / <FullpageCount style={{ fontSize: '1em'}}/></p>
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
                <h1 style={{fontSize: '4em'}}><FullpageSection.Number/></h1>
                <button onClick={this.addSlide}>addSlide</button>
                <button onClick={this.removeSlide}>removeSlide</button>
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
            <h1 style={{fontSize: '2em'}}><FullpageSection.Number/> Small</h1>
            </FullpageSection>

          </FullPageSections>
        </Fullpage>
    )
  }
}
