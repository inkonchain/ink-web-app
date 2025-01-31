import { InkIcon } from "@inkonchain/ink-kit";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { LinkedWallet, SwapWidget } from "@reservoir0x/relay-kit-ui";
import { useAccount } from "wagmi";

import { RelayLogo } from "@/components/icons/RelayLogo";
import { EXTERNAL_LINKS_WITH_PARAMS, Link } from "@/routing";

import "@reservoir0x/relay-kit-ui/styles.css";

export const RelayKitUI: React.FC = () => {
  const { openConnectModal } = useConnectModal();
  const { address } = useAccount();

  return (
    <div className="flex flex-col gap-4 items-center">
      <div className="flex flex-col gap-4 p-6 pt-5 bg-[rgba(100,81,170,0.15)] rounded-3xl">
        <div className="flex justify-between items-center">
          <p className="text-blackMagic dark:text-whiteMagic text-xl font-bold">
            Bridge
          </p>
          {address && (
            <Link
              href={EXTERNAL_LINKS_WITH_PARAMS.relayTxHistory(address)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <InkIcon.History className="size-6 hover:opacity-70" />
            </Link>
          )}
        </div>
        {/* @ts-expect-error - Ignoring required props for SwapWidget */}
        <SwapWidget
          linkedWallets={
            address
              ? [
                  {
                    address: address as string,
                    vmType: "evm",
                    connector: "",
                  } satisfies LinkedWallet,
                ]
              : []
          }
          key={address}
          defaultFromToken={{
            chainId: 1,
            address: "0x0000000000000000000000000000000000000000",
            decimals: 18,
            name: "Ethereum",
            symbol: "ETH",
            logoURI: "https://assets.relay.link/icons/1/light.png",
          }}
          defaultToToken={{
            chainId: 57073,
            address: "0x0000000000000000000000000000000000000000",
            decimals: 18,
            name: "Ethereum",
            symbol: "ETH",
            logoURI: "https://inkonchain.com/icon.svg",
          }}
          defaultAmount="0"
          defaultToAddress={address}
          supportedWalletVMs={["evm"]}
          onConnectWallet={openConnectModal}
          onAnalyticEvent={(eventName, data) => {
            console.debug("Analytic Event", eventName, data); // TODO: Adjust this
          }}
        />
      </div>
      <div className="flex gap-2 items-center">
        <span className="text-blackMagic/50 dark:text-white/50 text-xs">
          Bridge powered by
        </span>
        <RelayLogo />
      </div>
    </div>
  );
};

RelayKitUI.displayName = "RelayKitUI";
