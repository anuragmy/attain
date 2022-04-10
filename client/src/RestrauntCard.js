import React from "react";
import { Card } from "antd";

const RestrauntCard = ({ name, place, rating, averagePrice, cuisine }) => {
  return (
    <div className="site-card-border-less-wrapper">
      <Card title={name} bordered style={{ width: 300 }}>
        <p>
          <strong>place</strong> : {place}
        </p>
        <p>
          <strong>Rating</strong> : {rating}
        </p>
        <p>
          <strong>cuisine</strong> : {cuisine}
        </p>
        <p>
          <strong>Avergage Cost</strong> : {averagePrice}
        </p>
      </Card>
    </div>
  );
};

export default RestrauntCard;
