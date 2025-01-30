"use client";

import { useState } from "react";
import { SegmentedControl, SegmentedControlOption } from "@inkonchain/ink-kit";

import { useRouterQuery } from "@/hooks/useRouterQuery";
import { Link, usePathname } from "@/routing";
import { classNames } from "@/util/classes";

import { DotsIcon } from "../icons/Dots";
import { InkIcon } from "../icons/InkIcon";

type ControlOption = "home" | "apps";

export const HomeAppsToggle: React.FC<{}> = () => {
  const query = useRouterQuery();
  const pathname = usePathname();
  const [selected, setSelected] = useState<ControlOption>(
    pathname === "/" ? "home" : "apps"
  );

  return (
    <SegmentedControl
      variableTabWidth
      variant="primary"
      options={[
        {
          asChild: true,
          children: (
            <Link
              href={{ pathname: "/", query }}
              className={classNames("px-4 transition-all duration-300")}
            >
              <InkIcon size="icon-lg" enforce="inherit" />
            </Link>
          ),
          selectedByDefault: pathname !== "/dashboard",
          value: "home",
        },
        {
          asChild: true,
          children: (
            <Link
              href={{ pathname: "/dashboard", query }}
              className={classNames("px-4 transition-all duration-200")}
            >
              <DotsIcon size="icon-lg" enforce="inherit" />
            </Link>
          ),
          selectedByDefault: pathname === "/dashboard",
          value: "apps",
        },
      ]}
      onOptionChange={function (
        option: SegmentedControlOption<ControlOption>
      ): void {
        setSelected(option.value);
      }}
    />
  );
};
