import React from 'react';
import ReactDOM from 'react-dom';
import * as wasm from 'wasm_lib';
import './main.css';

class Welcome extends React.Component {
    componentDidMount() {
        wasm.greet('Hello World');
    }

    render() {
        return <h1>Hello World from React boilerplate</h1>;
    }
}
ReactDOM.render(<Welcome />, document.getElementById('root'));
