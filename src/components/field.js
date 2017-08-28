import React from 'react';
import PropTypes from 'prop-types';

export class Field extends React.Component {

    static defaultProps = {
        value: null,
        onChange: null,
        onBlur: null,
        error: null,
        visible: true,
        disabled: false,
        children: EmptyInputComponent,
    };

    static propTypes = {
        label: PropTypes.string,
        value: PropTypes.any.isRequired,
        onChange: PropTypes.func.isRequired,
        onBlur: PropTypes.func,
        error: PropTypes.shape({
            message: PropTypes.string
        }),
        visible: PropTypes.bool,
        disabled: PropTypes.bool,
        children: PropTypes.func.isRequired,
    };

    render() {
        const {
            label, value,
            onChange, onBlur,
            error, visible, disabled,
        } = this.props;

        if (!visible) {
            return null;
        }

        const inputProps = {
            label, value,
            onChange, onBlur,
            error, disabled,
        };

        return this.props.children(inputProps);
    }

}

function EmptyInputComponent() {
    return (
        <div className="alert alert-danger">
            You have not supplied any input <strong>component</strong>
            <div>
                Pass in a <i>function</i> as the only child.
            </div>
        </div>
    );
}
