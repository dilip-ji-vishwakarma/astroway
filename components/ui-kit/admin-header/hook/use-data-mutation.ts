/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";

export const useDataMutation = () => {
  const {
          handleSubmit,
          control,
          reset,
          formState: { errors, isSubmitting },
        } = useForm();

  const onSubmit = async (formProp: any) => {
    console.log("Submitting...", formProp);
    alert(JSON.stringify(formProp, null, 2));
  };

  const onFormSubmit = async (data: any) => {
    console.log("Submitting...", data);
    alert(JSON.stringify(data, null, 2));
    reset();
  };

  return { onSubmit, onFormSubmit, handleSubmit, control, isSubmitting, errors};
};
