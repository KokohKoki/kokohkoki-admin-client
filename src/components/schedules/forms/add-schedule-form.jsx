/* eslint-disable react/prop-types */

import { useState } from "react";
import classes from "../scss/schedule.module.scss";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from "../../../utils/firebase";

export default function AddScheduleForm({ setIsOpen, onSubmit, nameError }) {
  const [formData, setFormData] = useState({
    scheduleName: "",
    scheduleImage: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const storage = getStorage(app);
    const storageRef = ref(storage, "schedule_images/" + file.name);

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
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 my-4 justify-start text-gray-700 mx-2 font-medium">
        <div className={classes.modalGridForm}>
          <label htmlFor="scheduleName">Schedule Name</label>
          <input id="scheduleName" name="scheduleName" type="text" className={inputStyle} autoComplete="off" onChange={handleChange} required />
        </div>
        <div className="w-full h-[2px] bg-gray-300 opacity-75 my-2" />
        <h1 className="flex justify-center text-sm text-primary font-bold tracking-wider">Upload Schedule Image</h1>
        <div className={classes.modalGridForm}>
          <label htmlFor="scheduleImage">Image</label>
          <input id="scheduleImage" name="scheduleImage" type="file" className={fileStyle} onChange={handleFileChange} />
        </div>
        <div className="error-messages text-rose-500 text-sm italic flex flex-col items-end justify-end">
          <p> {nameError}</p>
        </div>
        <div className="flex gap-2 justify-end">
          <button type="reset" onClick={() => setIsOpen(false)} className="px-4 py-1.5 rounded-lg mt-4 text-white bg-rose-500 border-none transition duration-150 ease-in-out hover:opacity-75">
            Close
          </button>
          <button type="submit" className="px-4 py-1.5 rounded-lg mt-4 text-white bg-green-500 border-none transition duration-150 ease-in-out hover:opacity-75">
            Add Schedule
          </button>
        </div>
      </form>
    </>
  );
}
