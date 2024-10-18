import { useState } from "react";
import { useCookies } from "react-cookie";

import type { IConfig } from "@/modules/theme/interfaces";

export function useConfig() {
  const [cookies, setCookie] = useCookies(["tc-theme-config"]);

  const [config, setConfigState] = useState<IConfig>(() => {
    return cookies["tc-theme-config"];
  });

  const setConfig = (newConfig: IConfig) => {
    setConfigState(newConfig);
    setCookie("tc-theme-config", newConfig, { path: "/" });
  };

  return [config, setConfig] as const;
}
