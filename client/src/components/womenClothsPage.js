import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchWomenCloths, sortWomenCloths, filterWomenCloths }
from '../redux/actions/womenClothsActions';
import ProductListPageContent from './sub/productListPageContent';

class WomenClothsPage extends React.Component {
    //START//
    componentDidMount(){
        this.props.fetchWomenCloths();
    }

    //RENDER//
    render(){
        return (
            <ProductListPageContent
                reducerData = { this.props.womenClothsReducer}
                sortAction = { this.props.sortWomenCloths }
                filterAction = { this.props.filterWomenCloths }
            />
        );
    }
}

//REDUX-RELATED//
WomenClothsPage.propTypes = {
    fetchWomenCloths: PropTypes.func.isRequired,
    sortWomenCloths: PropTypes.func.isRequired,
    filterWomenCloths: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    womenClothsReducer: state.womenClothsReducer
});

export default connect(mapStateToProps,
    { fetchWomenCloths, sortWomenCloths, filterWomenCloths })(WomenClothsPage);