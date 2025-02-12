import { newLayoutContainerClasses } from "@/components/styles/container";

import { RelayKitUI } from "../../(dashboard)/dashboard/_components/RelayKitUI";

export default function VerifyPage() {
  return (
    <div className={newLayoutContainerClasses()}>
      <RelayKitUI />
    </div>
  );
}
