/* eslint-disable react/prop-types */

import { Pen } from "lucide-react";

export default function TypeItem({ _id, name }) {
  return (
    <>
      <div className="flex gap-2 items-center text-black font-semibold">
        <p className="w-full text-start">
          Type: <span className="font-normal">{name}</span>
        </p>
        <div className="flex flex-col gap-3">
          <div>
            <Pen size={20} className="text-rose-500 transition duration-150 hover:text-green-500" />
          </div>
          <div>
            <Pen size={20} className="text-rose-500 transition duration-150 hover:text-green-500" />
          </div>
        </div>
      </div>
      <div className="w-full h-[2px] bg-gray-500 opacity-50 my-2" />
    </>
  );
}
