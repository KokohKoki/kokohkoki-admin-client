/* eslint-disable react/prop-types */

import { useEffect } from "react";
import ReactDOM from "react-dom";
import classes from "./scss/fish.module.scss";
import { X } from "lucide-react";

export default function FishModal({ isOpen, setIsOpen, name, type, gender, price, price_usd, size, videoURL, discount, isAvailable, isEvent, isNewArrival }) {
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

  const inputStyle = "input input-md w-full bg-white";

  const content = (
    <div className={classes.modal} onClick={() => setIsOpen(false)}>
      <button className="bg-none border-none text-gray-200 text-lg absolute cursor-pointer right-2 top-2">
        <X />
      </button>
      <div onClick={(e) => e.stopPropagation()} className={classes.modalCard}>
        <form className="flex flex-col gap-2 my-4 justify-start text-gray-700 mx-2 font-medium">
          <div className={classes.modalGridForm}>
            <label htmlFor="isAvailable">Available</label>
            <select id="isAvailable" defaultValue={isAvailable} className="bg-white select select-ghost select-sm">
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>
          <div className={classes.modalGridForm}>
            <label htmlFor="name">Name</label>
            <input id="name" type="text" defaultValue={name} className={inputStyle} autoComplete="off" />
          </div>
          <div className={classes.modalGridForm}>
            <label htmlFor="gender">Gender</label>
            <input id="gender" type="text" defaultValue={gender} className={inputStyle} autoComplete="off" />
          </div>
          <div className={classes.modalGridForm}>
            <label htmlFor="type">Type</label>
            <input id="type" type="text" defaultValue={type} className={inputStyle} autoComplete="off" />
          </div>
          <div className="w-full h-[2px] bg-gray-300 opacity-75 my-2" />
          <div className={classes.modalGridForm}>
            <label htmlFor="price">Price IDR</label>
            <input id="price" type="text" defaultValue={price} className={inputStyle} autoComplete="off" />
          </div>
          <div className={classes.modalGridForm}>
            <label htmlFor="price_usd">Price USD</label>
            <input id="price_usd" type="text" defaultValue={price_usd} className={inputStyle} autoComplete="off" />
          </div>
          <div className="w-full h-[2px] bg-gray-300 opacity-75 my-2" />
          <div className={classes.modalGridForm}>
            <label htmlFor="isNewArrival">New Arrival</label>
            <select id="isNewArrival" defaultValue={isNewArrival} className="bg-white select select-ghost select-sm">
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>
          <div className={classes.modalGridForm}>
            <label htmlFor="isEvent">Event</label>
            <select id="isEvent" defaultValue={isEvent} className="bg-white select select-ghost select-sm">
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>
          <div className="w-full h-[2px] bg-gray-300 opacity-75 my-2" />
          <div className={classes.modalGridForm}>
            <label htmlFor="isDiscount">Discount</label>
            <select id="isDiscount" defaultValue={discount?.isDiscount} className="bg-white select select-ghost select-sm ">
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>
          <div className={classes.modalGridForm}>
            <label htmlFor="Percentage">Discount%</label>
            <input id="Percentage" type="text" defaultValue={discount?.discountPercentage} className={inputStyle} autoComplete="off" />
          </div>
          <div className={classes.modalGridForm}>
            <label htmlFor="discountIDR">Discount IDR</label>
            <input id="discountIDR" type="text" defaultValue={discount?.discountPriceIdr} className={inputStyle} autoComplete="off" />
          </div>
          <div className={classes.modalGridForm}>
            <label htmlFor="discountUSD">Discount IDR</label>
            <input id="discountUSD" type="text" defaultValue={discount?.discountPriceUsd} className={inputStyle} autoComplete="off" />
          </div>
          <div className="w-full h-[2px] bg-gray-300 opacity-75 my-2" />
          <div className={classes.modalGridForm}>
            <label htmlFor="size">Size</label>
            <input id="size" type="text" defaultValue={size} className={inputStyle} autoComplete="off" />
          </div>
          <div className={classes.modalGridForm}>
            <label htmlFor="videoURL">videoURL</label>
            <input id="videoURL" type="text" defaultValue={videoURL} className={inputStyle} autoComplete="off" />
          </div>
          <div className="flex gap-2 justify-end">
            <button type="reset" onClick={() => setIsOpen(false)} className="px-4 py-1.5 rounded-lg mt-4 text-white bg-rose-500 border-none transition duration-150 ease-in-out hover:opacity-75">
              Close
            </button>
            <button type="submit" className="px-4 py-1.5 rounded-lg mt-4 text-white bg-green-500 border-none transition duration-150 ease-in-out hover:opacity-75">
              Edit
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  if (!isOpen) return <></>;

  return ReactDOM.createPortal(content, document.getElementById("portal"));
}
