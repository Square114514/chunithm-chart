"use client";
import Image from "next/image";
import avatar from "../assets/avatar.jpeg";
import { useState } from "react";

export default function Profile() {
  const [name, setName] = useState("E.Puthie");
  const [rating, setRating] = useState(17.35);

  return (
    <div className="flex mb-4 text-lg bg-amber-50 rounded-lg p-4 shadow-md max-w-70 items-center justify-center gap-1.5">
      <div className="flex flex-col">
        <span>Name: </span>
        <span>Rating: </span>
      </div>
      <div className="flex flex-col font-bold text-amber-400">
        <span>{name}</span>
        <span> {rating}</span>
      </div>
      <Image
        src={avatar}
        alt="avatar"
        className="size-16 rounded-lg shadow-md ml-6"
      />
    </div>
  );
}
