import { Row } from "@tanstack/react-table";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const convertToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

export const convertUrlToBase64 = async (url: string): Promise<string> => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const file = new File([blob], "image.png", { type: blob.type });
    return await convertToBase64(file);
  } catch (error) {
    console.error("URL conversion failed:", error);
    throw error;
  }
};

export const exportTableData = <TData>(
  rows: Row<TData>[],
  format: "csv" | "excel",
  filename: string = "data",
) => {
  if (!rows || !rows.length) return;

  // Get headers from the first row's original data keys
  // Note: This assumes data is an object. For more complex column structures, you might need to map column headers.
  const headers = Object.keys(rows[0].original as Record<string, unknown>).join(
    ",",
  );

  // Map rows to CSV format
  const csvContent = [
    headers,
    ...rows.map((row) => {
      const rowData = row.original as Record<string, unknown>;
      return Object.values(rowData)
        .map((value) => `"${String(value).replace(/"/g, '""')}"`) // Escape quotes
        .join(",");
    }),
  ].join("\n");

  const blob = new Blob([csvContent], {
    type:
      format === "excel"
        ? "application/vnd.ms-excel;charset=utf-8"
        : "text/csv;charset=utf-8",
  });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute(
    "download",
    `${filename}.${format === "excel" ? "xls" : "csv"}`,
  );
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
