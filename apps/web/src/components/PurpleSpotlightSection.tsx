import { ColoredText } from "./ColoredText";

export interface PurpleSpotlightSectionProps {
  title: React.ReactNode;
  callToAction: React.ReactNode;
  className?: string;
}

export const PurpleSpotlightSection: React.FC<PurpleSpotlightSectionProps> = ({
  title,
  callToAction,
  className = "",
}) => {
  return (
    <div
      className={`w-full bg-krakenPurple px-4 py-20 sm:px-16 sm:py-16 sm:pb-20 text-center flex flex-col items-center justify-center gap-8 rounded-spotlight-mobile sm:rounded-spotlight font-medium ${className}`}
    >
      <ColoredText
        variant="white-to-gray"
        dampen="lg"
        className="text-4xl sm:text-6xl font-medium pb-1"
        noAnimation
      >
        {title}
      </ColoredText>

      <div className="flex justify-center gap-6 flex-wrap">{callToAction}</div>
    </div>
  );
};
