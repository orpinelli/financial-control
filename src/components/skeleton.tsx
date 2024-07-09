import { ComponentProps } from "react";

export function Skeleton({ className, ...props }: ComponentProps<"div">) {
  return <div {...props} />;
}
