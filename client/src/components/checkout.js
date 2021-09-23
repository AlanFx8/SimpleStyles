import React from 'react';

export default class Checkout extends React.Component {
    render(){
        return(
            <div id="main-content-wrapper">
                <h1>PURCHASE ORDERED</h1>
                <p>Thank you for your purchase.</p>
                <button
                className="continue-shopping-btn"
                type="button"
                onClick={ () => this.props.history.push("/") }
                >
                    Continue Shopping
                </button>
            </div>
        );
    }
}