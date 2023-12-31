import React from "react";
import { Product, ProductInCart } from "./types/Columns";
import { useState } from "react";
import { Row } from "react-bootstrap";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

type ProductFiledProps = {
  products: Product[];
  handlePurchaseChange: (props: { purchase: ProductInCart }) => void;
};
const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const ProductFieldCarousel: React.FC<ProductFiledProps> = ({
  products,
  handlePurchaseChange,
}) => {
  const PurchaseNum = (props: { product: Product }) => {
    const [value, setValue] = useState<number>(1);
    const purchase: ProductInCart = {
      product: props.product,
      purchaseAmmount: value,
    };

    return (
      <li
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <button
          type="button"
          className="btn btn btn-outline-dark"
          style={{ padding: "2px" }}
          onClick={() => handlePurchaseChange({ purchase })}
        >
          Add to Cart
        </button>
        <input
          className="ml-1"
          style={{ width: "25%", textAlign: "center" }}
          type="number"
          min="1"
          max={props.product.ammount}
          defaultValue="1"
          onChange={(event) => setValue(event.target.valueAsNumber)}
        ></input>
      </li>
    );
  };

  return (
    <Row>
      <Carousel responsive={responsive}>
        {products.map((product) => (
          <ul
            key={product.productId}
            style={{
              listStyle: "none",
              textAlign: "center",
            }}
          >
            <img
              className="img-fluid"
              title={product.product + " pic"}
              src={`data:image/jpeg;base64,${product.photo}`}
            />
            <li>{product.product}</li>
            <li>PRICE: {product.price} jpy</li>
            <li>REMAINING: {product.ammount}</li>
            <PurchaseNum product={product} />
          </ul>
        ))}
      </Carousel>
    </Row>
  );
};

export default ProductFieldCarousel;
