/* eslint-disable react/prop-types */
import { useState } from "react";
import classes from "../scss/fish.module.scss";

export default function AddFishForm({ setIsOpen, onSubmit, types }) {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    type: "",
    price: "",
    price_usd: "",
    size: "",
    videoURL: "",
    desc: "",
    isAvailable: "",
    isNewArrival: "",
    isEvent: "",
  });
  console.log(formData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let finalValue;

    if (name === "price" || name === "price_usd") {
      finalValue = parseFloat(value) || 0;
    } else if (name === "isAvailable" || name === "isNewArrival" || name === "isEvent") {
      finalValue = value === "true";
    } else {
      finalValue = value;
    }
    setFormData({ ...formData, [name]: finalValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const inputStyle = "input input-md w-full bg-white";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 my-4 justify-start text-gray-700 mx-2 font-medium">
      <div className={classes.modalGridForm}>
        <label htmlFor="isAvailable">Available</label>
        <select id="isAvailable" name="isAvailable" className="bg-white select select-ghost select-sm" defaultValue="" onChange={handleChange}>
          <option value="" disabled>
            Pick one
          </option>
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>
      </div>
      <div className={classes.modalGridForm}>
        <label htmlFor="name">Name</label>
        <input id="name" name="name" type="text" className={inputStyle} autoComplete="off" onChange={handleChange} />
      </div>
      <div className={classes.modalGridForm}>
        <label htmlFor="gender">Gender</label>
        <select id="gender" name="gender" className="bg-white select select-ghost select-sm" onChange={handleChange} defaultValue="">
          <option value="" disabled>
            Pick one
          </option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      <div className={classes.modalGridForm}>
        <label htmlFor="type">Type</label>
        <select id="type" name="type" className="bg-white select select-ghost select-sm" onChange={handleChange} defaultValue="">
          <option value="" disabled>
            Pick one
          </option>
          {types.map((type) => (
            <option key={type._id} value={type.name}>
              {type.name}
            </option>
          ))}
        </select>
      </div>
      <div className={classes.modalGridForm}>
        <label htmlFor="price">Price IDR</label>
        <input id="price" name="price" type="text" className={inputStyle} autoComplete="off" onChange={handleChange} />
      </div>
      <div className={classes.modalGridForm}>
        <label htmlFor="price_usd">Price USD</label>
        <input id="price_usd" name="price_usd" type="text" className={inputStyle} autoComplete="off" onChange={handleChange} />
      </div>
      <div className={classes.modalGridForm}>
        <label htmlFor="isNewArrival">New Arrival</label>
        <select id="isNewArrival" name="isNewArrival" className="bg-white select select-ghost select-sm" defaultValue="" onChange={handleChange}>
          <option value="" disabled>
            Pick one
          </option>
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>
      </div>
      <div className={classes.modalGridForm}>
        <label htmlFor="isEvent">Event</label>
        <select id="isEvent" name="isEvent" className="bg-white select select-ghost select-sm" defaultValue="" onChange={handleChange}>
          <option value="" disabled>
            Pick one
          </option>
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>
      </div>
      <div className={classes.modalGridForm}>
        <label htmlFor="isDiscount">Discount</label>
        <select id="isDiscount" name="isDiscount" className="bg-white select select-ghost select-sm " defaultValue="">
          <option value="" disabled>
            Pick one
          </option>
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>
      </div>
      <div className={classes.modalGridForm}>
        <label htmlFor="Percentage">Discount%</label>
        <input id="Percentage" name="Percentage" type="text" className={inputStyle} autoComplete="off" />
      </div>
      <div className={classes.modalGridForm}>
        <label htmlFor="discountIDR">Discount IDR</label>
        <input id="discountIDR" name="discountIDR" type="text" className={inputStyle} autoComplete="off" />
      </div>
      <div className={classes.modalGridForm}>
        <label htmlFor="discountUSD">Discount USD</label>
        <input id="discountUSD" name="discountUSD" type="text" className={inputStyle} autoComplete="off" />
      </div>
      <div className={classes.modalGridForm}>
        <label htmlFor="size">Size</label>
        <input id="size" name="size" type="text" className={inputStyle} autoComplete="off" onChange={handleChange} />
      </div>
      <div className={classes.modalGridForm}>
        <label htmlFor="videoURL">videoURL</label>
        <input id="videoURL" name="videoURL" type="text" className={inputStyle} autoComplete="off" onChange={handleChange} />
      </div>
      <div className={classes.modalGridForm}>
        <label htmlFor="desc">Description</label>
        <input id="desc" name="desc" type="text" className={inputStyle} autoComplete="off" onChange={handleChange} />
      </div>
      <div className="flex gap-2 justify-end">
        <button type="reset" onClick={() => setIsOpen(false)} className="px-4 py-1.5 rounded-lg mt-4 text-white bg-rose-500 border-none transition duration-150 ease-in-out hover:opacity-75">
          Close
        </button>
        <button type="submit" className="px-4 py-1.5 rounded-lg mt-4 text-white bg-green-500 border-none transition duration-150 ease-in-out hover:opacity-75">
          Add
        </button>
      </div>
    </form>
  );
}