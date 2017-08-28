import React from 'react';

export const withBootstrapContainer = (InputControl) => (props) => {

    const { label, error, className } = props;
    const controlClassName = `${className ? className : ''} form-control`;
    const errorClassName = `${error ? 'is-invalid' : ''}`;

    const message = error ? (error.message || 'Invalid value') : '';

    return (
        <div className="form-group">
            <label className="form-control-label">{label}</label>
            <InputControl {...props}
                          className={`${controlClassName} ${errorClassName}`} />

            {
                error
                    ? (<div className="invalid-feedback">{message}</div>)
                    : null
            }

        </div>
    );

};
