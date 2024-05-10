import { toast } from "react-toastify";

export const notify = (type: string, message: string) => {
  if (type === "success") {
    toast.success(message);
  }
  if (type === "error") {
    toast.error(message);
  }
  if (type === "info") {
    toast.info(message);
  }
};
