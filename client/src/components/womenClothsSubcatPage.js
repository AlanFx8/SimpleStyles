import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchWomenClothsSubcat, sortWomenClothsSubcat, filterWomenClothsSubcat } 
from '../redux/actions/womenClothsSubcatActions';
import ProductListPageContent from './sub/productListPageContent';

class WomenClothsSubcatPage extends React.Component {
    //START//
    componentDidMount(){
        this.props.fetchWomenClothsSubcat(this.props.match.params.type);
    }

    //RENDER//
    render(){
        return (
            <ProductListPageContent
                reducerData = { this.props.womenClothsSubcatReducer}
                sortAction = { this.props.sortWomenClothsSubcat }
                filterAction = { this.props.filterWomenClothsSubcat }
            />
        );
    }
}

//REDUX-RELATED//
WomenClothsSubcatPage.propTypes = {
    fetchWomenClothsSubcat: PropTypes.func.isRequired,
    sortWomenClothsSubcat: PropTypes.func.isRequired,
    filterWomenClothsSubcat: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    womenClothsSubcatReducer: state.womenClothsSubcatReducer
});

export default connect(mapStateToProps,
    { fetchWomenClothsSubcat, sortWomenClothsSubcat, filterWomenClothsSubcat })(WomenClothsSubcatPage);