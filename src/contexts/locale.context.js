import React, { Component } from 'react';

export const LocaleContext = React.createContext(null);

const withLocale = Component => props => (
    <LocaleContext.Consumer>
        {
            state => <Component {...props} lang={state} />
        }
    </LocaleContext.Consumer>
);

export { withLocale };