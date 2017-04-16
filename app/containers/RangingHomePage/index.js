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
        let group = [{name: 'harshit', age: 24}, {name: 'nishant', age: 23}, {name: 'harman', age: 24}];

        let someFunc = () => {
            console.log('button1');
        };
        console.log(this.props.RangingHomePage.name);
        console.log(this.props.RangingHomePage);
        //noinspection JSUnresolvedVariable
        return (
            <div style={{fontSize: '14px'}}>

                <FormattedMessage {...messages.header} />
                <TestComponent name={'Nita'} age={23}/>
                {this.props.RangingHomePage.name}
                <Button onClick={someFunc} onMouseOver={someFunc}>Click me!</Button>
                <Button onClick={this.props.onApiFetch}>Ajax Button</Button>
                {group.map(obj => {
                    return (
                        <TestComponent key={Math.random() + Date.now()} name={obj.name} age={obj.age}/>
                    )
                })}

                <table className="table table-bordered table-striped table-hover">
                    <thead>
                    <th>competitor_product_desc</th>
                    <th>retailer</th>
                    <th>asp</th>
                    </thead>
                    <tbody>
                    {(() => {
                        if (this.props.RangingHomePage.data) {
                            console.log('done');
                            return this.props.RangingHomePage.data.map(obj => {
                                return (
                                    <tr key={Math.random() + Date.now()}>
                                    <td>{obj.competitor_product_desc}</td>
                                    <td>{obj.retailer}</td>
                                    <td>{obj.asp}</td>

                                </tr>
                                )
                            })
                        }

                    })()}

                    </tbody>
                </table>
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
