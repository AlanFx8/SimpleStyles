import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchMenCloths, sortMenCloths, filterMenCloths } from '../redux/actions/menClothsActions';
import ProductListPageContent from './sub/productListPageContent';

class MenClothsPage extends React.Component {
    //START//
    componentDidMount(){
        this.props.fetchMenCloths();
    }

    //RENDER//
    render(){
        return (
            <ProductListPageContent
                reducerData = { this.props.menClothsReducer}
                sortAction = { this.props.sortMenCloths }
                filterAction = { this.props.filterMenCloths }
            />
        );
    }
}

//REDUX-RELATED//
MenClothsPage.propTypes = {
    fetchMenCloths: PropTypes.func.isRequired,
    sortMenCloths: PropTypes.func.isRequired,
    filterMenCloths: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    menClothsReducer: state.menClothsReducer
});

export default connect(mapStateToProps,
    { fetchMenCloths, sortMenCloths, filterMenCloths })(MenClothsPage);