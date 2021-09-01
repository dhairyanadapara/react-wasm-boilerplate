# react-wasm-boilerplate

Hey everyone, I was curious about the wasm from last few year because of rust-lang. I have started to learn the rust from long time and I was looking for using it some where for learning purpose. As I have most of the work in javascript and react, I was looking if I can do something in same domain.

I searched about the use-cases and found out that it can be used as web binary. I have tried some blogs but usually found it with only js or if it's with react, It will require to use rewire to update the webpack. I want to do something basic with custom setup.

I have tried to create the steps to create the custom setup for React + Webpack + Wasm. Hope it will help you. Happy Coding.

Source code: <https://github.com/dhairyanadapara/react-wasm-boilerplate>

## Directory setup

Let's first start with basic thing which are required. We will create the directory and setup version control and JS package manager.

### Create new dir

```bash
mkdir react-wasn-tutorial && cd react-wasn-tutorial
```

### Init npm

I have used npm as package manager

```bash
npm init
```

### Init git

I have used git for version control.

```bash
git init
```

## React and Webpack Setup

Now our directory is setup is completed with package manager and version control. Let's start with React setup first and then we will move to Webpack. We will add basic dependencies for react and webpack

### Install react dependencies

```bash
npm install react react-dom --save
```

### Setup HTML boilerplate

Create `public` directory in root and create `index.html` inside. It should have one div with "root" id as default id for react root. If you want you can have other name but you will have to use same name in react root.

```html
<!DOCTYPE html>
<html>
  <head>
    <title>My React Configuration Setup</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

### Create root component

If you have used CRA you might have know that all the files and components are written inside `src` directory. We will do the same. Create src directory and create out root file `index.jsx`

```bash
mkdir src && cd src && touch index.js
```

### Create react component

Create react component in root file

```javascript
import React from 'react';
import ReactDOM from 'react-dom';

class Welcome extends React.Component {
  render() {
    return <h1>Hello World from React boilerplate</h1>;
  }
}
ReactDOM.render(<Welcome />, document.getElementById('root'));
```

### Configure webpack 5

Now we will setup the webpack to create build and run the application. First we will install dependencies for webpack and babel.

```bash
npm install --save-dev webpack webpack-dev-server webpack-cli
npm install --save-dev @babel/core @babel/preset-env @babel/preset-react babel-loader @babel/runtime @babel/plugin-transform-runtime
```

### Create webpack.config.js

Create `webpack.config.json`. We will add few configuration in file.

- entry - It's the entry point to JS files for building the build.
- output - It the output directory for build and build name
- devServer - settings for running dev server
- modules - rules for transcompiling the JS to ES2015 for browser compatibility

```javascript
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  devServer: {
    static: './build',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
};
```

### Create `.babelrc`

Babel is a toolchain that is mainly used to convert ECMAScript 2015+ code into a backwards compatible version of JavaScript in current and older browsers or environments.

Create configuration for babel in root directory

```json
{
  "presets": ["@babel/preset-env", "@babel/preset-react"],
  "plugins": [["@babel/transform-runtime"]]
}
```

#### Update `package.json` script to run the project

Add script for running the webpack with npm script

```json
"scripts": {
    "start": "webpack serve --mode development --hot",
}
```

### Add eslint and prettier dependencies

### Install and Configure Prettier

```bash
npm install --save-dev --save-exact prettier
```

#### Create `.prettierrc`

```json
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "es5"
}
```

#### Add script in `package.json`

```json
"scripts": {
 "format": "prettier --write \"src/**/*.js\""
},
```

### Add source map for debugging

```js
// webpack.config.js
module.exports = {
  devtool: 'inline-source-map',
  // … the rest of the config
};
```

### Setting ESLint

```bash
npm --save-dev install eslint eslint-loader babel-eslint eslint-config-react eslint-plugin-react

