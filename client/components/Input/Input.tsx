"use client";
import { Textarea } from "@chakra-ui/react";
import { FileInput } from "flowbite-react";
import React, { useState } from "react";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { cn } from "@/lib/utils";

type Props = {
  placeholder: string;
  name: string;
  value?: string;
  type?: string;
  optionalLabel?: string;
  disabled?: boolean;
  password?: boolean;
  required?: boolean;
  textarea?: boolean;
  file?: boolean;
  islabel?: boolean;
  label?: string;
  data_testid?: string;
  classname?: string;
  onChange: (t: any) => void;
};

const Input = ({
  placeholder,
  type = "text",
  textarea,
  password,
  disabled = false,
  required = false,
  name,
  optionalLabel,
  value,
  file,
  data_testid = "recipe-title-input",
  islabel = false,
  label,
  classname,
  onChange,
}: Props) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      {password ? (
        <div className="flex flex-col gap-1">
          {islabel && (
            <label className="text-sm font-semibold" htmlFor="">
              {label}
            </label>
          )}
          <div
            className={cn(
              "flex gap-1 justify-between border rounded-md border-[#D9D9D9] hover:border-[#747474] hover:bg-blue-50 -outline-offset-1 focus-within:outline-2 focus-within:outline-blue-500 transition-all focus-within:bg-[#f1f1f1]",
              classname
            )}
          >
            <input
              required
              name={name}
              onChange={onChange}
              disabled={disabled}
              placeholder={placeholder}
              value={value}
              type={showPassword ? "text" : "password"}
              className="outline-none bg-transparent w-full p-2"
            />
            <div
              onClick={() => setShowPassword((prev) => !prev)}
              className="w-12 p-2 min-w-[2rem] cursor-pointer text-gray-700 h-full flex justify-center items-center "
            >
              {showPassword ? (
                <BsEyeFill fontSize={24} />
              ) : (
                <BsEyeSlashFill fontSize={24} />
              )}
            </div>
          </div>
        </div>
      ) : textarea ? (
        <div className="flex flex-col gap-1 w-full">
          {islabel && (
            <div className="flex justify-between items-center gap-4">
              <label className="text-sm font-semibold" htmlFor="">
                {label}
              </label>
              {optionalLabel && (
                <span className="text-xs text-slate-700">{optionalLabel}</span>
              )}
            </div>
          )}
          <Textarea
            required
            name={name}
            disabled={disabled}
            value={value}
            data-testid={data_testid}
            minH={10}
            rows={5}
            onChange={onChange}
            autoFocus
            resize={"vertical"}
            autoCapitalize=""
            placeholder={placeholder}
            className="p-2 w-full px-3 outline-none border rounded-md border-[##D9D9D9
          ] hover:border-[#747474] w-full text-black hover:bg-blue-50  transition-all focus-within:bg-[#f1f1f1]"
          />
        </div>
      ) : file ? (
        <div className="flex flex-col gap-1 w-full">
          {islabel && (
            <div className="flex justify-between items-center gap-4">
              <label className="text-sm font-semibold" htmlFor="">
                {label}
              </label>
              {optionalLabel && (
                <span className="text-xs text-slate-700">{optionalLabel}</span>
              )}
            </div>
          )}
          <FileInput
            value={value}
            name={name}
            required={required}
            data-testid={data_testid}
            className={cn("pointer-events-none", classname)}
            accept=".png, .jpg, .jpeg"
            disabled={disabled}
          />
        </div>
      ) : (
        <div className="flex flex-col gap-1 w-full">
          {islabel && (
            <div className="flex justify-between items-center gap-4">
              <label className="text-sm font-semibold" htmlFor="">
                {label}
              </label>
              {optionalLabel && (
                <span className="text-xs text-slate-700">{optionalLabel}</span>
              )}
            </div>
          )}
          <input
            required
            name={name}
            type={type}
            data-testid={data_testid}
            disabled={disabled}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="p-2 w-full px-3 outline-none border rounded-md border-[#D9D9D9] text-black  -outline-offset-2 hover:bg-blue-50  transition-all focus-within:bg-[#f1f1f1]"
          />
        </div>
      )}
    </>
  );
};

export default Input;
