import React from "react";
import styles from "./ProductCard.module.css";
import model1 from "../../assets/model1.png";
import model2 from "../../assets/model2.png";

export default function ProductCard() {
  return (
    <>
      <div>
        <div>
          <img src={model1} className="w-full h-80 object-cover" />
          <h3 className="text-lg font-semibold">Basic Gym Fit T-Shirt</h3>
          <p className="font-medium">
            300 <span>sr</span>
          </p>
        </div>
      </div>
    </>
  );
}
