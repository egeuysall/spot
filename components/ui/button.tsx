import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

function Button({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> & {
  asChild?: boolean;
}) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={`text-base bg-accent-100 text-secondary-200 transition duration-200 hover:opacity-75 font-bold py-2.5 px-3.5 rounded-lg inline-flex items-center justify-center gap-2 w-full ${className}`}
      {...props}
    />
  );
}

export { Button };
