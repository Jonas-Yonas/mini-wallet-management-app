"use client";

import { SWRConfig } from "swr";
import { ReactNode } from "react";

export default function SWRProvider({ children }: { children: ReactNode }) {
  return (
    <SWRConfig
      value={{
        fetcher: (resource, init) =>
          fetch(resource, init).then((res) => res.json()),
        /**
         * Other configs can be added here
         * revalidateOnFocus, errorRetryCount ...
         */
      }}
    >
      {children}
    </SWRConfig>
  );
}
