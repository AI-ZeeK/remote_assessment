/* eslint-disable react/no-unescaped-entities */
import { Button, Input } from "@/components/Input/Index";
import SpinnerPage from "@/components/Spinner/Spinner";
import { closeModal } from "@/redux/features/slice/modal.slice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  useLoginMutation,
  useSignupMutation,
} from "@/redux/services/user.service";
import {
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  useToast,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoIosUnlock } from "react-icons/io";

type Props = {};

const AuthModal = () => {
  const toast = useToast();
  const [isRegister, setIsRegister] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [login, { isLoading, error, isSuccess, data }] = useLoginMutation();
  const [
    register,
    {
      isLoading: regIsLoading,
      error: regError,
      isSuccess: regIsSuccess,
      data: regData,
    },
  ] = useSignupMutation();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const [passwordUpperCase, setPasswordUpperCase] = useState(false); // State to check if the password contains an upper case letter
  const [passwordLowerCase, setPasswordLowerCase] = useState(false); // State to check if the password contains a lower case letter
  const [passwordNumber, setPasswordNumber] = useState(false); // State to check if the password contains a number
  const [passwordChar, setPasswordChar] = useState(false);
  const [isMatch, setIsMatch] = useState(false);
  const { user } = useAppSelector((state) => state.user);
  const handleInputChange = (e: any) => {
    setFormData((prev: any) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    if (isRegister) {
      // Check if the password meets the requirements
      const hasUppercase = /[A-Z]/.test(formData.password);
      const hasLowercase = /[a-z]/.test(formData.password);
      const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(
        formData.password
      );
      const hasNumber = /[0-9]/.test(formData.password);
      if (!hasUppercase) {
        setPasswordUpperCase(true);
      } else {
        setPasswordUpperCase(false);
      }
      if (!hasLowercase) {
        setPasswordLowerCase(true);
      } else {
        setPasswordLowerCase(false);
      }
      if (!hasSpecialChar) {
        setPasswordChar(true);
      } else {
        setPasswordChar(false);
      }
      if (!hasNumber) {
        setPasswordNumber(true);
      } else {
        setPasswordNumber(false);
      }
    }
  }, [isRegister, formData.password]);

  useEffect(() => {
    if (isRegister) {
      if (formData.password !== formData.confirm_password) {
        setIsMatch(true);
      } else {
        setIsMatch(false);
      }
    }
  }, [isRegister, formData.confirm_password]);

  useEffect(() => {
    if (!isRegister) {
      setPasswordUpperCase(false);
      setPasswordLowerCase(false);
      setPasswordChar(false);
      setPasswordNumber(false);
    }
  }, [isRegister]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      if (isRegister) {
        if (formData.password !== formData.confirm_password) {
          toast({
            title: "Error!",
            description: "password and confirm password must match",
            status: "error",
            duration: 2000,
            isClosable: true,
          });
          return;
        }
        await register(formData);
      } else {
        await login(formData);
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    if (regIsSuccess) {
      toast({
        title: "Success!",
        description: regData.message,
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      router.push("/");
      dispatch(closeModal());
    }
    if (regError) {
      toast({
        title: "Error!",
        description: regError.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [regIsSuccess, regError]);

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Success!",
        description: data.message,
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      router.push("/");
      dispatch(closeModal());
    }
    if (error) {
      console.log(error);
      toast({
        title: "Error!",
        description: !error.data ? "Network Error" : error.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [error, isSuccess]);
  return (
    <ModalContent w={"94%"} className="bg flex flex-col overflow-hidden">
      <ModalHeader className="uppercase">
        {isRegister ? "Create an Account" : "Login"}
      </ModalHeader>
      <ModalCloseButton />
      <div className="h-[2px] w-full bg-indigo-500 opacity-20" />
      <form
        onSubmit={handleSubmit}
        action="
        "
        className="p-4 flex flex-col gap-4"
      >
        {isRegister && (
          <>
            <Input
              placeholder={"enter your first name"}
              islabel
              label="First Name"
              name={"firstname"}
              value={formData.firstname}
              onChange={handleInputChange}
            />
            <Input
              placeholder={"enter your last name"}
              islabel
              label="Last Name"
              name={"lastname"}
              value={formData.lastname}
              onChange={handleInputChange}
            />
          </>
        )}
        <Input
          placeholder={"enter your email address"}
          islabel
          label="Email Address"
          name={"email"}
          type="email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <Input
          placeholder={"******"}
          islabel
          label="Password"
          name={"password"}
          password
          value={formData.password}
          onChange={handleInputChange}
        />
        <div className={`lg:col-span-2 lg:col-start-2`}>
          <div
            className={`overflow-hidden  ${
              passwordUpperCase ? "h-4" : "h-0"
            } transition-all`}
          >
            <p
              className={`text-xs text-red-800 transition-all ${
                passwordUpperCase ? "opacity-1" : "opacity-0"
              }`}
            >
              *password must contain capital letters*
            </p>
          </div>
          <div
            className={`overflow-hidden  ${
              passwordNumber ? "h-4" : "h-0"
            } transition-all `}
          >
            <p
              className={`text-xs text-red-800 transition-all ${
                passwordNumber ? "opacity-1" : "opacity-0"
              }`}
            >
              *password must contain numbers*
            </p>
          </div>

          <div
            className={`overflow-hidden  ${
              passwordChar ? "h-4" : "h-0"
            } transition-all`}
          >
            <p
              className={`text-xs text-red-800 transition-all ${
                passwordChar ? "opacity-1" : "opacity-0"
              }`}
            >
              *password must contain special characters like "@#$%^&"*
            </p>
          </div>
          <div
            className={`overflow-hidden  ${
              passwordLowerCase ? "h-4" : "h-0"
            } transition-all`}
          >
            <p
              className={`text-xs text-red-800 transition-all ${
                passwordLowerCase ? "opacity-1" : "opacity-0"
              }`}
            >
              *password must contain small letters*
            </p>
          </div>
        </div>

        {isRegister && (
          <>
            <Input
              placeholder={"******"}
              islabel
              label="Confirm Password"
              name={"confirm_password"}
              value={formData.confirm_password}
              password
              onChange={handleInputChange}
            />
            <div
              className={`overflow-hidden  ${
                isMatch ? "h-4" : "h-0"
              } transition-all`}
            >
              <p
                className={`text-xs text-red-800 transition-all ${
                  isMatch ? "opacity-1" : "opacity-0"
                }`}
              >
                *password and confirm password must match*
              </p>
            </div>
          </>
        )}
        <div className="h-[2px] w-full bg-indigo-500 opacity-20" />
        <Button name={isRegister ? "Register" : "Login"} />
        <div className="flex justify-center items-center relative">
          <div
            onClick={() => setIsRegister((prev) => !prev)}
            className="flex gap-2 justify-center items-center text-sm underline cursor-pointer"
          >
            <span>
              {isRegister
                ? `Already have an account? Login`
                : `Don't have an account? Register`}
            </span>
          </div>
        </div>
      </form>
      {(isLoading || regIsLoading) && <SpinnerPage />}
    </ModalContent>
  );
};

export default AuthModal;
