/* eslint-disable react/prop-types */
import { X } from "lucide-react";
import { useAuth } from "../../context/use-context";
import ReactDOM from "react-dom";
import classes from "./scss/auth.module.scss";
import { useEffect, useState } from "react";
import { updateUser } from "../../api/auth-api";
import UpdateUserForm from "./forms/edit-user-form";

export default function UpdateUser({ isOpen, setIsOpen, currentUsername, userId }) {
  const { userToken } = useAuth();
  const [error, setError] = useState("");
  const [username, setUsername] = useState(currentUsername);
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser(userToken, userId, username, password);
    } catch (error) {
      console.error("Failed to edit user:", error);
      setError(error.response?.data.message);
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
        <h1 className="text-xl flex justify-center text-rose-500 font-bold my-3">Edit Profile</h1>
        <UpdateUserForm setIsOpen={setIsOpen} onSubmit={handleSubmit} error={error} username={username} setUsername={setUsername} password={password} setPassword={setPassword} />
      </div>
    </div>
  );
  if (!isOpen) return <></>;

  return ReactDOM.createPortal(content, document.getElementById("portal"));
}
