import { StateContext } from "@/context/context";
import React, { useContext } from "react";

export default function useStateContext() {
  return useContext(StateContext);
}
