import { PathnamesWithoutParameterizedPaths } from "@/routing";

export const getAnchorWithParams = (path: string, params?: string) => {
  return (
    params ? "?" + params + path.substring(1) : path
  ) as PathnamesWithoutParameterizedPaths;
};
