/* eslint-disable @typescript-eslint/no-explicit-any */
export const useDataMutation = () => {
  const onSubmit = async (formProp: any) => {
      console.log("Submitting...", formProp);
  alert(JSON.stringify(formProp, null, 2));
  };

  return { onSubmit};
};