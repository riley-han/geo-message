"use client";

import { useEffect, useState } from "react";

export type Profile = {
  id: string;
  display_name: string;
};

export const useGetProfiles = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);

  useEffect(() => {
    const run = async () => {
      try {
        const res = await fetch("/api/profiles", { cache: "no-store" });

        if (!res.ok) {
          setProfiles([]);
          return;
        }

        const data = (await res.json()) as { profiles?: Profile[] };
        setProfiles(Array.isArray(data.profiles) ? data.profiles : []);
      } catch {
        setProfiles([]);
      }
    };

    run();
  }, []);

  return profiles;
};
