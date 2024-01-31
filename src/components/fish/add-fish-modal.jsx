/* eslint-disable react/prop-types */

import { X } from "lucide-react";
import { useEffect } from "react";
import ReactDOM from "react-dom";
import classes from "./scss/fish.module.scss";
import AddFishForm from "./form/add-fish-form";
import { useAuth } from "../../context/use-context";
import { createFish } from "../../api/fish-api";

export default function AddFish({ isOpen, setIsOpen, types, onAdd, eventList }) {
  const { userToken } = useAuth();

  const handleAddFish = async (formData) => {
    try {
      await createFish(userToken, formData);
      if (onAdd) {
        onAdd();
      }
    } catch (error) {
      console.error("Failed to add fish:", error);
    } finally {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const body = document.querySelector("body");
    if (body) {
      if (isOpen) {
        body.style.overflowY = "hidden";
      } else {
        body.style.overflowY = "scroll";
      }
    }
  }, [isOpen]);

  const content = (
    <div className={classes.modal} onClick={() => setIsOpen(false)}>
      <button className="bg-none border-none text-gray-200 text-lg absolute cursor-pointer right-2 top-2">
        <X />
      </button>
      <div onClick={(e) => e.stopPropagation()} className={classes.modalCard}>
        <h1 className="text-xl flex justify-center text-rose-500 font-bold my-3">Add Fish</h1>
        <AddFishForm setIsOpen={setIsOpen} onSubmit={handleAddFish} types={types} eventList={eventList} />
      </div>
    </div>
  );

  if (!isOpen) return <></>;

  return ReactDOM.createPortal(content, document.getElementById("portal"));
}
