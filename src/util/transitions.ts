import { Transition } from "framer-motion";

export const largeMovementTransition: Transition = {
  mass: 0.1,
  stiffness: 120,
  damping: 10,
  type: "spring",
};
