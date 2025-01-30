import { classNames } from "@/util/classes";

import { IconProps } from "./types";

export const ThemedIcon = ({
  Light: Light,
  Dark: Dark,
  ...props
}: IconProps & {
  Light: React.FC<IconProps>;
  Dark: React.FC<IconProps>;
}) => {
  if (props.enforce === "black") {
    return <Light {...props} />;
  }
  if (props.enforce === "white") {
    return <Dark {...props} />;
  }
  return (
    <>
      <Light
        {...props}
        className={classNames("dark:hidden", props.className)}
      />
      <Dark
        {...props}
        className={classNames("hidden dark:inline-block", props.className)}
      />
    </>
  );
};
