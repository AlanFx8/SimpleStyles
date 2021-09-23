import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchBrands } from '../redux/actions/brandsActions';
import LoadingObj from './sub/loadingObj';
import ErrorObj from './sub/errorObj';
import './css/brands-page.css';

class BrandsPage extends React.Component {
    //START//
    componentDidMount(){
        this.props.fetchBrands();
    }

    //RENDER//
    render(){
        const url = process.env.PUBLIC_URL;
        const brandsImgPath = `${url}/img/layout/brands/`;
        const {loading, products, error } = this.props.brandsReducer;

        return (<div id="main-content-wrapper">
            { loading && <LoadingObj /> }
            
            { products && products.length > 0 && <>
                <div id="brands-page">
                    <h1>SEARCH BY BRANDS</h1>
                    <div>
                        { products.map((item, index) => {
                            return <Link className="brand-link" to= { `/brands/${item.id}` } key= { index} >
                                <img
                                    src= {`${brandsImgPath}${item.id}.png`}
                                    title = { item.name }
                                    alt= { item.name }
                                />
                            </Link>
                        }) }
                    </div>
                </div>
            </>}

            {products && products.length === 0 && <>
                <div>Sorry, your query returned no results.</div>
            </>}
            
            { error && <ErrorObj message = { error } /> }
        </div>);
    }
}

//REDUX-RELATED//
BrandsPage.propTypes = {
    fetchBrands: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    brandsReducer: state.brandsReducer
});

export default connect(mapStateToProps, { fetchBrands })(BrandsPage);