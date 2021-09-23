import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCloths, sortCloths, filterCloths } from '../redux/actions/clothsActions';
import ProductListPageContent from './sub/productListPageContent';

class ClothsPage extends React.Component {
    //START//
    componentDidMount(){
        this.props.fetchCloths();
    }

    //RENDER//
    render(){
        return (
            <ProductListPageContent
                reducerData = { this.props.clothsReducer}
                sortAction = { this.props.sortCloths }
                filterAction = { this.props.filterCloths }
            />
        );
    }
}

//REDUX-RELATED//
ClothsPage.propTypes = {
    fetchCloths: PropTypes.func.isRequired,
    sortCloths: PropTypes.func.isRequired,
    filterCloths: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    clothsReducer: state.clothsReducer
});

export default connect(mapStateToProps, { fetchCloths, sortCloths, filterCloths })(ClothsPage);