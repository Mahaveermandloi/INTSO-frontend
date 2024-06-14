import React from "react";
import ReactLoading from "react-loading";

function Spinner1() {
  return (
    <div className="flex justify-center items-center">
      <ReactLoading type="spin" color="#ED1450" height={50} width={50} />
    </div>
  );
}

export default Spinner1;
