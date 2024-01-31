/* eslint-disable react/prop-types */

import { createType } from "../../api/type-api";
import { useAuth } from "../../context/use-context";

export default function AddType({ isOpen, setIsOpen, onAdd }) {
  const { userToken } = useAuth();

  const handleAddType = async (name) => {
    try {
      await createType(name);
      if (onAdd) {
        onAdd();
      }
    } catch (error) {
      console.error("Failed to add type:", error);
    } finally {
      setIsOpen(false);
    }
  };

  return <></>;
}
