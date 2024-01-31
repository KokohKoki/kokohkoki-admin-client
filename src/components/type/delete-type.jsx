/* eslint-disable react/prop-types */
import { Trash2 } from "lucide-react";
import { deleteType } from "../../api/type-api";

export default function DeleteType({ fishTypeId, onDelete }) {
  const handleDeleteType = async () => {
    try {
      await deleteType(fishTypeId);
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
