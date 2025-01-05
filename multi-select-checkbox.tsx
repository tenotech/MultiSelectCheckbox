import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Checkbox } from "../ui/checkbox";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

/**
 * Variants for the multi-select component to handle different styles.
 */
const multiSelectVariants = cva(
  "m-1 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300",
  {
    variants: {
      variant: {
        default: "border-foreground/10 text-foreground bg-card hover:bg-card/80",
        secondary: "border-foreground/10 bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        inverted: "inverted",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface MultiSelectProps
  extends React.ButtonHTMLAttributes<HTMLDivElement>,
    VariantProps<typeof multiSelectVariants> {
  options: {
    label: string;
    value: string;
    icon?: React.ComponentType<{ className?: string }>;
    description?: string;
    disabled?: boolean;
  }[];
  onValueChange: (value: string[]) => void;
  defaultValue?: string[];
  asChild?: boolean;
  className?: string;
  selectAll?: boolean;
  orientation?: "horizontal" | "vertical";
  showDescription?: boolean;
  showTooltip?: boolean; // New prop to control tooltips
  disabled?: boolean;
}

export const MultiSelectCheckbox = React.forwardRef<HTMLDivElement, MultiSelectProps>(
  (
    {
      options,
      onValueChange,
      variant,
      defaultValue = [],
      asChild = false,
      className,
      selectAll = false,
      orientation = "vertical",
      showDescription = true,
      showTooltip = false, // Default tooltip is off
      disabled = false,
      ...props
    },
    ref
  ) => {
    const [selectedValues, setSelectedValues] = React.useState<string[]>(defaultValue);

    const toggleOption = (value: string) => {
      if (disabled) return;
      const option = options.find((opt) => opt.value === value);
      if (option?.disabled) return;

      const newSelectedValues = selectedValues.includes(value)
        ? selectedValues.filter((v) => v !== value)
        : [...selectedValues, value];
      setSelectedValues(newSelectedValues);
      onValueChange(newSelectedValues);
    };

    const handleClear = () => {
      if (disabled) return;
      setSelectedValues([]);
      onValueChange([]);
    };

    const toggleAll = () => {
      if (disabled) return;
      const enabledOptions = options.filter((option) => !option.disabled);
      const allValues = enabledOptions.map((option) => option.value);

      if (selectedValues.length === enabledOptions.length) {
        handleClear();
      } else {
        setSelectedValues(allValues);
        onValueChange(allValues);
      }
    };

    const containerClass = orientation === "horizontal" ? "flex flex-wrap gap-4" : "flex flex-col space-y-2";

    return (
      <TooltipProvider>
        <div className={`space-y-4 ${className}`} ref={ref} {...props}>
          {selectAll && (
            <div className="flex items-center space-x-2">
              <Checkbox
                id="select-all"
                checked={selectedValues.length === options.filter((opt) => !opt.disabled).length}
                disabled={disabled}
                onCheckedChange={(checked) => {
                  if (checked) toggleAll();
                  else handleClear();
                }}
              />
              <label
                htmlFor="select-all"
                className={`text-sm font-medium leading-none ${
                  disabled ? "cursor-not-allowed opacity-70" : ""
                }`}
              >
                Select All
              </label>
            </div>
          )}
          <div className={containerClass}>
            {options.map((item) => (
              <Tooltip key={item.value}>
                <TooltipTrigger asChild>
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id={item.value}
                      checked={selectedValues.includes(item.value)}
                      disabled={disabled || item.disabled}
                      onCheckedChange={(checked) => toggleOption(item.value)}
                    />
                    <div className="grid gap-1.5 leading-none">
                      <label
                        htmlFor={item.value}
                        className={`text-sm font-medium leading-none ${
                          disabled || item.disabled ? "cursor-not-allowed opacity-70" : ""
                        }`}
                      >
                        {item.label}
                      </label>
                      {showDescription && item.description && (
                        <p
                          className={`text-sm text-muted-foreground ${
                            disabled || item.disabled ? "opacity-70" : ""
                          }`}
                        >
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>
                </TooltipTrigger>
                {showTooltip && item.description && (
                  <TooltipContent>
                    <p>{item.description}</p>
                  </TooltipContent>
                )}
              </Tooltip>
            ))}
          </div>
        </div>
      </TooltipProvider>
    );
  }
);

MultiSelectCheckbox.displayName = "MultiSelectCheckbox";
