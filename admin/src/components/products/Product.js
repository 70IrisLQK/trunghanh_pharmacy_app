import React from "react";
import { Link } from "react-router-dom";
const Product = (props) => {
  const { product } = props;

  return (
    <>
      <div className="col-md-6 col-sm-6 col-lg-3 mb-5">
        <div className="card card-product-grid shadow-sm">
          <Link to="#" className="img-wrap">
            <img src="images/15.jpg" alt="Product" />
          </Link>
          <div className="info-wrap">
            <Link to="#" className="title text-truncate">
              {product.name}
            </Link>
            <div className="price mb-2">{product.price} / {product.Unit.name}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
