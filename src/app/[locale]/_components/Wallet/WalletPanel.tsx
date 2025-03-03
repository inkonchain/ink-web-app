"use client";
import { toast } from "react-toastify";
import { Button, InkIcon } from "@inkonchain/ink-kit";
import { useEnsAddress } from "wagmi";

import { ConnectWalletButton } from "@/components/ConnectWalletButton";
import { useWallet } from "@/contexts/WalletProvider";
import { truncateAddress, truncateEnsName } from "@/util/formatWallet";

export function WalletPanel() {
  const { isConnected, address } = useWallet();

  function notYet() {
    toast.info("Not yet implemented");
  }

  return (
    <div className="flex flex-col gap-4 container mx-auto">
      <div className="min-h-[244px] relative ink:bg-button-secondary ink:backdrop-blur-sm flex flex-col justify-between ink:rounded-sm">
        {!isConnected && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-150 hover:backdrop-blur-sm">
            <ConnectWalletButton variant="primary" />
          </div>
        )}
        <div className="flex items-center justify-between p-5 px-6 gap-4">
          <div className="ink:text-h5 ink:text-text-muted">Balance</div>
          {isConnected && (
            <Button
              className="ink:text-text-muted"
              variant="transparent"
              size="md"
              onClick={() => {
                navigator.clipboard.writeText(address || "");
                toast.info("Copied to clipboard");
              }}
              iconRight={<InkIcon.Copy />}
            >
              <EnsOrAddress address={address || ""} />
            </Button>
          )}
        </div>
        <div className="flex-1" />
        <div className="flex items-center justify-between p-6">
          <div className="ink:text-h3 ink:text-text-muted">$0.00</div>
          <div className="">
            <InkIcon.Logo.Ink className="size-10 text-(--ink-button-secondary)" />
          </div>
        </div>
      </div>
      <div className="flex justify-evenly gap-6">
        <WalletPanelButton
          icon={<InkIcon.Arrow className="size-5" />}
          label="Receive"
          onClick={notYet}
        />
        <WalletPanelButton
          icon={<InkIcon.Arrow className="size-5 rotate-180" />}
          label="Send"
          onClick={notYet}
        />
        <WalletPanelButton
          icon={<InkIcon.Bridge className="size-5" />}
          label="Bridge"
          onClick={notYet}
        />
        <WalletPanelButton
          icon={<InkIcon.Deposit className="size-5" />}
          label="Deposit"
          onClick={notYet}
        />
      </div>
    </div>
  );
}

const EnsOrAddress = ({ address }: { address: string }) => {
  const { data: ens } = useEnsAddress();
  return (
    <div className="truncate">
      {ens ? truncateEnsName(ens) : truncateAddress(address)}
    </div>
  );
};

const WalletPanelButton = ({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <Button size="lg" rounded="full" variant="secondary" onClick={onClick}>
        {icon}
      </Button>
      <div className="ink:text-caption-1-bold ink:text-text-muted">{label}</div>
    </div>
  );
};
