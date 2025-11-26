import { Suspense } from "react";
import { RegisterClient } from "./RegisterClient";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center min-h-screen">
          Loading...
        </div>
      }
    >
      <RegisterClient />
    </Suspense>
  );
}
