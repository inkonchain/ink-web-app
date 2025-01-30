import React from "react";

export interface ResponsiveTextProps {
  mobile: React.ReactNode;
  desktop: React.ReactNode;
}

export const ResponsiveText: React.FC<ResponsiveTextProps> = ({
  desktop,
  mobile,
}) => {
  return (
    <>
      <span className="hidden sm:inline-block">{desktop}</span>
      <span className="inline-block sm:hidden">{mobile}</span>
    </>
  );
};
