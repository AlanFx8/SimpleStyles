import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { searchProducts, sortSearchResults, filterSearchResults }
from '../redux/actions/searchActions';
import ProductListPageContent from './sub/productListPageContent';

class SearchPage extends React.Component {
    //START//
    componentDidMount(){
        this.props.searchProducts(this.props.match.params.query);
    }

    //RENDER//
    render(){
        return (
            <ProductListPageContent
                reducerData = { this.props.searchReducer}
                sortAction = { this.props.sortSearchResults }
                filterAction = { this.props.filterSearchResults }
            />
        );
    }
}

//REDUX-RELATED//
SearchPage.propTypes = {
    searchProducts: PropTypes.func.isRequired,
    sortSearchResults: PropTypes.func.isRequired,
    filterSearchResults: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    searchReducer: state.searchReducer
});

export default connect(mapStateToProps,
    { searchProducts, sortSearchResults, filterSearchResults })(SearchPage);