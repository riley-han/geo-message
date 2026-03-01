
import { useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockContactNames } from "../mock-data/mock-data";

interface SelectContactProps {
  value?: string;
  onChange: (value: string) => void;
}

const SelectContact = ({ value, onChange }: SelectContactProps) => {
  const contacts = useMemo(
    () =>
      mockContactNames.map((name) => ({
        label: name,
        value: name,
      })),
    []
  );

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a contact" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Contacts</SelectLabel>
          {contacts.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectContact;