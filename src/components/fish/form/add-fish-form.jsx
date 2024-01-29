/* eslint-disable react/prop-types */
import { useState } from "react";
import classes from "../scss/fish.module.scss";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from "../../../utils/firebase";

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
    isDiscount: false,
    discountPercentage: 0,
    discountPriceIdr: 0,
    discountPriceUsd: 0,
    image1: "",
    image2: "",
    image3: "",
  });
  // console.log(formData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let finalValue;

    if (name === "price" || name === "price_usd" || name.includes("discount")) {
      finalValue = parseFloat(value) || 0;
    } else if (name === "isAvailable" || name === "isNewArrival" || name === "isEvent" || name === "isDiscount") {
      finalValue = value === "true";
    } else {
      finalValue = value;
    }

    setFormData({ ...formData, [name]: finalValue });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const storage = getStorage(app);
    const storageRef = ref(storage, "fish_images/" + file.name);

    try {
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      setFormData({ ...formData, [e.target.name]: downloadURL });
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const inputStyle = "input input-md w-full bg-white";
  const fileStyle = "file-input file-input-bordered file-input-primary w-full max-w-xs bg-white file-input-sm";

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
        <select id="isDiscount" name="isDiscount" className="bg-white select select-ghost select-sm " defaultValue="" onChange={handleChange}>
          <option value="" disabled>
            Pick one
          </option>
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>
      </div>
      <div className={classes.modalGridForm}>
        <label htmlFor="discountPercentage">Discount%</label>
        <input id="discountPercentage" name="discountPercentage" type="text" className={inputStyle} autoComplete="off" placeholder="Fill, if only you input yes on discount" onChange={handleChange} />
      </div>
      <div className={classes.modalGridForm}>
        <label htmlFor="discountPriceIdr">Discount IDR</label>
        <input id="discountPriceIdr" name="discountPriceIdr" type="text" className={inputStyle} autoComplete="off" placeholder="Fill, if only you input yes on discount" onChange={handleChange} />
      </div>
      <div className={classes.modalGridForm}>
        <label htmlFor="discountPriceUsd">Discount USD</label>
        <input id="discountPriceUsd" name="discountPriceUsd" type="text" className={inputStyle} autoComplete="off" placeholder="Fill, if only you input yes on discount" onChange={handleChange} />
      </div>
      <div className={classes.modalGridForm}>
        <label htmlFor="size">Size</label>
        <input id="size" name="size" type="text" className={inputStyle} autoComplete="off" onChange={handleChange} placeholder="optional" />
      </div>
      <div className={classes.modalGridForm}>
        <label htmlFor="videoURL">videoURL</label>
        <input id="videoURL" name="videoURL" type="text" className={inputStyle} autoComplete="off" onChange={handleChange} placeholder="optional" />
      </div>
      <div className={classes.modalGridForm}>
        <label htmlFor="desc">Description</label>
        <input id="desc" name="desc" type="text" className={inputStyle} autoComplete="off" onChange={handleChange} placeholder="optional" />
      </div>
      <div className="w-full h-[2px] bg-gray-300 opacity-75 my-2" />
      <div className={classes.modalGridForm}>
        <label htmlFor="image1">Main Image</label>
        <input id="image1" name="image1" type="file" className={fileStyle} onChange={handleFileChange} required />
      </div>
      <div className={classes.modalGridForm}>
        <label htmlFor="image2">Sub-Image 1</label>
        <input id="image2" name="image2" type="file" className={fileStyle} onChange={handleFileChange} />
      </div>
      <div className={classes.modalGridForm}>
        <label htmlFor="image3">Sub-Image 2</label>
        <input id="image3" name="image3" type="file" className={fileStyle} onChange={handleFileChange} />
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
