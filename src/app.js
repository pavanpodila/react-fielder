import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import { Field } from './components/field';
import { TextInput } from './components/controls/text';
import { withBootstrapContainer } from './components/bootstrap-container';
import { SelectControl } from './components/controls/select';

const BootstrapTextInput = withBootstrapContainer(TextInput);
const BootstrapSelect = withBootstrapContainer(SelectControl);

class App extends Component {
    state = {
        text: 'Hello World',
        choice: 'none',
        optionList: [
            { value: '', label: 'Select...' },
            { value: 'option-1', label: 'Option 1' },
            { value: 'option-2', label: 'Option 2' },
            { value: 'option-3', label: 'Option 3' },
        ],
        error: {
            text: null,
            choice: null
        }
    };

    render() {
        const { text, choice, error } = this.state;

        return (
            <div className="App">
                <Field label="Message"
                       visible={true}
                       value={text}
                       error={error.text}
                       onChange={this.onTextChange}>
                    {
                        (props) => (<BootstrapTextInput {...props} />)
                    }
                </Field>

                <Field label="Pick an option"
                       value={choice}
                       error={error.choice}
                       onChange={this.onChoiceChange}
                       onBlur={this.onChoiceBlur}>
                    {
                        (props) => (<BootstrapSelect {...props}
                                                     options={this.state.optionList} />)
                    }
                </Field>
            </div>
        );
    }

    onTextChange = (newValue) => {
        const hasError = (/error/i).test(newValue);
        this.setState({
            text: newValue,
            error: {
                text: hasError ? { message: 'Cannot have error in the text' } : null,
                choice: this.state.error.choice
            }
        });
    };

    onChoiceChange = (newValue) => {
        this.setState({ choice: newValue });
    };

    onChoiceBlur = () => {
        const { choice } = this.state;

        const hasError = choice === '';
        this.setState({
            error: {
                choice: hasError ? { message: 'Must select a value' } : null,
                text: this.state.error.text
            }
        });
    };
}

export default App;
