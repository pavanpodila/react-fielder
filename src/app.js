import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import { Field } from './components/field';
import { TextInput } from './components/controls/text';
import { withBootstrapContainer } from './components/bootstrap-container';

const BootstrapTextInput = withBootstrapContainer(TextInput);

class App extends Component {
    state = {
        text: 'Hello World',
        error: null
    };

    render() {
        return (
            <div className="App">
                <Field label="Message"
                       visible={true}
                       value={this.state.text}
                       error={this.state.error}
                       onChange={this.onInputChange}>
                    {
                        (props) => (<BootstrapTextInput {...props} />)
                    }
                </Field>
            </div>
        );
    }

    onInputChange = (newValue) => {
        const hasError = (/error/i).test(newValue);
        this.setState({ text: newValue, error: hasError });
    };
}

export default App;
