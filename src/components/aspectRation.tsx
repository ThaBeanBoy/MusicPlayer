import * as RadixAspectRatio from '@radix-ui/react-aspect-ratio';
import { HtmlHTMLAttributes, ReactNode, forwardRef } from 'react';

const AspectRatio = forwardRef<
  HTMLDivElement,
  HtmlHTMLAttributes<HTMLDivElement> & { ratio?: number; children: ReactNode }
>(({ children, ratio, ...props }, ref) => (
  <div {...props} ref={ref}>
    <RadixAspectRatio.Root ratio={ratio}>{children}</RadixAspectRatio.Root>
  </div>
));

export default AspectRatio;
