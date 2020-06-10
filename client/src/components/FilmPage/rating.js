import React, { useState, useEffect } from "react";
import StarRatingComponent from "react-star-rating";

const Rating = () => {
    /*
    constructor() {
      super();
   
      this.state = {
        rating: 1
      };
    }
   
    onStarClick(nextValue, prevValue, name) {
      this.setState({rating: nextValue});
    }
      const { rating } = this.state;
      */
      return (                
        <div>
          <StarRatingComponent 
            name="rate1" 
            starCount={5}
          />
        </div>
      );
  }

export default Rating;

