import { createPublicClient, http } from "viem";
import { Address } from "viem";
import {
  entryPoint06Address,
  EntryPointVersion,
} from "viem/account-abstraction";
import { inkSepolia } from "viem/chains";

import { clientEnv } from "@/env-client";

export const BUNDLER_URL = clientEnv.NEXT_PUBLIC_BUNDLER_URL;
export const PAYMASTER_URL = clientEnv.NEXT_PUBLIC_PAYMASTER_URL;
export const PASSKEY_SERVER_URL = clientEnv.NEXT_PUBLIC_PASSKEY_SERVER_URL;
export const CHAIN = inkSepolia;

export const contractAddress = "0xA07F56aeeb535856FdEC39a9d685C62536150B1f";
export const contractABI = [
  "function mint(address _to) public",
  "function balanceOf(address owner) external view returns (uint256 balance)",
] as const;

export const publicClient = createPublicClient({
  transport: http(BUNDLER_URL),
  chain: CHAIN,
});

export const entryPoint = {
  address: entryPoint06Address as Address,
  version: "0.6" as EntryPointVersion,
};
