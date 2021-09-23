import React from 'react';

///THE LOADING OBJECT///
//Used as a loading message for classes fetching items//
export default class LoadingObj extends React.Component {
    render(){
        return(<div className="loading-message">
            <h5>FETCHING ITEMS</h5>
            <p>Please wait a moment...</p>
        </ div>);
    }
}