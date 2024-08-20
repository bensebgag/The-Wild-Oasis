// User.tsx
import "./User.scss";
import Fields from "../../UI/form/Fields";
import Form from "../../UI/form/Form";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

interface CabinFormInputs {
  fullName: string;
  email: string;
  password: string;
  repeatPassword: string;
}

function User() {
  const createUserMutation = useMutation({
    mutationFn: (formData: FormData) => {
      return axios.post(
        "http://localhost:8800/api/v1/users/createUser",
        formData
      );
    },
    onSuccess: () => {
      toast.success("Success to create user");
    },
    onError: () => {
      toast.error("Error creating user");
    },
  });

  const { register, handleSubmit } = useForm<CabinFormInputs>();
  const onSubmit: SubmitHandler<CabinFormInputs> = (data) => {
    console.log(data);
    createUserMutation.mutate(data);
  };

  return (
    <div className="userContainer">
      <div className="user">
        <h1>Create a new user</h1>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Fields>
            <div className="field">
              <label>Full name</label>
              <input type="text" {...register("fullName")} />
            </div>
            <div className="field">
              <label>Email address</label>
              <input type="email" {...register("email")} />
            </div>
            <div className="field">
              <label>Password (min 8 characters)</label>
              <input type="password" {...register("password")} />
            </div>
            <div className="field">
              <label>Repeat password</label>
              <input type="password" {...register("repeatPassword")} />
            </div>
          </Fields>
          <div className="buttons">
            <button type="button" className="cancel">
              Cancel
            </button>
            <button disabled={createUserMutation.isPending} type="submit">
              Create New User
            </button>
          </div>
        </Form>
        <Toaster />
      </div>
    </div>
  );
}

export default User;
