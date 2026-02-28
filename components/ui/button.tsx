import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer",
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive:
          'bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
        outline:
          'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost:
          'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
        link: 'text-primary underline-offset-4 hover:underline',
        // --- Attendance (Emerald/Green) ---
        present:
          'border-transparent bg-[#d1fae5] text-[#065f46] hover:bg-[#a7f3d0]',
        on_time:
          'border-transparent bg-[#d1fae5] text-[#065f46] hover:bg-[#a7f3d0]',
        active:
          'border-transparent bg-[#d1fae5] text-[#065f46] hover:bg-[#a7f3d0]',
        approved:
          'border-transparent bg-[#dcfce7] text-[#166534] hover:bg-[#bbf7d0]',
        resolved:
          'border-transparent bg-[#dcfce7] text-[#166534] hover:bg-[#bbf7d0]',
        leave:
          'border-transparent bg-[#dcfce7] text-[#166534] hover:bg-[#bbf7d0]',
        physical:
          'border-transparent bg-[#dcfce7] text-[#166534] hover:bg-[#bbf7d0]',

        // --- Critical & Absences (Rose/Red) ---
        absent:
          'border-transparent bg-[#ffe4e6] text-[#9f1239] hover:bg-[#fecdd3]',
        sick: 'border-transparent bg-[#ffe4e6] text-[#9f1239] hover:bg-[#fecdd3]',
        missed_check_in:
          'border-transparent bg-[#ffe4e6] text-[#9f1239] hover:bg-[#fecdd3]',
        missed_check_out:
          'border-transparent bg-[#ffe4e6] text-[#9f1239] hover:bg-[#fecdd3]',
        both: 'border-transparent bg-[#ffe4e6] text-[#9f1239] hover:bg-[#fecdd3]',
        inactive:
          'border-transparent bg-[#ffe4e6] text-[#9f1239] hover:bg-[#fecdd3]',
        rejected:
          'border-transparent bg-[#fee2e2] text-[#991b1b] hover:bg-[#fecaca]',
        replacement:
          'border-transparent bg-[#fee2e2] text-[#991b1b] hover:bg-[#fecaca]',
        pending:
          'border-transparent bg-[#fee2e2] text-[#991b1b] hover:bg-[#fecaca]',

        // --- Warnings & Utilities (Orange/Yellow) ---
        late: 'border-transparent bg-[#ffedd5] text-[#9a3412] hover:bg-[#fed7aa]',
        early_leave:
          'border-transparent bg-[#ffedd5] text-[#9a3412] hover:bg-[#fed7aa]',
        early_go:
          'border-transparent bg-[#ffedd5] text-[#9a3412] hover:bg-[#fed7aa]',
        wrong_time:
          'border-transparent bg-[#ffedd5] text-[#9a3412] hover:bg-[#fed7aa]',
        half_day:
          'border-transparent bg-[#fef9c3] text-[#854d0e] hover:bg-[#fef08a]',
        overtime:
          'border-transparent bg-[#fef9c3] text-[#854d0e] hover:bg-[#fef08a]',
        scheduled:
          'border-transparent bg-[#fef9c3] text-[#854d0e] hover:bg-[#fef08a]',
        manual:
          'border-transparent bg-[#fef9c3] text-[#854d0e] hover:bg-[#fef08a]',
        repair:
          'border-transparent bg-[#fef9c3] text-[#854d0e] hover:bg-[#fef08a]',
        power_issue:
          'border-transparent bg-[#fef9c3] text-[#854d0e] hover:bg-[#fef08a]',
        ac: 'border-transparent bg-[#fef9c3] text-[#854d0e] hover:bg-[#fef08a]',
        light:
          'border-transparent bg-[#fef9c3] text-[#854d0e] hover:bg-[#fef08a]',

        // --- Info & IT (Blue/Cyan/Sky) ---
        new: 'border-transparent bg-[#dbeafe] text-[#1e40af] hover:bg-[#bfdbfe]',
        in_progress:
          'border-transparent bg-[#dbeafe] text-[#1e40af] hover:bg-[#bfdbfe]',
        issue:
          'border-transparent bg-[#dbeafe] text-[#1e40af] hover:bg-[#bfdbfe]',
        complaint:
          'border-transparent bg-[#dbeafe] text-[#1e40af] hover:bg-[#bfdbfe]',
        online:
          'border-transparent bg-[#dbeafe] text-[#1e40af] hover:bg-[#bfdbfe]',
        work_from_home:
          'border-transparent bg-[#e0f2fe] text-[#075985] hover:bg-[#bae6fd]',
        network:
          'border-transparent bg-[#ecfeff] text-[#155e75] hover:bg-[#cffafe]',
        internet_issue:
          'border-transparent bg-[#ecfeff] text-[#155e75] hover:bg-[#cffafe]',
        vpn_issue:
          'border-transparent bg-[#ecfeff] text-[#155e75] hover:bg-[#cffafe]',
        email_issue:
          'border-transparent bg-[#ecfeff] text-[#155e75] hover:bg-[#cffafe]',

        // --- Software (Teal alternative with Hex) ---
        software:
          'border-transparent bg-[#ccfbf1] text-[#115e59] hover:bg-[#99f6e4]',
        software_installation:
          'border-transparent bg-[#ccfbf1] text-[#115e59] hover:bg-[#99f6e4]',
        software_error:
          'border-transparent bg-[#ccfbf1] text-[#115e59] hover:bg-[#99f6e4]',

        // --- Assets & Hardware (Indigo/Violet) ---
        assets:
          'border-transparent bg-[#e0e7ff] text-[#3730a3] hover:bg-[#c7d2fe]',
        hardware:
          'border-transparent bg-[#e0e7ff] text-[#3730a3] hover:bg-[#c7d2fe]',
        laptop:
          'border-transparent bg-[#e0e7ff] text-[#3730a3] hover:bg-[#c7d2fe]',
        desktop:
          'border-transparent bg-[#e0e7ff] text-[#3730a3] hover:bg-[#c7d2fe]',
        monitor:
          'border-transparent bg-[#e0e7ff] text-[#3730a3] hover:bg-[#c7d2fe]',
        hard_drive:
          'border-transparent bg-[#e0e7ff] text-[#3730a3] hover:bg-[#c7d2fe]',
        charger:
          'border-transparent bg-[#e0e7ff] text-[#3730a3] hover:bg-[#c7d2fe]',
        office_facility:
          'border-transparent bg-[#e0e7ff] text-[#3730a3] hover:bg-[#c7d2fe]',
        return:
          'border-transparent bg-[#e0e7ff] text-[#3730a3] hover:bg-[#c7d2fe]',
        mouse:
          'border-transparent bg-[#e0e7ff] text-[#3730a3] hover:bg-[#c7d2fe]',
        keyboard:
          'border-transparent bg-[#e0e7ff] text-[#3730a3] hover:bg-[#c7d2fe]',
        printer:
          'border-transparent bg-[#e0e7ff] text-[#3730a3] hover:bg-[#c7d2fe]',
        scanner:
          'border-transparent bg-[#e0e7ff] text-[#3730a3] hover:bg-[#c7d2fe]',
        projector:
          'border-transparent bg-[#e0e7ff] text-[#3730a3] hover:bg-[#c7d2fe]',
        annual:
          'border-transparent bg-[#e0e7ff] text-[#3730a3] hover:bg-[#c7d2fe]',
        casual:
          'border-transparent bg-[#ede9fe] text-[#5b21b6] hover:bg-[#ddd6fe]',

        // --- Neutral & Others (Slate/Pink) ---
        desk: 'border-transparent bg-[#e2e8f0] text-[#1e293b] hover:bg-[#cbd5e1]',
        chair:
          'border-transparent bg-[#e2e8f0] text-[#1e293b] hover:bg-[#cbd5e1]',
        other:
          'border-transparent bg-[#f1f5f9] text-[#334155] hover:bg-[#e2e8f0]',
        weekend:
          'border-transparent bg-[#f1f5f9] text-[#334155] hover:bg-[#e2e8f0]',
        holiday:
          'border-transparent bg-[#fce7f3] text-[#9d174d] hover:bg-[#fbcfe8]',

        // --- Status & Priority (Blue/Gray/Green/Yellow/Red) ---
        read: 'border-transparent bg-[#f1f5f9] text-[#64748b] hover:bg-[#e2e8f0]',
        unread:
          'border-transparent bg-[#eff6ff] text-[#1e40af] font-semibold hover:bg-[#dbeafe]',

        low: 'border-transparent bg-[#f0fdf4] text-[#166534] hover:bg-[#dcfce7]',
        medium:
          'border-transparent bg-[#fffbeb] text-[#92400e] hover:bg-[#fef3c7]',
        high: 'border-transparent bg-[#fff1f1] text-[#991b1b] hover:bg-[#fee2e2]',
        alert:
          'border-transparent bg-[#7f1d1d] text-[#ffffff] hover:bg-[#991b1b]',
        teamlist:
          'border-transparent bg-[#fff7ed] text-[#9a3412] hover:bg-[#ffedd5]',
        hrm: 'border-transparent bg-[#faf5ff] text-[#6b21a8] font-bold hover:bg-[#f3e8ff]',
        input:
          'min-w-0 border border-input bg-transparent text-base shadow-xs transition-[color,box-shadow] outline-none text-muted-foreground hover:bg-transparent text-left font-normal md:text-sm dark:bg-input/30 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] justify-start',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        icon: 'size-9',
        'input-lg': 'h-10 w-full px-3 py-1',
        'icon-sm': 'size-8',
        'icon-lg': 'size-10',
        'badge-lg':
          'h-7 min-w-[76px] rounded-md gap-1.5 px-3 has-[>svg]:px-2.5 text-xs',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'default',
      size = 'default',
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
