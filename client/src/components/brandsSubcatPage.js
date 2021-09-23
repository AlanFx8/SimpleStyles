import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchBrandsSubcat, sortBrandsSubcat, filterBrandsSubcat }
from '../redux/actions/brandsSubcatActions';
import ProductListPageContent from './sub/productListPageContent';

class BrandsSubcatPage extends React.Component {
    //START//
    componentDidMount(){
        this.props.fetchBrandsSubcat(this.props.match.params.type);
    }

    //RENDER//
    render(){
        return (
            <ProductListPageContent
                reducerData = { this.props.brandsSubcatReducer}
                sortAction = { this.props.sortBrandsSubcat }
                filterAction = { this.props.filterBrandsSubcat }
            />
        );
    }
}

//REDUX-RELATED//
BrandsSubcatPage.propTypes = {
    fetchBrandsSubcat: PropTypes.func.isRequired,
    sortBrandsSubcat: PropTypes.func.isRequired,
    filterBrandsSubcat: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    brandsSubcatReducer: state.brandsSubcatReducer
});

export default connect(mapStateToProps,
    { fetchBrandsSubcat, sortBrandsSubcat, filterBrandsSubcat })(BrandsSubcatPage);