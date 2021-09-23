import React from 'react';

///THE ERROR OBJECT///
//Used as an error message for classes fetching items//
//It is not the 404 Error Page
export default class ErrorObj extends React.Component {
    render(){
        return(<div className="error-message">
            <h5>ERROR</h5>
            <p>Sorry, there has been an error.<br />
            Message: {this.props.message }</p>
        </ div>);
    }
}