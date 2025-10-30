export const useDataMutation = () => {

  const handleDelete = (id: number) => {
    alert(id)
  };

  return {
    handleDelete,
  };
};