```

#### Update webpack

```javascript
module.exports = {
  // modify the module
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader'], // include eslint-loader
      },
    ],
  },
};
```

#### Create `.eslintrc`

```json
{
  "parser": "babel-eslint",
  "extends": "react",
  "env": {
    "browser": true,
    "node": true
  },
  "settings": {
    "react": {
      "version": "detect"
    }
  },
  "rules": {
    "space-before-function-paren": ["off", "always"]
  }
}
```

#### Update `package.json` scripts

```json
"scripts": {
  "eslint-fix": "eslint --fix \"src/**/*.js\"",
  "build": "webpack --mode production",
  "watch": "webpack --watch --mode development",
},
```

### Add html-webpack-plugin

```bash
npm install html-webpack-plugin --save-dev
```

```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: //…
  output: {
    //…
  },
  devServer: {
    static: "./build",
  },
  module: {
    //…
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve('./public/index.html'),
    }),
  ]
};
```

### Configure css

```bash
npm install --save-dev css-loader style-loader
```

### Update webpack configuration

```javascript
module.exports = {
    ...
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: [/node_modules/, /build/],
                use: ['babel-loader', 'eslint-loader']
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    ...
};
```

### create and import css to file

```bash
touch src/main.css
```

```css
body {
  background: red;
}
```

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import './main.css';

...
```

### Run build

```bash
npm run build
```

### For hot reloading run 2 command in different terminals

```bash
npm run start
```

```bash
npm watch
```

## Setup Rust web assembly

### Create Rust library

```bash
cargo new --lib wasm-lib --vcs none --edition 2018
cd wasm-lib
```

You will find some tests in `lib.rs`

```rust
#[cfg(test)]
mod tests {
    #[test]
    fn it_works() {
        assert_eq!(2 + 2, 4);
    }
}
```

Let remove the test code and write some code.

First import the `wasm-bindgen`. It's required for communication between rust and JS

```rust
use wasm_bindgen::prelude::*;
```

Now we will try to execute the JS `alert` from rust library. `extern` statement tells Rust that we want to call some externally defined functions.

Add public function named `greet`, which is exposed to Javascript. Add alert with `Hello world` string.

```rust
#[wasm_bindgen]
extern {
    pub fn alert(s: &str);
}

#[wasm_bindgen]
pub fn greet(name: &str) {
    alert(&format!("Hello, {}!", name));
}
```

We have written the code but adding dependencies to Cargo.toml is still required. Update the Cargo.toml with required keys

```toml
[package]
name = "wasm-lib"
version = "0.1.0"
authors = ["Your Name <you@example.com>"]
description = "A sample project with wasm-pack"
license = "MIT/Apache-2.0"
repository = "https://github.com/yourgithubusername/wasm-lib"
edition = "2018"

[lib]
crate-type = ["cdylib"]

[dependencies]
wasm-bindgen = "0.2"
```

For more info you can refer this article
<https://developer.mozilla.org/en-US/docs/WebAssembly/Rust_to_wasm>

### Build the package

```bash
wasm-pack build --target bundler --out-dir ../build
```

Add the command to `package.json`

```json
 "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "watch": "webpack --watch --mode development",
    "start": "webpack serve --mode development --hot",
    "format": "prettier --write \"src/**/*.js\"",
    "eslint-fix": "eslint --fix \"src/**/*.js\"",
    "build": "webpack --mode production",
    "build:wasm": "cd wasm-lib && wasm-pack build --target bundler --out-dir ../node_modules"
  },
```

### Import and use wasm package

```javascript
import React from 'react';
import * as wasm from 'wasm_lib';

class Welcome extends React.Component {
  componentDidMount() {
    wasm.greet('Hello World');
  }

  render() {
    return (
      <div className="container">
        <h1 className="test">Hello World from React boilerplate</h1>
        <h2 className="test1">Dhairya Nadapara</h2>
      </div>
    );
  }
}

export default Welcome;
```

### Enable experimental features in webpack

```javascript
module.exports = {
    ...
    experiments: {
        executeModule: true,
        outputModule: true,
        syncWebAssembly: true,
        topLevelAwait: true,
        asyncWebAssembly: true,
        layers: true,
        lazyCompilation: true
    }
};
```

Restart the server. Popup will be shown on load

To run the app execute:

```bash
1. npm run build:wasm(In case you want to build lib again)
2. npm run watch
3. npm run start
```

Note:
This is not the perfect setup for the production app. There are many changes required. I will try to improve this overtime and will update you with new post :)

Reference:

- React-setup: <https://www.freecodecamp.org/news/how-to-set-up-deploy-your-react-app-from-scratch-using-webpack-and-babel-a669891033d4/>
- Rust-wasm: <https://developer.mozilla.org/en-US/docs/WebAssembly/Rust_to_wasm>
