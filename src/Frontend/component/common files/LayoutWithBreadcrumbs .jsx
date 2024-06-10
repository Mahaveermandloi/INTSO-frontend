import Breadcrumbs from "./Breadcrumbs ";

export const LayoutWithBreadcrumbs = ({ children }) => {
  return (
    <div>
      <Breadcrumbs />
      {children}
    </div>
  );
};
