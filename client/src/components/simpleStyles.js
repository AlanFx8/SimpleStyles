import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Header from './header';
import HomePage from './homePage';

import ClothsPage from './clothsPage';
import ClothsSubcatPage from './clothsSubcatPage';
import MenClothsPage from './menClothsPage';
import MenClothsSubcatPage from './menClothsSubcatPage';
import WomenClothsPage from './womenClothsPage';
import WomenClothsSubcatPage from './womenClothsSubcatPage';
import BrandsPage from './brandsPage';
import BrandsSubcatPage from './brandsSubcatPage';
import SearchPage from './searchPage';

import ProductPage from './productPage';
import Cart from './cart';
import Checkout from './checkout';
import Footer from './footer';
import ErrorPage from './errorPage';
import ScrollButton from './scrollButton';
import './css/reset.css';
import './css/simpleStyles.css';

///The SimpleStyles class
///It represents the whole App
///NOTE: We use forceRefresh on the Router to handles sub-catagories
//like cloths/shirts, women/dresses etc.
export default class SimpleStyles extends React.Component {
    render(){
        return (<Router forceRefresh={true}>
            <Header />
            <div id="main-content">
                <Switch>
                    <Route path="/" exact component= { HomePage } />
                    <Route path="/cloths" exact component = { ClothsPage} />
                    <Route path="/cloths/:type" exact component = { ClothsSubcatPage} />
                    <Route path="/men" exact component= { MenClothsPage } />
                    <Route path="/men/:type" exact component= { MenClothsSubcatPage } />
                    <Route path="/women" exact component= { WomenClothsPage } />
                    <Route path="/women/:type" exact component= { WomenClothsSubcatPage } />
                    <Route path="/brands" exact component= { BrandsPage } />
                    <Route path="/brands/:type" exact component= { BrandsSubcatPage } />
                    <Route path="/search/:query" exact component={ SearchPage } />
                    <Route path="/product/:id" exact component = { ProductPage } />
                    <Route path="/cart" exact component = { Cart } />
                    <Route path="/checkout" exact component = { Checkout } />
                    <Route component= { ErrorPage } />
                </Switch>
            </div>
            <Footer />
            <ScrollButton />
        </ Router>);
    }
}