import React from "react";
import { Link, useLocation } from "react-router-dom";
const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <nav>
      <ol className="breadcrumb">
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;
          return (
            <li
              key={to}
              className={`breadcrumb-item ${isLast ? "active" : ""}`}>
              {isLast ? (
                value
              ) : (
                <Link to={to}>
                  {value.charAt(0).toUpperCase() +
                    value.slice(1).replace(/-/g, " ")}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
