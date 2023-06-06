import { cn } from '@/lib/utils';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import React, { FC } from 'react';

const TabsRoot = TabsPrimitive.Root;

const TabsList = TabsPrimitive.List;

// const TabsTrigger = TabsPrimitive.Trigger

const TabsTrigger: FC<TabsPrimitive.TabsTriggerProps> = ({
  className,
  ...props
}) => {
  return (
    <TabsPrimitive.Trigger
      className={cn(
        'px-3 py-2 text-left text-slate-700 outline-none data-[state=active]:bg-slate-900 data-[state=active]:font-semibold data-[state=active]:text-white dark:border-slate-800 dark:bg-slate-800 dark:text-slate-400 dark:data-[state=active]:bg-slate-200 dark:data-[state=active]:text-slate-900',
        className
      )}
      {...props}
    />
  );
};
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      'border border-slate-900 bg-white p-6 text-slate-700 shadow-md animate-in data-[side=right]:slide-in-from-left-2 data-[side=left]:slide-in-from-right-2 data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2 dark:border-slate-200 dark:bg-slate-800 dark:text-slate-400  ',
      className
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { TabsRoot, TabsList, TabsTrigger, TabsContent };
