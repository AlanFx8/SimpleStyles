import React from "react";
import './css/product-page-submenu.css';

//The ProductPageSubMenu class
//It builts the submenu for all product list pages
export default class ProductPageSubMenu extends React.Component {
    render(){
        return (<div className="products-page-submenu">
            <div className="submenu-options-section">
                <SortOptionsSectionBuilder onSortRequest = { this.props.onSortRequest }  />
                <ColourFilterSectionBuilder
                    products = { this.props.products }
                    onFilterRequest = { this.props.onFilterRequest }
                />
                <PriceFilterSectionBuilder
                    products = { this.props.products }
                    onFilterRequest = { this.props.onFilterRequest }
                />
            </div>
        </div>);
    }
}

/////////////////
///SUB-CLASSES///
/////////////////
class SortOptionsSectionBuilder extends React.Component {
    render(){
        return (<div className="options-section-panel">
            <input className="submenu-options-checkbox" type="checkbox" id="sort" name="sort" />
            <label className="submenu-options-label" htmlFor="sort">Sort by...</label>
            <div className="options-section-panel-content">
                <ul className="sort-options-list">
                    <li>
                        <input type="radio"
                            id="sort-r"
                            name="sort-types"
                            value="R"
                            onChange = { this.props.onSortRequest } />
                        <label htmlFor="sort-r">Recommended</label>
                    </li>
                    <li>
                        <input type="radio"
                            id="sort-t"
                            name="sort-types"
                            value="T"
                            onChange = { this.props.onSortRequest } />
                        <label htmlFor="sort-t">Top Rated</label>
                    </li>

                    <li>
                        <input type="radio"
                            id="sort-low"
                            name="sort-types"
                            value="Low-High"
                            onChange = { this.props.onSortRequest } />
                        <label htmlFor="sort-low">Price: Low to High</label>
                    </li>

                    <li>
                        <input type="radio"
                            id="sort-high"
                            name="sort-types"
                            value="High-Low"
                            onChange = { this.props.onSortRequest } />
                        <label htmlFor="sort-high">Price: High to Low</label>
                    </li>

                    <li>
                        <input type="radio"
                            id="sort-a-z"
                            name="sort-types"
                            value="A-Z"
                            onChange = { this.props.onSortRequest } />
                        <label htmlFor="sort-a-z">Alphabetical: A-Z</label>
                    </li>

                    <li>
                        <input type="radio"
                            id="sort-z-a"
                            name="sort-types"
                            value="Z-A"
                            onChange = { this.props.onSortRequest } />
                        <label htmlFor="sort-z-a">Alphabetical: Z-A</label>
                    </li>
                </ul>
            </div>
        </div>);
    }
}

class ColourFilterSectionBuilder extends React.Component {
    //Methods
    getColours = products => {
        const colourList = [];
        products.forEach(element => {
            const colour = element.colour;
            const dup = colourList.find(x => x === colour);
            if (!dup){
                colourList.push(colour);
            }
        });
        return colourList;
    }

    //Render
    render(){
        const colourList = this.getColours(this.props.products);
        return (<div className="options-section-panel">
            <input className="submenu-options-checkbox" type="checkbox"
            id="colour-filter" name="colour-filter" />
            <label className="submenu-options-label" htmlFor="colour-filter">Base Colour</label>
            <div className="options-section-panel-content">
                <ul className="colour-filter-list">
                    <li className="reset-button">
                        <button
                            type="button"
                            onClick = { () => this.props.onFilterRequest("colour", "reset")}
                        >
                            Reset
                        </button>
                    </li>
                    {colourList.map((value, index) => {
                        return <li key={ index }>
                            <button
                                type="button"
                                onClick= { () => this.props.onFilterRequest("colour", value)}
                            >
                                <div className="pallet" style={{backgroundColor: value}}></div>
                                <div>{ value }</div>
                            </button>
                        </li>
                    }) }
                </ul>
            </div>
        </div>);
    }
}

class PriceFilterSectionBuilder extends React.Component {
    //Start
    constructor(props){
        super(props);

        const prices = this.getPrices(this.props.products);
        this.state = {
            current_price: prices[0]
        }
    }

    //Methods
    getPrices = products => {
        let lowPrice = Number.POSITIVE_INFINITY;
        let highPrice = Number.NEGATIVE_INFINITY;

        products.forEach(element => {
            const _price = element.discount_price ? element.discount_price : element.price;
            if (_price < lowPrice) {
                lowPrice = _price;
            }
            
            if (_price > highPrice){
                highPrice = _price;
            }
        });

        return [lowPrice, highPrice];
    }

    onInput = e => {
        this.setState({ current_price: e.target.value });
        this.props.onFilterRequest("price", e.target.value);
    }

    //Render
    render(){
        const prices = this.getPrices(this.props.products);

        return (<div className="options-section-panel">
            <input className="submenu-options-checkbox" type="checkbox"
            id="price-filter" name="price-filter" />
            <label className="submenu-options-label" htmlFor="price-filter">Price Range</label>
            <div className="options-section-panel-content">
                <div className="price-filter-list">
                    <div className="num-shower">
                        ${prices[0]}
                    </div>

                    <div className="slider-holder">
                        <input
                            type="range"
                            min={ prices[0] }
                            max={ prices[1] }
                            value={ this.state.current_price }
                            onChange = { this.onInput }
                        />
                    </div>

                    <div className="num-shower">
                        ${prices[1]}
                    </div>
                </div>
            </div>
        </div>);
    }
}