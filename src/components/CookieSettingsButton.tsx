import { TextUnderline } from "@/components/TextUnderline";

interface CookieSettingsButtonProps {
  enforce: "black" | undefined;
}

export const CookieSettingsButton: React.FC<CookieSettingsButtonProps> = ({
  enforce,
}) => {
  return (
    <button
      className="group relative"
      onClick={() => {
        window.OneTrust.ToggleInfoDisplay();
      }}
    >
      <div className="relative inline-block">Cookie Settings</div>
      <TextUnderline halfOpacity enforce={enforce} />
    </button>
  );
};
