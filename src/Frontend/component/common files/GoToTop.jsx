import React, { useState, useEffect } from "react";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
const GoToTop = () => {
  const styles = {
    button: {
      position: "fixed",
      bottom: "50px",
      right: "50px",
      padding: "10px 20px",
      fontSize: "16px",
      backgroundColor: "#ED1450",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      zIndex: 1000,
    },
  };

  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      {showButton && (
        <button onClick={scrollToTop} style={styles.button}>
          <ArrowUpwardIcon />
        </button>
      )}
    </div>
  );
};

export default GoToTop;
