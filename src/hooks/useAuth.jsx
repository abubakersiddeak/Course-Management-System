"use client";

import { AuthContext } from "@/context/context";
import { useContext } from "react";

export default function useAuth() {
  return useContext(AuthContext);
}
