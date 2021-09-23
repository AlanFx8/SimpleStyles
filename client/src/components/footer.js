import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './css/footer.css';

export default class Footer extends React.Component {
    ///START///
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
        
        const contentBoxes = document.querySelectorAll(".footer-section-content");
        if (contentBoxes.length > 0){
            const box1 = contentBoxes[0];
            const box2 = contentBoxes[1];
            if (box1.clientHeight !== box2.clientHeight){
                if (box1.clientHeight > box2.clientHeight){
                    box2.style.height = `${box1.clientHeight}px`;
                }
                else {
                    box1.style.height = `${box2.clientHeight}px`;
                }
            }
        }
    }

    ///RENDER///
    render(){
        const public_url = process.env.PUBLIC_URL;
        const url = `${public_url}/img/layout/payments/`;

        return(
            <footer id="main-footer">
                <section className="footer-section">
                    <div className="footer-section-inner">
                        <button className="footer-section-header" type="button" onClick= {() => {
                                const header =
                                document.querySelectorAll(".footer-section-header")[0];
                                header.classList.toggle("active");
                            }
                        }>
                            <h1>More from Simple Styles</h1>
                        </button>
                        <div className="footer-section-content">
                            <ul>
                                <li>Contact us</li>
                                <li>Returns</li>
                                <li>Size chart</li>
                                <li>FAQ / Help</li>
                                <li>Catalogue</li>
                            </ul>

                            <ul>
                                <li>Competitions</li>
                                <li>Student Discount</li>
                                <li>Voucher {'&'} Gift Cards</li>
                                <li>Press Enquiries</li>
                                <li>Download Centre</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section className="footer-section">
                    <div className="footer-section-inner">
                        <button className="footer-section-header" type="button" onClick= {() => {
                                const header =
                                document.querySelectorAll(".footer-section-header")[1];
                                header.classList.toggle("active");
                            }
                        }>
                            <h1>About Simple Styles</h1>
                        </button>
                        <div className="footer-section-content">
                            <ul>
                                <li>Affiliate Programme</li>
                                <li>Terms {'&'} Conditions</li>
                                <li>Delivery</li>
                                <li>Privacy Policy</li>
                            </ul>

                            <ul>
                                <li>Cookie Policy</li>
                                <li>Waste Disposal and Environmental Protection</li>
                                <li>About us</li>
                                <li>Sustainability</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section className="footer-section">
                    <div className="footer-section-inner">
                        <div className="footer-section-header-basic">
                            Be a part of the community!
                        </div>
                            <div className="footer-section-icon-set">
                                <FontAwesomeIcon icon={['fab', 'facebook-f']} />
                                <FontAwesomeIcon icon={['fab', 'twitter']} />
                                <FontAwesomeIcon icon={['fab', 'instagram']} />
                                <FontAwesomeIcon icon={['fab', 'youtube']} />
                            </div>
                    </div>
                </section>

                <section className="footer-section">
                    <div className="footer-section-inner">
                        <div className="footer-section-header-basic">
                            Payment methods and delivery parthers
                        </div>
                            <div className="footer-section-icon-set">
                                <img src={`${url}paypal.png`} alt= 'PayPal' title= 'PayPal' />
                                <img src={`${url}visa.png`} alt= 'Visa' title= 'Visa' />
                                <img src={`${url}mastercard.png`} alt= 'MasterCard' title= 'MasterCard' />
                                <img src={`${url}royalmail.png`} alt= 'RoyalMail' title= 'RoyalMail' />
                            </div>
                    </div>
                </section>
            </footer>
        );
    }
}