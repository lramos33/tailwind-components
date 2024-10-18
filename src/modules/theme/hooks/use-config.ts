import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

import type { IConfig } from "@/modules/theme/interfaces";

const configAtom = atomWithStorage<IConfig>("@salutes-config", {
  colorTheme: "indigo",
});

export function useConfig() {
  return useAtom(configAtom);
}
