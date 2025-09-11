import { cn } from "@/lib/utils";

export function Section({
  className,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section
      className={cn("flex min-h-0 flex-col gap-y-3 print:gap-y-1", className)}
      {...props}
    />
  );
}
