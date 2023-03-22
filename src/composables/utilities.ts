export const useDotify = (input: string): string => {
  const split = input
    .replaceAll("_", "")
    .replaceAll(" ", "")
    .split(/(?=[A-Z\s])/);
  const join = split.join(".").toLowerCase();
  return join;
};


export const useEquipmentIcon = (feature: string) => {
  switch (feature) {
    case "screen":
      return require("@/theme/icons/screen.svg");
    case "computer":
      return require("@/theme/icons/screen.svg");
    case "wifi":
      return require("@/theme/icons/wifi.svg");
    case "phone":
      return require("@/theme/icons/phone.svg");
    case "presenting":
      return require("@/theme/icons/whiteboard.svg");
    case "controller":
      return require("@/theme/icons/controller.svg");
    case "camera":
      return require("@/theme/icons/camera.svg");
    default:
      return undefined;
  }
};
