import * as React from "react";

import { cn } from "@/utils/functions";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[1px] ring-primary-300 bg-primary-200",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
