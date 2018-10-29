import React, { Component, Fragment } from 'react'
import Fullpage, { FullPageSections, FullpageSection, FullpageCount, FullpageNavigation } from '@ap.cx/react-fullpage'
import "babel-polyfill";

export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      backgroundColor: '#05293B',
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
    const content = <Fragment>
      <h1><FullpageSection.Number/>. New content</h1>
      <p>Lorem ipsum content.</p>
    </Fragment>
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
      <React.StrictMode>
        <Fullpage
          desktopForceStep={true}
          onChange={this.onChange}
          >

          <FullpageNavigation
            style={{

            }}
          />

          <FullPageSections>
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
                <p>Version 0.1.4-alpha</p>
              </div>
            </FullpageSection>

            <FullpageSection style={{
              backgroundColor: '#EBEAE5',
              color: '#05293B',
              height: '100vh',
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
                }}>Create a Fullpage beautiful mobile website</h1>
              </div>
            </FullpageSection>

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
              }} src='/assets/keys.gif' alt='Next Back keys'/></div>

              <p
                style={{
                  marginTop: '0.54em',
                }}
              >You can use key <span role="img" aria-label="key up">⬆️</span> and <span role="img" aria-label="key down">⬇️</span> or key <span role="img" aria-label="key down">⬅️</span> and <span role="img" aria-label="key right">➡️</span></p>

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
                backgroundColor: '#266B8C'
              })
            }}
            onHide={() => {
              this.setState({
                backgroundColor: '#05293B'
              })
            }}>
              <div>
                <h1 style={{fontSize: '4em'}}>Events</h1>
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
                {slide.content}
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
      </React.StrictMode>
    )
  }
}
