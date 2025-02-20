import { ColoredText } from "@/components/ColoredText";
import { RelayKitUI } from "@/components/RelayKitUI";
import { newLayoutContainerClasses } from "@/components/styles/container";

export default function VerifyPage() {
  return (
    <div className={newLayoutContainerClasses()}>
      <ColoredText className="ink:text-h2 lg:hidden" variant="purple">
        Bridge
      </ColoredText>
      <RelayKitUI />
    </div>
  );
}
