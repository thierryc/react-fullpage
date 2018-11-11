import React, { Component } from 'react'
import Fullpage, { FullPageSections, FullpageSection, FullpageCount, FullpageNavigation } from '@ap.cx/react-fullpage';
/* polyfills.js */

import 'core-js';

import Slide1 from './components/slides/Slide1';
import Slide2 from './components/slides/Slide2';
import Slide3 from './components/slides/Slide3';

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
    const content = <div>
      <h1><FullpageSection.Number/>. New content</h1>
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
      <React.StrictMode>
        <Fullpage
          desktopForceStep={true}
          onChange={this.onChange}
          >

          <FullpageNavigation/>

          <FullPageSections>
            <Slide1/>
            <Slide2/>
            <Slide3/>

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
