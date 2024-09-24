import { v4 as uuidv4 } from "uuid";

export const getUid = () => {
    let uuid = uuidv4();
    return uuid;
  };