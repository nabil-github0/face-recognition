import React from "react";
import "./FaceRecognition.css";

const FaceRecognition = ({ imageUrl, boxes }) => {
  return (
    <div className="center ma">
      <div className="absolute mt2">
        <img id="inputImage" src={imageUrl} alt="" className="face-image" />
        {Array.isArray(boxes) &&
        boxes.map((box,i) =>{
          const {topRow, leftCol, rightCol, bottomRow} = box;
          return (<div key={i} id="bounding-box" style={{left:leftCol,right:rightCol,top:topRow,bottom:bottomRow}}></div>) 
        }
        )}
      </div>
    </div>
  );
};

export default FaceRecognition;
