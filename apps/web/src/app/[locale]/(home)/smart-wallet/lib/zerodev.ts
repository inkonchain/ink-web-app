import {
  PasskeyValidatorContractVersion,
  toPasskeyValidator,
  toWebAuthnKey,
  WebAuthnMode,
} from "@zerodev/passkey-validator";
import {
  createKernelAccount,
  createKernelAccountClient,
  KernelSmartAccountImplementation,
} from "@zerodev/sdk";
import { KERNEL_V2_4 } from "@zerodev/sdk/constants";
import { http } from "viem";
import { SmartAccount } from "viem/account-abstraction";

import {
  BUNDLER_URL,
  CHAIN,
  entryPoint,
  PASSKEY_SERVER_URL,
  publicClient,
} from "../utils/constants";

export async function createAccountAndClient(
  username: string,
  mode: WebAuthnMode
) {
  try {
    const webAuthnKey = await toWebAuthnKey({
      passkeyName: username,
      passkeyServerUrl: PASSKEY_SERVER_URL,
      mode: mode,
      passkeyServerHeaders: {},
    });

    const passkeyValidator = await toPasskeyValidator(publicClient, {
      webAuthnKey,
      entryPoint,
      kernelVersion: KERNEL_V2_4,
      validatorContractVersion: PasskeyValidatorContractVersion.V0_0_1,
    });

    const kernelAccount = (await createKernelAccount(publicClient, {
      entryPoint,
      plugins: {
        sudo: passkeyValidator,
      },
      kernelVersion: KERNEL_V2_4,
    })) as SmartAccount<KernelSmartAccountImplementation>;

    const kernelClient = createKernelAccountClient({
      account: kernelAccount,
      chain: CHAIN,
      bundlerTransport: http(BUNDLER_URL),
    });

    return { kernelAccount, kernelClient };
  } catch (error: any) {
    throw error;
  }
}
