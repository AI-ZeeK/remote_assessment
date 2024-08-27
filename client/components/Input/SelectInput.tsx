import { cn } from "@/lib/utils";
import { FormControl, FormLabel, Select } from "@chakra-ui/react";
import React, { useState } from "react";
import { MdArrowDropDown } from "react-icons/md";

type Props = {
  options: string[];
  islabel?: boolean;
  label?: string;
  value?: string;
  classname?: string;
  name: string;
  disabled: boolean;

  onChange: (t: any) => void;
};

const SelectInput = ({
  name,
  options,
  islabel = false,
  label,
  value,
  disabled,
  classname,
  onChange,
}: Props) => {
  return (
    <FormControl className="flex flex-col gap-1">
      {islabel && (
        <FormLabel fontSize={14} className="!m-0 text-sm !font-semibold">
          {label}
        </FormLabel>
      )}

      <Select
        name={name}
        disabled={disabled}
        fontSize={14}
        bg={"#fff"}
        onChange={onChange}
        // icon={<MdArrowDropDown />}
        className={cn(
          "p-1 flex justify-center items-center px-3 outline-none border rounded-md border-[##D9D9D9] cursor-pointer capitalize hover:border-[#747474] text-black bg-white hover:bg-blue-50 focus-within:border-[#D9D9D9] transition-all focus-within:bg-[#f1f1f1]",
          classname
        )}
      >
        {options.map((option, i) => (
          <option key={i} value={option}>
            {option}
          </option>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectInput;
