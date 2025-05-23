"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useRef,
  KeyboardEvent,
  MouseEvent,
  forwardRef,
} from "react";

type SelectContextType = {
  value: string | null;
  setValue: (val: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  registerItem: (val: string) => void;
  highlightedIndex: number;
  setHighlightedIndex: React.Dispatch<React.SetStateAction<number>>;
  items: string[];
};

const SelectContext = createContext<SelectContextType | undefined>(undefined);

function useSelectContext() {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error("Select components must be used within <Select>");
  }
  return context;
}

type SelectProps = {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  children: ReactNode;
};

export function Select({ value, defaultValue, onChange, children }: SelectProps) {
  const [internalValue, setInternalValue] = useState(defaultValue ?? null);
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState<string[]>([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const controlled = value !== undefined;
  const selectedValue = controlled ? value : internalValue;

  const setValue = (val: string) => {
    if (!controlled) {
      setInternalValue(val);
    }
    onChange?.(val);
    setIsOpen(false);
  };

  const registerItem = (val: string) => {
    setItems((old) => {
      if (old.includes(val)) return old;
      return [...old, val];
    });
  };

  return (
    <SelectContext.Provider
      value={{
        value: selectedValue,
        setValue,
        isOpen,
        setIsOpen,
        registerItem,
        highlightedIndex,
        setHighlightedIndex,
        items,
      }}
    >
      <div className="relative inline-block">{children}</div>
    </SelectContext.Provider>
  );
}

type SelectTriggerProps = React.HTMLAttributes<HTMLButtonElement>;

export const SelectTrigger = forwardRef<HTMLButtonElement, SelectTriggerProps>(
  ({ children, ...props }, ref) => {
    const { value, isOpen, setIsOpen } = useSelectContext();

    const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setIsOpen(!isOpen);
      }
    };

    return (
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        className="px-4 py-2 border rounded-md bg-white dark:bg-gray-700 text-left w-48"
        ref={ref}
        {...props}
      >
        {children || value || "Select..."}
      </button>
    );
  }
);
SelectTrigger.displayName = "SelectTrigger";

type SelectContentProps = React.HTMLAttributes<HTMLDivElement>;

export function SelectContent({ children, ...props }: SelectContentProps) {
  const { isOpen, highlightedIndex, setHighlightedIndex, setValue, items, setIsOpen } = useSelectContext();
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && contentRef.current) {
      contentRef.current.focus();
    }
  }, [isOpen]);

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!isOpen) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prev: number) => (prev < items.length - 1 ? prev + 1 : 0));
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prev: number) => (prev > 0 ? prev - 1 : items.length - 1));
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        if (highlightedIndex >= 0 && highlightedIndex < items.length) {
          setValue(items[highlightedIndex]);
        }
        break;
      case "Escape":
        e.preventDefault();
        setIsOpen(false);
        break;
    }
  };

  if (!isOpen) return null;

  return (
    <div
      ref={contentRef}
      role="listbox"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="absolute mt-1 w-48 max-h-60 overflow-auto rounded-md border bg-white dark:bg-gray-700 shadow-lg z-50"
      {...props}
    >
      {children}
    </div>
  );
}

type SelectItemProps = {
  value: string;
  children: ReactNode;
};

export const SelectItem = forwardRef<HTMLDivElement, SelectItemProps>(
  ({ value, children, ...props }, ref) => {
    const {
      value: selectedValue,
      setValue,
      highlightedIndex,
      setHighlightedIndex,
      registerItem,
      items,
    } = useSelectContext();

    useEffect(() => {
      registerItem(value);
    }, [value, registerItem]);

    const index = items.indexOf(value);
    const isSelected = selectedValue === value;
    const isHighlighted = highlightedIndex === index;

    const handleClick = (e: MouseEvent) => {
      e.preventDefault();
      setValue(value);
    };

    return (
      <div
        ref={ref}
        role="option"
        aria-selected={isSelected}
        tabIndex={-1}
        className={`cursor-pointer px-4 py-2 ${
          isSelected ? "bg-blue-600 text-white" : isHighlighted ? "bg-blue-100" : ""
        }`}
        onClick={handleClick}
        onMouseEnter={() => setHighlightedIndex(index)}
        onMouseDown={(e) => e.preventDefault()}
        {...props}
      >
        {children}
      </div>
    );
  }
);
SelectItem.displayName = "SelectItem";

type SelectValueProps = React.HTMLAttributes<HTMLSpanElement> & {
  placeholder?: string;
};

export function SelectValue({ children, placeholder, ...props }: SelectValueProps) {
  const { value } = useSelectContext();

  return (
    <span {...props} className="select-none">
      {children || value || placeholder || "Select..."}
    </span>
  );
}