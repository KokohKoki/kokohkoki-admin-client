/* eslint-disable react/prop-types */
import { useState } from "react";
import classes from "../scss/fish.module.scss";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from "../../../utils/firebase";
import { ImagePlus } from "lucide-react";

export default function EditFishForm({ isAvailable, name, gender, type, price, price_usd, images, size, desc, videoURL, discount, isEvent, event, isNewArrival, setIsOpen, onSubmit, typesData, eventList }) {
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    name: name,
    gender: gender,
    type: type,
    price: price,
    price_usd: price_usd,
    size: size,
    videoURL: videoURL,
    desc: desc,
    isAvailable: isAvailable,
    isNewArrival: isNewArrival,
    isEvent: isEvent,
    event: event,
    isDiscount: discount?.isDiscount || false,
    discountPercentage: discount?.discountPercentage || 0,
    discountPriceIdr: discount?.discountPriceIdr || 0,
    discountPriceUsd: discount?.discountPriceUsd || 0,
    image1: images?.image1,
    image2: images?.image2,
    image3: images?.image3,
  });

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

    setFormData((prevFormData) => {
      const newFormData = { ...prevFormData, [name]: finalValue };
      if (name === "discountPercentage") {
        const discountRate = finalValue / 100;
        if (newFormData.price) {
          newFormData.discountPriceIdr = newFormData.price - newFormData.price * discountRate;
        }
        if (newFormData.price_usd) {
          newFormData.discountPriceUsd = newFormData.price_usd - newFormData.price_usd * discountRate;
        }
      } else if (name === "price" || name === "price_usd") {
        const discountRate = newFormData.discountPercentage / 100;
        if (name === "price") {
          newFormData.discountPriceIdr = finalValue - finalValue * discountRate;
        } else if (name === "price_usd") {
          newFormData.discountPriceUsd = finalValue - finalValue * discountRate;
        }
      }

      return newFormData;
    });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const maxFileSize = 1024 * 1024;

    if (file.size > maxFileSize) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        [e.target.name]: "The image size should not exceed 1MB",
      }));
      return;
    }

    const storage = getStorage(app);
    const storageRef = ref(storage, "fish_images/" + file.name);

    try {
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        [e.target.name]: undefined,
      }));
      setFormData({ ...formData, [e.target.name]: downloadURL });
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const hasErrors = Object.values(formErrors).some((error) => error !== undefined);

    if (hasErrors) {
      // console.log("not submitted error");
      return;
    }

    onSubmit(formData);
    setFormErrors({});
  };

  const inputStyle = "input input-md w-full bg-white";
  const fileStyle = "file-input file-input-bordered file-input-primary w-full max-w-xs bg-white file-input-sm";
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 my-4 justify-start text-gray-700 mx-2 font-medium">
      <div className={classes.modalGridForm}>
        <label htmlFor="isAvailable">Available</label>
        <select id="isAvailable" name="isAvailable" className="bg-white select select-ghost select-sm" value={formData.isAvailable} onChange={handleChange}>
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>
      </div>
      <div className={classes.modalGridForm}>
        <label htmlFor="name">Name</label>
        <input id="name" name="name" type="text" className={inputStyle} autoComplete="off" value={formData.name} onChange={handleChange} />
      </div>
      <div className={classes.modalGridForm}>
        <label htmlFor="gender">Gender</label>
        <select id="gender" name="gender" className="bg-white select select-ghost select-sm" value={formData.gender} onChange={handleChange}>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      <div className={classes.modalGridForm}>
        <label htmlFor="type">Type</label>
        <select id="type" name="type" className="bg-white select select-ghost select-sm" value={formData.type} onChange={handleChange}>
          {typesData.map((type) => (
            <option key={type._id} value={type.name}>
              {type.name}
            </option>
          ))}
        </select>
      </div>
      <div className="w-full h-[2px] bg-gray-300 opacity-75 my-2" />
      <div className={classes.modalGridForm}>
        <label htmlFor="price">Price IDR</label>
        <input id="price" name="price" type="number" className={inputStyle} autoComplete="off" value={formData.price} onChange={handleChange} />
      </div>
      <div className={classes.modalGridForm}>
        <label htmlFor="price_usd">Price USD</label>
        <input id="price_usd" name="price_usd" type="number" className={inputStyle} autoComplete="off" value={formData.price_usd} onChange={handleChange} />
      </div>
      <div className="w-full h-[2px] bg-gray-300 opacity-75 my-2" />
      <div className={classes.modalGridForm}>
        <label htmlFor="isNewArrival">New Arrival</label>
        <select id="isNewArrival" name="isNewArrival" className="bg-white select select-ghost select-sm" value={formData.isNewArrival} onChange={handleChange}>
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>
      </div>
      <div className="w-full h-[2px] bg-gray-300 opacity-75 my-2" />
      <div className={classes.modalGridForm}>
        <label htmlFor="isEvent">Is Event ?</label>
        <select id="isEvent" name="isEvent" className="bg-white select select-ghost select-sm" value={formData.isEvent} onChange={handleChange}>
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>
      </div>
      <div className={classes.modalGridForm}>
        <label htmlFor="event">Change Event</label>
        <select id="event" name="event" className="bg-white select select-ghost select-sm" value={formData.event} onChange={handleChange}>
          <option value="">Pick one (only if you pick yes above)</option>
          {eventList.map((event) => (
            <option key={event._id} value={event.name}>
              {event.name}
            </option>
          ))}
        </select>
      </div>
      <div className="w-full h-[2px] bg-gray-300 opacity-75 my-2" />
      <div className={classes.modalGridForm}>
        <label htmlFor="isDiscount">Discount</label>
        <select id="isDiscount" name="isDiscount" className="bg-white select select-ghost select-sm " value={formData.isDiscount} onChange={handleChange}>
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>
      </div>
      <div className={classes.modalGridForm}>
        <label htmlFor="discountPercentage">Discount%</label>
        <input id="discountPercentage" name="discountPercentage" type="number" className={inputStyle} autoComplete="off" value={formData.discountPercentage} onChange={handleChange} />
      </div>
      <div className={classes.modalGridForm}>
        <label htmlFor="discountPriceIdr">Discount IDR</label>
        <input id="discountPriceIdr" name="discountPriceIdr" type="number" className={inputStyle} autoComplete="off" value={formData.discountPriceIdr} onChange={handleChange} />
      </div>
      <div className={classes.modalGridForm}>
        <label htmlFor="discountPriceUsd">Discount IDR</label>
        <input id="discountPriceUsd" name="discountPriceUsd" type="number" className={inputStyle} autoComplete="off" value={formData.discountPriceUsd} onChange={handleChange} />
      </div>
      <div className="w-full h-[2px] bg-gray-300 opacity-75 my-2" />
      <div className={classes.modalGridForm}>
        <label htmlFor="size">Size</label>
        <input id="size" name="size" type="text" className={inputStyle} autoComplete="off" placeholder="optional" value={formData.size} onChange={handleChange} />
      </div>
      <div className={classes.modalGridForm}>
        <label htmlFor="desc">Description</label>
        <input id="desc" name="desc" type="text" className={inputStyle} autoComplete="off" placeholder="optional" value={formData.desc} onChange={handleChange} />
      </div>
      <div className={classes.modalGridForm}>
        <label htmlFor="videoURL">videoURL</label>
        <input id="videoURL" name="videoURL" type="text" className={inputStyle} autoComplete="off" placeholder="optional" value={formData.videoURL} onChange={handleChange} />
      </div>
      <div className="w-full h-[2px] bg-gray-300 opacity-75 my-2" />
      <h1 className="flex justify-center text-lg text-primary font-bold tracking-wider">Edit Image</h1>
      <div className={classes.modalGridForm}>
        <div className="h-20 w-20">{formData.image1 ? <img src={formData.image1} className="aspect-square object-cover rounded-lg bg-gray-300" alt="Uploaded" /> : <ImagePlus className="h-full w-full p-1" />}</div>
        <div>
          <span className="italic font-medium">Main Image</span>
          <input id="image1" name="image1" type="file" className={fileStyle} onChange={handleFileChange} />
        </div>
      </div>
      <div className={classes.modalGridForm}>
        <div className="h-20 w-20">{formData.image2 ? <img src={formData.image2} className="aspect-square object-cover rounded-lg bg-gray-300" /> : <ImagePlus className="h-full w-full p-1" />}</div>
        <div>
          <span className="italic font-medium">Sub Image 1</span>
          <input id="image2" name="image2" type="file" className={fileStyle} onChange={handleFileChange} />
        </div>
      </div>
      <div className={classes.modalGridForm}>
        <div className="h-20 w-20">{formData.image3 ? <img src={formData.image3} className="aspect-square object-cover rounded-lg bg-gray-300" /> : <ImagePlus className="h-full w-full p-1" />}</div>
        <div>
          <span className="italic font-medium">Sub Image 2</span>
          <input id="image3" name="image3" type="file" className={fileStyle} onChange={handleFileChange} />
        </div>
      </div>
      {Object.keys(formErrors).length > 0 && (
        <div className="error-messages text-rose-500 text-sm italic flex flex-col items-end justify-end">
          {Object.values(formErrors).map((error, index) => (
            <p key={index}>{error}</p>
          ))}
        </div>
      )}
      <div className="flex gap-2 justify-end">
        <button type="reset" onClick={() => setIsOpen(false)} className="px-4 py-1.5 rounded-lg mt-4 text-white bg-rose-500 border-none transition duration-150 ease-in-out hover:opacity-75">
          Close
        </button>
        <button type="submit" className="px-4 py-1.5 rounded-lg mt-4 text-white bg-green-500 border-none transition duration-150 ease-in-out hover:opacity-75">
          Edit
        </button>
      </div>
    </form>
  );
}
