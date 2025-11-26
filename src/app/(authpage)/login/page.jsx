import { Suspense } from "react";
import { LoginClient } from "./LoginClient";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center min-h-screen">
          Loading...
        </div>
      }
    >
      <LoginClient />
    </Suspense>
  );
}
