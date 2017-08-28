import React from 'react';
import PropTypes from 'prop-types';

export class SelectControl extends React.Component {
    static propTypes = {
        onChange: PropTypes.func.isRequired,
        onBlur: PropTypes.func,
        value: PropTypes.string.isRequired,
        error: PropTypes.shape({
            message: PropTypes.string
        }),
        options: PropTypes.arrayOf(PropTypes.shape({
            value: PropTypes.string,
            label: PropTypes.string
        })).isRequired
    };

    render() {
        const { value, options, onBlur, className } = this.props;

        return (
            <select onChange={this.onChange}
                    onBlur={onBlur}
                    value={value}
                    className={className}>
                {
                    options.map(({ label, value }) => {
                        return (
                            <option key={value} value={value}>{label}</option>
                        );
                    })
                }
            </select>
        );
    }

    onChange = (event) => {
        this.props.onChange(event.target.value);
    };

}

