/* eslint-disable react/prop-types */

import { useEffect } from "react";
import ReactDOM from "react-dom";
import classes from "./scss/fish.module.scss";
import { X } from "lucide-react";
import EditFishForm from "./form/edit-fish-form";
import { useAuth } from "../../context/use-context";
import { editFish } from "../../api/fish-api";

export default function FishModal({ isOpen, setIsOpen, name, type, gender, price, price_usd, size, videoURL, discount, isAvailable, isEvent, isNewArrival }) {
  const { userToken } = useAuth();

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

  const handleEdit = async (formData) => {
    try {
      await editFish(userToken, formData);
    } catch (error) {
      console.error("Failed to edit fish:", error);
    } finally {
      setIsOpen(false);
    }
  };

  const content = (
    <div className={classes.modal} onClick={() => setIsOpen(false)}>
      <button className="bg-none border-none text-gray-200 text-lg absolute cursor-pointer right-2 top-2">
        <X />
      </button>
      <div onClick={(e) => e.stopPropagation()} className={classes.modalCard}>
        <EditFishForm
          isAvailable={isAvailable}
          name={name}
          gender={gender}
          type={type}
          price={price}
          price_usd={price_usd}
          size={size}
          videoURL={videoURL}
          discount={discount}
          isEvent={isEvent}
          isNewArrival={isNewArrival}
          setIsOpen={setIsOpen}
        />
      </div>
    </div>
  );

  if (!isOpen) return <></>;

  return ReactDOM.createPortal(content, document.getElementById("portal"));
}
