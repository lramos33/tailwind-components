import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

import type { IConfig } from "@/modules/theme/interfaces";

const DEFAULT_CONFIG: IConfig = {
  colorTheme: "indigo",
};

export function useConfig() {
  const [cookies, setCookie] = useCookies(["tc-theme-config"]);
  const [config, setConfigState] = useState<IConfig>(DEFAULT_CONFIG);

  useEffect(() => {
    const savedConfig = cookies["tc-theme-config"];
    if (savedConfig) {
      setConfigState(savedConfig);
    }
  }, [cookies]);

  const setConfig = (newConfig: IConfig) => {
    setConfigState(newConfig);
    setCookie("tc-theme-config", newConfig, { path: "/" });
  };

  return [config, setConfig] as const;
}
