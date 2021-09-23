import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchMenClothsSubcat, sortMenClothsSubcat, filterMenClothsSubcat } 
from '../redux/actions/menClothsSubcatActions';
import ProductListPageContent from './sub/productListPageContent';

class MenClothsSubcatPage extends React.Component {
    //START//
    componentDidMount(){
        this.props.fetchMenClothsSubcat(this.props.match.params.type);
    }

    //RENDER//
    render(){
        return (
            <ProductListPageContent
                reducerData = { this.props.menClothsSubcatReducer}
                sortAction = { this.props.sortMenClothsSubcat }
                filterAction = { this.props.filterMenClothsSubcat }
            />
        );
    }
}

//REDUX-RELATED//
MenClothsSubcatPage.propTypes = {
    fetchMenClothsSubcat: PropTypes.func.isRequired,
    sortMenClothsSubcat: PropTypes.func.isRequired,
    filterMenClothsSubcat: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    menClothsSubcatReducer: state.menClothsSubcatReducer
});

export default connect(mapStateToProps,
    { fetchMenClothsSubcat, sortMenClothsSubcat, filterMenClothsSubcat })(MenClothsSubcatPage);