# noahehall/react-fullerpage

typescript first

## Features

- Design for Mobile, Tablet, and Desktop
- Nested Component (simple to use)
- Hide safari's header on Scroll on iphone and ipad
- Hide Google Chrome's header on Scroll on iOS and Android
- Drived by the scroll
- CSS animation
- GPU/CPU swtich
- Very Small ( ~ 25kB )
- MIT License (no fullpage.js dependency)

> Create Fullscreen Scrolling Websites

## Install

```bash
bun add react-fullerpage
```
## Usage

```jsx

import {ReactFP, FPContainer, FPItem } from 'react-fullerpage'

export const App = () => (
  <ReactFP>
    <FPContainer>
      <FPItem style={{
        backgroundColor: 'lime',
        height: '80vh',
        padding: '1em',
      }}>1</FPItem>

      <FPItem style={{
        backgroundColor: 'coral',
        padding: '1em',
      }}>2</FPItem>

      <FPItem style={{
        backgroundColor: 'firebrick',
        padding: '1em',
      }}>3</FPItem>
    </FPContainer>
  </ReactFP>
)

```

## License (MIT)

```
WWWWWW||WWWWWW
 W W W||W W W
      ||
    ( OO )__________
     /  |           \
    /o o|    MIT     \
    \___/||_||__||_|| *
         || ||  || ||
        _||_|| _||_||
       (__|__|(__|__|
```

MIT © [thierryc](https://github.com/thierryc)
Copyright (c) 2018-present anotherplanet.io, hello@anotherplanet.io

## Hit me up on Twitter

[@Autre_planete](https://twitter.com/Autre_planete?ref=github)
