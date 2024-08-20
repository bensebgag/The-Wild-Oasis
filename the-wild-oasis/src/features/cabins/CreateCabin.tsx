import { SubmitHandler, useForm } from "react-hook-form";
import "./CreateCabin.scss";
import { IoMdClose } from "react-icons/io";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

interface Cabin {
  _id: string;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  image: string;
  description: string;
}

interface props {
  setOpenWindow: React.Dispatch<React.SetStateAction<boolean>>;
  EditCabin: Cabin | undefined;
}
interface CabinFormInputs {
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
  Edit: boolean;
  image: FileList;
}
function CreateCabin({ setOpenWindow, EditCabin }: props) {
  const { register, handleSubmit } = useForm<CabinFormInputs>({
    defaultValues: EditCabin, // This will pre-populate the form with EditCabin values if it exists
  });
  const queryClient = useQueryClient();

  const createCabinMutation = useMutation({
    mutationFn: (formData: FormData) => {
      if (!EditCabin) {
        return axios.post(
          "http://localhost:8800/api/v1/cabines/createAnewCabin",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        return axios.post(
          `http://localhost:8800/api/v1/cabines/updateCabin/${EditCabin._id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["cabins"]);
      setOpenWindow(false);
    },
    onError: (error) => {
      console.error("Error creating/updating cabin:", error);
    },
  });

  const onSubmit: SubmitHandler<CabinFormInputs> = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("maxCapacity", data.maxCapacity.toString());
    formData.append("regularPrice", data.regularPrice.toString());
    formData.append("discount", data.discount.toString());
    formData.append("description", data.description);
    if (data.image && data.image.length > 0) {
      formData.append("image", data.image[0]);
    }

    createCabinMutation.mutate(formData);
  };

  const triggerSubmit = () => {
    const form = document.getElementById("cabinForm") as HTMLFormElement;
    if (form) {
      form.requestSubmit();
    }
  };

  return (
    <div className="modalBackground">
      <div className="modalform">
        <button className="close" onClick={() => setOpenWindow(false)}>
          <IoMdClose />
        </button>

        <div className="containerForm">
          <form id="cabinForm" onSubmit={handleSubmit(onSubmit)}>
            <div className="field">
              <label>Cabin name</label>
              <input
                type="text"
                {...register("name", { required: true })}
                defaultValue={EditCabin?.name}
              />
            </div>
            <div className="field">
              <label>Maximum capacity</label>
              <input
                type="number"
                {...register("maxCapacity", { required: true })}
                defaultValue={EditCabin?.maxCapacity}
              />
            </div>
            <div className="field">
              <label>Regular price</label>
              <input
                type="number"
                {...register("regularPrice", { required: true })}
                defaultValue={EditCabin?.regularPrice}
              />
            </div>
            <div className="field">
              <label>Discount</label>
              <input
                type="number"
                {...register("discount", { required: true })}
                defaultValue={EditCabin?.discount}
              />
            </div>
            <div className="field">
              <label>Description for website</label>
              <textarea
                id="desc"
                {...register("description", { required: true })}
                defaultValue={EditCabin?.description}
              ></textarea>
            </div>
            <div className="fieldFile">
              <label>Cabin photo</label>
              <input
                type="file"
                {...register("image", { required: !EditCabin })}
              />
            </div>
          </form>
        </div>
        <div className="buttons">
          <button onClick={() => setOpenWindow(false)} className="cancel">
            Cancel
          </button>
          <button onClick={triggerSubmit}>
            {EditCabin ? "Edit cabin" : "Create new cabin"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateCabin;
