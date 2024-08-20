import axios from "axios";

export const DeleteCabin = async function (id: string) {
  try {
    const response = await axios.delete(
      `http://localhost:8800/api/v1/cabines/${id}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Error delete  cabin");
  }
};
export const DuplicateCabin = async function (id: string) {
  try {
    const response = await axios.post(
      `http://localhost:8800/api/v1/cabines/${id}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Error duplicate  cabin");
  }
};
