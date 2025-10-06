import { useGetPuck } from "@measured/puck";

const useSafePuck = () => {
  try {
    const getPuck = useGetPuck();
    return getPuck;
  } catch (error) {
    console.warn("Puck context not available:", error);
    return undefined;
  }
};

export default useSafePuck;
