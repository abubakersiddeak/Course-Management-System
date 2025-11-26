"use client";
import { StateContext } from "@/context/context";
import React, { useState } from "react";

export default function StateProvider({ children }) {
  const [loading, setLoding] = useState(false);

  const state = { loading, setLoding };
  return (
    <StateContext.Provider value={state}>{children}</StateContext.Provider>
  );
}
