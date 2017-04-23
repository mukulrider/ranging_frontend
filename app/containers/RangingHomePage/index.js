/*
 *
 * RangingHomePage
 *
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {FormattedMessage} from 'react-intl';
import {createStructuredSelector} from 'reselect';
import makeSelectRangingHomePage from './selectors';
import messages from './messages';
import TestComponent from 'components/TestComponent';
import Button from 'components/button';
import Spinner from 'components/spinner';

import {
    apiFetch
} from './actions';


export class RangingHomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    render() {
        return (
            <div style={{fontSize: '14px'}}>

              <b style={{textAlign:'center'}}>Welcome to Ranging Modulue! <br/>Please select options on the bottom of the page to get started.</b>

            </div>
        );
    }
}

RangingHomePage.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    RangingHomePage: makeSelectRangingHomePage(),
});

function mapDispatchToProps(dispatch) {
    return {
        onApiFetch: (e) => dispatch(apiFetch(e))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RangingHomePage);
