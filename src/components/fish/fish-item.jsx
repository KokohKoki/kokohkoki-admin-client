/* eslint-disable react/prop-types */
import { idrFormatter, usdFormatter } from "../../utils/formatter";
import { Pen, Trash2 } from "lucide-react";
import classes from "./scss/fish.module.scss";
import { useState } from "react";
import FishModal from "./fish-modal";

export default function FishItem({ name, type, gender, price, price_usd, size, videoURL, discount, images, isAvailable, isEvent, isNewArrival }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className={`${classes.fishes} flex gap-2 items-start`}>
        <div className="h-24 w-24">
          <img src={images?.image1} className="aspect-square object-cover rounded-lg shadow" />
        </div>
        <div className="text-black w-full text-start text-sm flex flex-col">
          <p>
            Name: <span>{name}</span>
          </p>
          <p>
            Available: <span>{isAvailable ? "Yes" : "No"}</span>
          </p>
          <p className="flex flex-wrap gap-0 ">
            New Arrival:&nbsp;<span> {isNewArrival ? "Yes" : "No"}</span>&nbsp;-&nbsp;Event:&nbsp;<span> {isEvent ? "Yes" : "No"}</span>
          </p>
          <p></p>
          <p>
            Price:{" "}
            <span>
              {idrFormatter(price)} - {usdFormatter(price_usd)}
            </span>
          </p>
          <div className="flex flex-col">
            <p>
              Discount: <span>{discount?.isDiscount ? "Yes" : "No"}</span>
            </p>
            {discount?.isDiscount && (
              <p>
                Discount Price:{" "}
                <span className="italic">
                  {idrFormatter(discount?.discountPriceIdr)} - {usdFormatter(discount?.discountPriceUsd)}
                </span>
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div onClick={() => setIsOpen(true)}>
            <Pen size={20} className="text-rose-500 transition duration-150 hover:text-green-500" />
          </div>
          <div>
            <Trash2 size={20} className="text-rose-500 transition duration-150 hover:text-rose-800" />
          </div>
        </div>
      </div>
      <div className="w-full h-[2px] bg-gray-500 opacity-80 my-2" />
      <FishModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        name={name}
        type={type}
        gender={gender}
        price={price}
        price_usd={price_usd}
        size={size}
        videoURL={videoURL}
        discount={discount}
        isAvailable={isAvailable}
        isEvent={isEvent}
        isNewArrival={isNewArrival}
      />
    </>
  );
}
