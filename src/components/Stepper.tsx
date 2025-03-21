import { InkIcon } from "@inkonchain/ink-kit";

import { cn } from "@/lib/utils";

interface Step {
  title: string;
  description: string;
  completed: boolean;
}

interface StepperProps {
  steps: Step[];
}

export const Stepper: React.FC<StepperProps> = ({ steps }) => {
  return (
    <div className="w-full max-w-2xl">
      <div className="flex flex-col">
        {steps.map((step, index) => (
          <div key={index}>
            <div className="flex items-center gap-4">
              <div
                className={cn(
                  "size-8 flex items-center justify-center rounded-full",
                  step.completed ? "bg-inkPurple" : "bg-default/6"
                )}
              >
                {step.completed ? (
                  <InkIcon.Check className="h-4 w-4 text-white" />
                ) : (
                  <span className="text-sm text-default font-black">
                    {index + 1}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-0.5">
                <h3 className="text-lg font-semibold text-default">
                  {step.title}
                </h3>
                <p className="text-sm text-muted">{step.description}</p>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div className="ml-[15px] h-[12px] w-[2px] bg-default/20 my-2.5" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

Stepper.displayName = "Stepper";
