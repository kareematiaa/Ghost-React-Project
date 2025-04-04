import React from "react";
import styles from "./ProductCard.module.css";
import model1 from "../../assets/model1.png";
import model2 from "../../assets/model2.png";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <>
      <div>
        <div>
          <Link to={`/ProductDetails?id=${product.productId}`}>
            <img src={model1} className="w-full h-80 object-cover" />
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="font-medium">
              {product.price} <span>sr</span>
            </p>
          </Link>
        </div>
      </div>
    </>
  );
}
