import { Button, Input, SelectInput } from "@/components/Input/Index";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useCategryQuery } from "@/redux/services/category.service";
import {
  useCreateRecipeMutation,
  useFetchRecipeMutation,
  useUpdateRecipeMutation,
} from "@/redux/services/recipe.service";
import { ModalCloseButton, ModalContent, ModalHeader } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { UPLOAD } from "@/redux/services/CONSTANTS";
import { closeModal } from "@/redux/features/slice/modal.slice";
import { toast } from "sonner";
import { setRerender } from "@/redux/features/slice/app.slice";

const RecipeModal = () => {
  const { data } = useAppSelector((state) => state.modal);
  const [isUpdate, setIsUpdate] = useState(false);
  const [id, setId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  useCategryQuery("");
  const [fetchRecipe] = useFetchRecipeMutation();
  const { categories } = useAppSelector((state) => state.app);

  const [createRecipe, { isLoading, isSuccess, isError, error }] =
    useCreateRecipeMutation();
  const [
    updateRecipe,
    {
      isLoading: _isLoading,
      isSuccess: _isSuccess,
      isError: _isError,
      error: _error,
    },
  ] = useUpdateRecipeMutation();
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const cats = categories.map((category) => {
    return category.title;
  });
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: cats[0],
    ingredients: "",
    file: "",
    instructions: "",
  });
  const handleInputChange = (e: any) => {
    setFormData((prev: any) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    if (data) {
      setIsUpdate(true);
      const info = JSON.parse(data);
      setId(info.id);
      fetchRecipe(info.id);
      const updateCat = categories.find((category) => {
        return category.id === info.category_id;
      });
      const ingredients = info.ingredients.join(", ");
      setFormData((prev: any) => ({
        ...prev,
        category: updateCat.title,
        ingredients,
        description: info.description,
        title: info.title,
        instructions: info.instructions,
      }));
    }
  }, [data]);

  const handleFileUpload = async (e: any) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_DEV_API}${UPLOAD}`,
        {
          file: e.target.files[0],
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data) {
        toast.success("file uploaded successfully");
        setSelectedFile(e.target.files[0]);
        setFormData((pre) => ({ ...pre, file: response?.data?.data }));
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.success("file upload unsuccessful");
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const category = categories.find((category) => {
      return category.title === formData.category;
    });
    const res: any = {
      title: formData.title,
      description: formData.description,
      category_id: category.id,
      ingredients: formData.ingredients,
      file: formData.file,
      instructions: formData.instructions,
    };
    if (isUpdate) {
      await updateRecipe({ ...res, id: id as string });
    } else {
      await createRecipe(res);
    }
  };

  useEffect(() => {
    if (_isSuccess) {
      toast.success("recipe updated successfully");

      dispatch(setRerender());
      dispatch(closeModal());
    }
    if (_isError) {
      toast.error(_error?.data?.message ?? "Network Error");
    }
  }, [_isSuccess, _isError]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("recipe created successfully");
      dispatch(setRerender());
      dispatch(closeModal());
    }
    if (isError) {
      toast.error(error?.data?.message ?? "Network Error");
    }
  }, [isSuccess, isError]);

  return (
    <ModalContent
      className="flex flex-col"
      w={"94%"}
      data-testid="recipe-modal"
    >
      <ModalHeader className="uppercase">
        {isUpdate ? "Update Recipe" : "Create Recipe"}
      </ModalHeader>
      <ModalCloseButton />
      <div className="h-[2px] w-full bg-indigo-500 opacity-20" />
      <form
        onSubmit={handleSubmit}
        action="
        "
        className="p-4 flex flex-col gap-4"
      >
        <Input
          placeholder={"What's the name of the dish"}
          islabel
          label="Title"
          name={"title"}
          value={formData.title}
          disabled={isLoading || _isLoading}
          onChange={handleInputChange}
        />
        <Input
          placeholder={"A brief description of the dish"}
          islabel
          label="Description"
          disabled={isLoading || _isLoading}
          name={"description"}
          value={formData.description}
          onChange={handleInputChange}
        />
        <Input
          placeholder={"What's the name of the dish"}
          islabel
          disabled={loading}
          file
          required={isUpdate ? false : true}
          label="Select an Image"
          name={"file"}
          value={selectedFile?.filename}
          onChange={handleFileUpload}
        />{" "}
        {loading && (
          <div className="h-1.5 w-full bg-slate-100 overflow-hidden">
            <div className="progress w-full h-full bg-slate-500 left-right" />
          </div>
        )}
        <div className="">
          <SelectInput
            options={isUpdate ? [formData.category, ...cats] : cats}
            name={"category"}
            islabel
            label="Category"
            disabled={isLoading || _isLoading}
            onChange={handleInputChange}
          />
        </div>
        <Input
          placeholder={"What are the ingredients you use"}
          islabel
          disabled={isLoading || _isLoading}
          textarea
          optionalLabel="(separate with a comma)"
          label="Ingredients"
          name={"ingredients"}
          value={formData.ingredients}
          onChange={handleInputChange}
        />
        <Input
          disabled={isLoading || _isLoading}
          placeholder={"Instructions on how to make the dish"}
          islabel
          textarea
          label="Instructions"
          name={"instructions"}
          value={formData.instructions}
          onChange={handleInputChange}
        />
        <div className="h-[2px] w-full bg-indigo-600 opacity-20" />
        <Button
          disabled={loading}
          isLoading={isLoading || _isLoading}
          name={isUpdate ? "Update" : "Create"}
        />
      </form>
      {/* {isLoading && <SpinnerPage />} */}
    </ModalContent>
  );
};

export default RecipeModal;
