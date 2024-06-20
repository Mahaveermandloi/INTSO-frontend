import { useEffect } from "react";
import { jwtDecode } from "jwt-decode"; // Incorrect import statement
import { useNavigate } from "react-router-dom";

const useTokenExpirationCheck = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkTokenExpiration = () => {
      const token = localStorage.getItem("accessToken");

      if (token) {
        try {
          const decodedToken = jwtDecode(token); // Incorrect function name
          const currentTimestamp = Math.floor(Date.now() / 1000);

          if (decodedToken.exp < currentTimestamp) {
            localStorage.removeItem("accessToken");
            navigate("/admin/login"); // Redirect to login if token expired
            window.location.reload(); // Problematic reloading here
          } else {
            const remainingSeconds = decodedToken.exp - currentTimestamp;
           
          }
        } catch (error) {
          console.error("Error decoding token:", error);
        }
      }
    };

    checkTokenExpiration();

    // Check on focus to handle token expiration dynamically
    const checkExpirationOnFocus = () => {
      window.addEventListener("focus", checkTokenExpiration);
    };

    checkExpirationOnFocus();

    // Cleanup: Remove focus event listener
    return () => {
      window.removeEventListener("focus", checkTokenExpiration);
    };
  }, [navigate]);

  return null; // This hook doesn't render anything directly
};

export default useTokenExpirationCheck;
