import React from 'react';
import "./EnredaderaSVG.css";
import enredaderaLeft from '../assets/enredadera.png';
import enredaderaRight from '../assets/enredadera2.png';

const EnredaderaSVG = () => {
  return (
    <>
      {["left", "right"].map((side) => (
        <div className={`enredadera-container ${side}`} key={side}>
          <img
            className="enredadera"
            src={side === "left" ? enredaderaLeft : enredaderaRight}
            alt={`Enredadera decorativa ${side}`}
          />
        </div>
      ))}
    </>
  );
};


export default EnredaderaSVG;
