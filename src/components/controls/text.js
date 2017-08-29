import React from 'react';
import PropTypes from 'prop-types';

export class TextInput extends React.Component {
    static propTypes = {
        value: PropTypes.string,
        className: PropTypes.string,
        onChange: PropTypes.func,
        onBlur: PropTypes.func,
    };

    render() {
        const { value, className, onBlur } = this.props;

        return (
            <input type="text"
                   className={className}
                   value={value} onChange={this.onChange}
                   onBlur={onBlur}
            />
        );
    }

    onChange = (event) => {
        const value = event.target.value;
        this.props.onChange(value);
    };

}

export const NumberInput = withInputTransform(TextInput, value => String(value), value => Number(value));

export function withInputTransform(Component, fromValueFn, toValueFn) {
    return class TransformedInput extends React.Component {
        render() {
            const value = fromValueFn(this.props.value);

            return (
                <Component {...this.props} value={value} onChange={this.onChange} />
            );
        }

        onChange = (value) => {
            const changedValue = toValueFn(value);
            this.props.onChange(changedValue);
        };
    }
}
