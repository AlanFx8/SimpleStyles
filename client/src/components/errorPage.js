import React from 'react';

export default class ErrorPage extends React.Component {
    render(){
        return(<div id="main-content-wrapper">
            <h1>ERROR 404</h1>
            <p>Page Not Found</p>
            <button
                className="continue-shopping-btn"
                type="button"
                onClick={ () => this.props.history.goBack() }
            >
                Go Back
            </button>
        </div>);
    }
}