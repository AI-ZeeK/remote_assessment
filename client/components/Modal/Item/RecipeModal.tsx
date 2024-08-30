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
import { closeModal } from "@/redux/features/slice/modal.slice";
import { toast } from "sonner";
import { setRerender } from "@/redux/features/slice/app.slice";
import { CldUploadButton } from "next-cloudinary";

const RecipeModal = () => {
  const { data } = useAppSelector((state) => state.modal);
  const [isUpdate, setIsUpdate] = useState(false);
  const [id, setId] = useState<string | null>(null);
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
  const [selectedFile, setSelectedFile] = useState<string>("");
  const cats = categories.map((category) => {
    return category?.title;
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
      setId(info?.id);
      fetchRecipe(info?.id);
      const updateCat = categories.find((category) => {
        return category.id === info?.category_id;
      });
      const ingredients = info.ingredients.join(", ");
      setFormData((prev: any) => ({
        ...prev,
        category: updateCat?.title,
        ingredients,
        description: info.description,
        title: info?.title,
        instructions: info?.instructions,
      }));
    }
  }, [data]);

  const handleUploadSuccess = async (result: any) => {
    const url = await result.info.secure_url;
    console.log("url", result.info.original_filename);
    setSelectedFile(result.info.original_filename);
    setFormData((pre) => ({ ...pre, file: url }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const category = categories.find((category) => {
      return category.title === formData.category;
    });
    const res: any = {
      title: formData?.title,
      description: formData?.description,
      category_id: category?.id,
      ingredients: formData.ingredients,
      file: formData?.file,
      instructions: formData?.instructions,
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
          data_testid="recipe-title-input"
          name={"title"}
          value={formData?.title}
          disabled={isLoading || _isLoading}
          onChange={handleInputChange}
        />
        <Input
          placeholder={"A brief description of the dish"}
          islabel
          data_testid="recipe-description-input"
          label="Description"
          disabled={isLoading || _isLoading}
          name={"description"}
          value={formData.description}
          onChange={handleInputChange}
        />
        <CldUploadButton
          uploadPreset="assessment"
          data-testid="file-upload-status"
          onSuccess={(result) => handleUploadSuccess(result)}
        >
          <Input
            placeholder={"What's the name of the dish"}
            data-testid="file-input"
            islabel
            data_testid="recipe-file-input"
            file
            label="Select an Image"
            name={"file"}
            onChange={() => {}}
          />
        </CldUploadButton>
        {selectedFile && <p className="p-2">Selected file: {selectedFile}</p>}
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
          data_testid="recipe-ingredients-input"
          value={formData.ingredients}
          onChange={handleInputChange}
        />
        <Input
          disabled={isLoading || _isLoading}
          placeholder={"Instructions on how to make the dish"}
          islabel
          textarea
          label="Instructions"
          data_testid="recipe-instructions-input"
          name={"instructions"}
          value={formData.instructions}
          onChange={handleInputChange}
        />
        <div className="h-[2px] w-full bg-indigo-600 opacity-20" />
        <Button
          isLoading={isLoading || _isLoading}
          name={isUpdate ? "Update" : "Create"}
        />
      </form>
      {/* {isLoading && <SpinnerPage />} */}
    </ModalContent>
  );
};

export default RecipeModal;
