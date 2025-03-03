import { OnlyWithFeatureFlag } from "@/components/OnlyWithFeatureFlag";

import { WalletPanel } from "./Wallet/WalletPanel";

export function LayoutColumns({ children }: { children: React.ReactNode }) {
  return (
    <OnlyWithFeatureFlag flag="walletColumn" otherwise={children}>
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_396px] gap-4 w-full">
        <div>{children}</div>
        <div>
          <WalletPanel />
        </div>
      </div>
    </OnlyWithFeatureFlag>
  );
}
