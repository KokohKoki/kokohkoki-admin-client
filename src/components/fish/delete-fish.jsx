/* eslint-disable react/prop-types */
import { Trash2 } from "lucide-react";
import { useAuth } from "../../context/use-context";
import { deleteFish } from "../../api/fish-api";

export default function DeleteFish({ fishId, onDelete }) {
  const { userToken } = useAuth();

  const handleDeleteFish = async () => {
    const isConfirmed = window.confirm("Are you sure you want to delete this fish?");

    if (isConfirmed) {
      try {
        await deleteFish(userToken, fishId);
        if (onDelete) {
          onDelete();
        }
      } catch (error) {
        console.error("Failed to delete fish:", error);
      }
    } else {
      return;
    }
  };

  return (
    <button type="submit" onClick={handleDeleteFish}>
      <Trash2 size={20} className="text-rose-500 transition duration-150 hover:text-rose-800" />
    </button>
  );
}
