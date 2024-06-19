// import React from "react";
// import PaidResources from "../PaidResources";

// const PaidKnowledge = () => {

//   return (
//     <>
//       <PaidResources />
//     </>
//   );
// };

// export default PaidKnowledge;

import React from "react";
import PaidResources from "../PaidResources";

const PaidKnowledge = () => {
 
  const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 9999,
    pointerEvents: "none", // Allows clicks to pass through to elements below
  };


  return (
    <>
      <div style={overlayStyle}></div>

      <PaidResources />
    </>
  );
};

export default PaidKnowledge;
