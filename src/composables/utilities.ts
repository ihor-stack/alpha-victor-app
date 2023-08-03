export const useDotify = (input: string): string => {
  const split = input
    .replaceAll("_", "")
    .replaceAll(" ", "")
    .split(/(?=[A-Z\s])/);
  const join = split.join(".").toLowerCase();
  return join;
};
