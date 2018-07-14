# @ap.cx/react-fullpage

https://thierryc.github.io/react-fullpage/

0.0.8 Alpha Version. **Not for production**.

Try "features/variableHeight" branch. 

https://github.com/thierryc/react-fullpage/tree/features/variableHeight

## Features

- Simple
- Mobile ready
- Hide safari's header on Scroll on iphone and ipad
- Drived by the scroll
- CSS animation
- GPU/CPU swtich
- Very Small

> Create Fullscreen Scrolling Websites

[![NPM](https://img.shields.io/npm/v/@ap.cx/react-fullpage.svg)](https://www.npmjs.com/package/react-fullpage) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save @ap.cx/react-fullpage
```

## Usage

```jsx
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

```

## Thanks

Special thanks to [BrowserStack](https://www.browserstack.com/users/sign_up) for sponsoring this plugin. 👍

[![Browserstack](https://raw.githubusercontent.com/thierryc/react-fullpage/master/static/images/browserstack@2x.png)](https://www.browserstack.com/users/sign_up)

## License

MIT © [thierryc](https://github.com/thierryc)
