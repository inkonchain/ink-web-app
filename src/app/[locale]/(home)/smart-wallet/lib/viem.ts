import { createPublicClient, http } from "viem";

import { BUNDLER_URL } from "../utils/constants";

export const publicClient = createPublicClient({
  transport: http(BUNDLER_URL),
});
