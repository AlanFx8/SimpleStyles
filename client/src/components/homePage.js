import React from 'react';
import { Link } from 'react-router-dom';
import './css/homePage.css';

export default class HomePage extends React.Component {
    ///RENDER///
    render(){
        const url = process.env.PUBLIC_URL;
        const clothsPath = `${url}/img/layout/`;
        const brandsPath = `${clothsPath}brands/`;
        const data = [
            {
                link: "/cloths", img: "cloths", text: "All Cloths"
            },
            {
                link: "/men", img: "men", text: "Cloths for Men"
            },
            {
                link: "/women", img: "women", text: "Cloths for Women"
            },
            {
                link: "/cloths/shirts", img: "shirts", text: "Shirts"
            },
            {
                link: "/cloths/shorts", img: "shorts", text: "Shorts"
            },
            {
                link: "/cloths/trousers", img: "trousers", text: "Trousers"
            },
            {
                link: "/cloths/dresses", img: "dresses", text: "Dresses"
            },
            {
                link: "/cloths/footwear", img: "footwear", text: "Footwear"
            }
        ];

        const brandsData = [
            {
                link: '/brands/banned-apparel',
                img: 'banned-apparel',
                name: 'Banned Apparel'
            },
            {
                link: '/brands/goodyear',
                img: 'goodyear',
                name: 'GoodYear'
            },
            {
                link: '/brands/innocent',
                img: 'innocent',
                name: 'Innocent'
            },
            {
                link: '/brands/jawbreaker',
                img: 'jawbreaker',
                name: 'JawBreaker'
            },
            {
                link: '/brands/liquor-brand',
                img: 'liquor-brand',
                name: 'Liquor Brand'
            }
        ];

        return(
            <div id="main-content-wrapper">
                <section className="main-links-section">
                    { data.map((item, index) => {
                        return <Link className="homepage-link" to= { item.link } key= { index} >
                            <figure>
                                <img
                                    src= {`${clothsPath}${item.img}-link.jpg`}
                                    title = { item.text }
                                    alt= { item.text }
                                />
                                <figcaption> { item.text } </figcaption>
                            </figure>
                        </Link>
                    }) }
                </section>

                <section className="brands-links-section">
                    <h1>BRANDS WE LOVE!</h1>
                    <div>
                        { brandsData.map((item, index) => {
                            return <Link className="brand-link" to= { item.link } key= { index} >
                                <img
                                    src= {`${brandsPath}${item.img}.png`}
                                    title = { item.name }
                                    alt= { item.name }
                                />
                            </Link>
                        }) }
                    </div>
                </section>

                <section className="disclaimer-section">
                Disclaimer: "Simple Styles" is a portfolio site made by Alan Mark Freeman. You can browse all products via cloths or by men, women, or brands. It also supports search queries and carts.
                </section>
            </div>
        );
    }
}