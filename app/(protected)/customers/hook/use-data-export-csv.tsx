/* eslint-disable @typescript-eslint/no-explicit-any */
export const useDataExportCSV = (response: any) => {
    const convertToCSV = (data: any[]) => {
  if (!data || data.length === 0) return "";

  const headers = Object.keys(data[0]).join(",");
  const rows = data.map((row) =>
    Object.values(row)
      .map((value) => `"${String(value ?? "").replace(/"/g, '""')}"`)
      .join(",")
  );

  return [headers, ...rows].join("\n");
};

const downloadCSV = (csv: string, filename: string) => {
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const handleExportCSV = () => {
    const data = response?.data || response;
    if (!data || data.length === 0) {
      alert("No data to export");
      return;
    }

    const csv = convertToCSV(data);
    downloadCSV(csv, "customers.csv");
  };

  return {handleExportCSV};
};