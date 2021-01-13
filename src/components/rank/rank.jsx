import React from "react";

const Rank = ({ name, entries }) => {
  return (
    <div>
      <div className="white f3">{`${name} You have made `}</div>
      <div className="white f1">{`${entries} image detections`}</div>
      <div className="white f3">{`on this account. `}</div>
    </div>
  );
};

export default Rank;
