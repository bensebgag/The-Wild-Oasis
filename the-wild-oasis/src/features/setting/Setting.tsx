import "./Setting.scss";
import Fields from "../../UI/form/Fields";
import Form from "../../UI/form/Form";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

interface CabinFormInputs {
  minimumNights: string;
  maximumNights: string;
  maximumGuests: string;
  breakfastPrice: string;
}

function Setting() {
  const { register, handleSubmit } = useForm<CabinFormInputs>();

  const SettingMutation = useMutation({
    mutationFn: (formData: FormData) => {
      return axios.post(
        "http://localhost:8800/api/v1/setting/update",
        formData
      );
    },
    onSuccess: () => {
      toast.success("Setting updated");
    },
  });

  const onSubmit: SubmitHandler<CabinFormInputs> = (data) => {
    SettingMutation.mutate(data);
  };

  return (
    <div className="SettingContainer">
      <div className="setting">
        <h1>Update hotel settings</h1>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Fields>
            <div className="field">
              <label>Minimum nights/booking</label>
              <input type="number" {...register("minimumNights")} />
            </div>
            <div className="field">
              <label>Maximum nights/booking</label>
              <input type="number" {...register("maximumNights")} />
            </div>
            <div className="field">
              <label>Maximum guests/booking</label>
              <input type="number" {...register("maximumGuests")} />
            </div>
            <div className="field">
              <label>Breakfast price</label>
              <input type="number" {...register("breakfastPrice")} />
            </div>
          </Fields>
          <div className="buttons">
            <button disabled={SettingMutation.isPending} type="submit">
              Save Settings
            </button>
          </div>
        </Form>
      </div>
      <Toaster />
    </div>
  );
}

export default Setting;
