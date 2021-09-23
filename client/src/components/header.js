import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HeaderCart from './sub/headerCart';
import './css/header.css';

class Header extends React.Component {
    ///START///
    constructor(props){
        super(props);

        this.state = {
            clothTypes: ['shirts', 'shorts', 'trousers', 'dresses', 'footwear'],
            clothNames: ['Shirts', 'Shorts', 'Trousers', 'Dresses', 'Footwear'],
            brands: ['banned-apparel', 'goodyear', 'innocent', 'jawbreaker',
            'liquor-brand', 'lucky-13', 'urban-classics'],
            brandsName: ['Banned Apparel', 'GoodYear', 'Innocent', 'JawBreaker',
            'Liquor Brand', 'Lucky 13', 'Urban Classics'],
            showSmallNavmenu: false
        }
    }

    componentDidMount(){
        window.addEventListener("resize", this.onResize, false);
        this.onResize();
    }

    componentWillUnmount(){
        window.removeEventListener("resize", this.onResize, false);
    }

    ///METHODS///
    onResize = () => {
        if (!window.matchMedia('(min-width: 50rem)').matches)
            return;

        if (this.state.showSmallNavmenu){
            this.onCloseSmallNavmenu();
        }
    }
    
    onSearchRequest = e => {
        e.preventDefault();

        //Trim the query
        const searchQuery = document.querySelectorAll(`input[type="search"]`)[0].value.trim();

        //If it's empty - return
        if (searchQuery === "")
            return;

        //Push to search page
        this.props.history.push(`/search/${searchQuery}`);
    }

    onOpenSmallNavmenu = () => {
        this.setState({
            showSmallNavmenu: true
        });
    }

    onCloseSmallNavmenu = () => {
        this.setState({
            showSmallNavmenu: false
        });
    }

    toggleSmallNavmenuPanel = index => {
        const panels = document.querySelectorAll(".small-navmenu-panel");
        panels[index].classList.toggle("active");
    }

    ///RENDER///
    render(){
        const url = process.env.PUBLIC_URL;

        return (
            <header id="main-header">
                <section className="header-section-main">
                    <div className="logo-header">
                        <Link to="/">
                            <img src={`${url}/img/layout/SimpleStylesLogo.png`}
                            alt="SimpleStyles logo" title="SimpleStyles" />
                        </Link>
                    </div>

                    <div className="search-header">
                        <form id="search-form" name="search-form" onSubmit={this.onSearchRequest}>
                            <input type="search" placeholder="What are you looking for?" />
                            <button type="submit">
                                <FontAwesomeIcon icon={['fas', 'search']} />
                            </button>
                        </form>
                    </div>

                    <HeaderCart />
                </section>

                <section className="header-section-nav">
                    <div id="small-navbar">
                        <button id="small-navbar-button"
                        type="button" onClick= { this.onOpenSmallNavmenu }>
                            <div></div>
                            <div></div>
                            <div></div>
                        </button>
                    </div>

                    <div id="primary-navbar">
                        <ul id="primary-navbar-ul">
                            <li><Link to="/cloths">Cloths</Link>
                                <ul>
                                    <NavMenuSubListBuilder type = "c"
                                    data = { this.state.clothTypes }
                                    names = { this.state.clothNames } />
                                </ul>
                            </li>
                            <li><Link to="/men">Men</Link>
                                <ul>
                                    <NavMenuSubListBuilder type = "m"
                                    data = { this.state.clothTypes }
                                    names = { this.state.clothNames } />
                                </ul>
                            </li>
                            <li><Link to="/women">Women</Link>
                                <ul>
                                    <NavMenuSubListBuilder type = "f"
                                    data = { this.state.clothTypes }
                                    names = { this.state.clothNames } />
                                </ul>
                            </li>
                            <li><Link to="/brands">Brands</Link>
                                <ul>
                                    <NavMenuSubListBuilder type = "b"
                                    data = { this.state.brands }
                                    names = { this.state.brandsName } />
                                    <li><Link to="/brands">And more..</Link></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </section>

                {this.state.showSmallNavmenu &&
                    <SmallNavMenu
                        onCloseSmallNavmenu = { this.onCloseSmallNavmenu }
                        toggleSmallNavmenuPanel = { this.toggleSmallNavmenuPanel }
                        clothTypes = { this.state.clothTypes }
                        clothNames = { this.state.clothNames }
                        brands = { this.state.brands }
                        brandsName = { this.state.brandsName }
                    />
                }
            </header>
        );
    }
}

export default withRouter(Header)

///SUB-CLASSES///
class SmallNavMenu extends React.Component {
    ///RENDER///
    render(){
        const { toggleSmallNavmenuPanel, clothTypes, clothNames, brands, brandsName } = this.props;
        const data = [{ index: 0, type: "c" }, { index: 1, type: "m" }, { index: 2, type: "f" }, { index: 3, type: "b" }];

        return(<div id="small-navmenu-wrapper">
            <div id="small-navmenu">
                { data.map(item => {
                    return <section key= { item.index }>
                        <button
                            className="small-navmenu-panel"
                            type="button"
                            onClick = { () => toggleSmallNavmenuPanel(item.index)}
                        >
                            {item.type === "c" &&  `CLOTHS`}
                            {item.type === "m" &&  `MEN`}
                            {item.type === "f" &&  `WOMEN`}
                            {item.type === "b" &&  `BRANDS`}
                        </button>
                        <ul className="small-navmenu-ul" onClick={ this.props.onCloseSmallNavmenu }>
                            <li><Link to= { item.type === "c" ? "/cloths" :
                            item.type === "m" ? "/men" : item.type === "f" ? "/women" : "/brands" } >All items</Link></li>
                            <NavMenuSubListBuilder type = { item.type }
                            data = { item.type === "b" ? brands : clothTypes }
                            names = { item.type === "b" ? brandsName :  clothNames } />
                            {item.type === "b" && <li><Link to="/brands">And more..</Link></li> }
                        </ul>
                    </section>
                }) }

                <button type="button" onClick={ this.props.onCloseSmallNavmenu }>
                    <FontAwesomeIcon icon={['fas', 'times']}  />
                </button>
            </div>
        </div>)
    }
}

class NavMenuSubListBuilder extends React.Component {
    render(){
        const { type, data, names } = this.props;
        const _array = [];
        const startPath = (type === "c") ? "/cloths/" : (type === "b") ?
        "/brands/" : (type === "m") ? "/men/" : "/women/";        
        for (let x = 0; x < data.length; x++){
            if (type === "m" && data[x] === 'dresses')
                continue;

            _array.push({
                link: `${startPath}${data[x]}`,
                name: names[x]
            });
        }

        return(
            _array.map((item, index) => {
                return <li key={ index }><Link to={ item.link }>{ item.name }</Link></li>
            })
        );
    }
}