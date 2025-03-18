import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useMemo } from "react";

export const CustomSelect = ({
  placeholder = "Theme",
  options = [
    { label: "Light", value: "light" },
    { label: "Dark", value: "dark" },
    { label: "System", value: "system" },
  ],
  onChange,
  label = "",
  className = "",
  labelStyle = "",
  searchable = false,
  searchText = "",
  defaultValue,
  onSearchChange = () => { }
}: {
  label?: string;
  labelStyle?: string;
  searchable?: boolean;
  className?: string
  placeholder?: string;
  searchText?: string,
  defaultValue?: string,
  onSearchChange?: (searchText: string) => void;
  options?: {
    value: any;
    label: string;
  }[];
  onChange?: (v: string) => void;
}) => {

  const defaultLabel = useMemo(() => {
    return options.find(v => v.value === defaultValue)?.label
  }, [defaultValue])

  return (
    <div>
      {label && (
        <p className={cn("text-sm font-medium w-full text-left mb-1", labelStyle)}>
          {label}
        </p>
      )}
      <Select onValueChange={onChange} onOpenChange={(open) => {
        if (!open) {

        }
      }}>
        <SelectTrigger className={cn(
          searchable ? "w-full" : "w-[180px]",
          className
        )}>
          <SelectValue placeholder={defaultLabel || placeholder} />
        </SelectTrigger>
        <SelectContent>
          {searchable ? (
            <Input
              placeholder="Search items"
              className="mb-2"
              value={searchText}
              onChange={e => onSearchChange(e.target.value)} />
          ) : null}
          {options.map((v) => (
            <SelectItem key={v.value} value={v.value}>
              {v.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
