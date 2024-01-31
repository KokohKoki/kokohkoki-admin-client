/* eslint-disable react/prop-types */
import { Trash2 } from "lucide-react";
import { useAuth } from "../../context/use-context";
import { deleteCoupon } from "../../api/coupon-api";

export default function DeleteCoupon({ onDelete, couponName }) {
  const { userToken } = useAuth();

  const handleDeleteCoupon = async () => {
    try {
      await deleteCoupon(userToken, couponName);
      if (onDelete) {
        onDelete();
      }
    } catch (error) {
      console.error("Failed to delete coupon:", error);
    }
  };

  return (
    <button type="submit" onClick={handleDeleteCoupon}>
      <Trash2 size={20} className="text-rose-500 transition duration-150 hover:text-rose-800" />
    </button>
  );
}
