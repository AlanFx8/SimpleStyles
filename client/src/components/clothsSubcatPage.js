import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchClothsSubcat, sortClothsSubcat, filterClothsSubcat }
from '../redux/actions/clothsSubcatActions';
import ProductListPageContent from './sub/productListPageContent';

class ClothsSubcatPage extends React.Component {
    //START//
    componentDidMount(){
        this.props.fetchClothsSubcat(this.props.match.params.type);
    }

    //RENDER//
    render(){
        return (
            <ProductListPageContent
                reducerData = { this.props.clothsSubcatReducer}
                sortAction = { this.props.sortClothsSubcat }
                filterAction = { this.props.filterClothsSubcat }
            />
        );
    }
}

//REDUX-RELATED//
ClothsSubcatPage.propTypes = {
    fetchClothsSubcat: PropTypes.func.isRequired,
    sortClothsSubcat: PropTypes.func.isRequired,
    filterClothsSubcat: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    clothsSubcatReducer: state.clothsSubcatReducer
});

export default connect(mapStateToProps,
    { fetchClothsSubcat, sortClothsSubcat, filterClothsSubcat })(ClothsSubcatPage);