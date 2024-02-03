/* eslint-disable react/prop-types */
import { Trash2 } from "lucide-react";
import { deleteType } from "../../api/type-api";
import { useAuth } from "../../context/use-context";

export default function DeleteType({ fishTypeId, onDelete }) {
  const { userToken } = useAuth();

  const handleDeleteType = async () => {
    try {
      await deleteType(fishTypeId, userToken);
      if (onDelete) {
        onDelete();
      }
    } catch (error) {
      console.error("Failed to delete ty[e]:", error);
    }
  };
  return (
    <button type="submit" onClick={handleDeleteType}>
      <Trash2 size={20} className="text-rose-500 transition duration-150 hover:text-rose-800" />
    </button>
  );
}
