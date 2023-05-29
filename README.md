# react-fullerpage

- typescript first via bun.sh
- original work by [thierryc](https://github.com/thierryc)
- dependencies
  - [react-fullscreen](https://github.com/snakesilk/react-fullscreen)
  - [framer-motion](https://github.com/framer/motion/tree/main/packages/framer-motion)

## Install

```bash
bun add git@github.com:noahehall/react-fullerpage.git
```

## Usage

```jsx
/**
 * FYI-1: all elements take a motionProps={any motion prop}
 * please check the source, or submit a PR if you want to document the source
 *
 * FYI-2: you need to set backgroundColor for fullscreen mode
 * else it goes black, dunno, ignoring
 */
import {ReactFP, FPContainer, FPItem } from 'react-fullerpage'

export const App = () => (
  <ReactFP>
    <FPContainer>
      <FPItem style={{
        backgroundColor: 'lime',
        height: '80vh', // defaults to 100vh
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
