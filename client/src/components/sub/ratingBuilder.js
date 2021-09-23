import React from 'react';

export default class RatingBuilder extends React.Component {
    render(){
        //Get props data
        const { review_score, review_count } = this.props;

        //Get review score as a percent
        const _rating = review_score * 10;
        const _ratingPercentage = (_rating / 50) * 100;

        //Use score percent to set width
        const _style = {width: `${_ratingPercentage}%`};

        return (
            <div className="product-reviews">
                { review_count === 0 && <div>No reviews</div>}
                { review_count !== 0 && <><span className="product-rating-background">
                    <span className="product-rating" style={_style} />
                </span>
                <span className="product-review-count">
                    (Of { review_count } reviews)
                </span></>}
            </div>
        )
    }
}