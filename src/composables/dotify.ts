export const useDotify = (input: string) => {
  const split = input
    .replace("_", "")
    .replace(" ", "")
    .split(/(?=[A-Z\s])/);
  const join = split.join(".").toLowerCase();
  return join;
};
