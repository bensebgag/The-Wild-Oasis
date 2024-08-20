import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Tabel from "../../UI/Table/Tabel";
import Tbody from "../../UI/Table/Tbody";
import Thead from "../../UI/Table/Thead";
import Options from "../../UI/options/Options";
import "./Cabin.scss";
import axios from "axios";
import Spinner from "../../Util/Spinner";
import { useState } from "react";
import CreateCabin from "./CreateCabin";
import { DeleteCabin, DuplicateCabin } from "../../services/cabinServies";
import { useSearchParams } from "react-router-dom";
interface Cabin {
  _id: string;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  image: string;
  description: string;
}

function Cabin() {
  const [searchParams, setsearchParams] = useSearchParams();
  const discount = searchParams.get("discount") || "all";
  const sortBy = searchParams.get("sortBy") || "name-asc";
  function handelClickAll() {
    setsearchParams({ discount: "all", sortBy });
  }
  function handleClickNoDiscount() {
    setsearchParams({ discount: "no-discount", sortBy });
  }
  function handleClickWithDiscount() {
    setsearchParams({ discount: "with-discount", sortBy });
  }

  const [OpenWindow, setOpenWindow] = useState(false);
  const [EditCabin, setEditCabin] = useState<Cabin | undefined>(undefined);
  const queryClient = useQueryClient();
  const useDeleteCabin = () => {
    return useMutation({
      mutationFn: (id: string) => DeleteCabin(id),
      onSuccess: () => {
        queryClient.invalidateQueries(["cabins"]);
      },
    });
  };
  const useDuplicateCabin = () => {
    return useMutation({
      mutationFn: (id: string) => DuplicateCabin(id),
      onSuccess: () => {
        queryClient.invalidateQueries(["cabins"]);
      },
    });
  };
  const deleteBookingByIdMutation = useDeleteCabin();
  const DuplicateCabinMutation = useDuplicateCabin();

  const handleDeleteCabin = function (id: string) {
    deleteBookingByIdMutation.mutate(id);
  };
  const handleDuplicateCabin = function (id: string) {
    DuplicateCabinMutation.mutate(id);
  };
  const handleEditCabin = function (cabin: Cabin) {
    setOpenWindow(true);
    setEditCabin(cabin);
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setsearchParams({
      sortBy: event.target.value,
      discount: searchParams.get("discount") ?? "all",
    });
  };
  const { data, isLoading } = useQuery({
    queryKey: [
      "cabins",
      searchParams.get("discount"),
      searchParams.get("sortBy"),
    ],
    queryFn: async () => {
      const discount = searchParams.get("discount") || "all";
      const response = await axios.get(
        `http://localhost:8800/api/v1/cabines?discount=${discount}&sortBy=${sortBy}`
      );
      return response.data;
    },
  });

  if (isLoading) return <Spinner />;
  const { cabines } = data.data;

  return (
    <>
      {OpenWindow && (
        <CreateCabin EditCabin={EditCabin} setOpenWindow={setOpenWindow} />
      )}
      <div className="containerCabins">
        <div className="head">
          <h1>All cabins</h1>
          <div className="buttonSeclectionContainer">
            <div className="buttons">
              <button
                className={discount === "all" ? "active" : ""}
                onClick={handelClickAll}
              >
                All
              </button>
              <button
                className={discount === "no-discount" ? "active" : ""}
                onClick={handleClickNoDiscount}
              >
                No discount
              </button>
              <button
                className={discount === "with-discount" ? "active" : ""}
                onClick={handleClickWithDiscount}
              >
                with discount
              </button>
            </div>
            <select onChange={handleSortChange} className="SortByDate">
              <option value="name-asc">sort by name(A-Z)</option>
              <option value="name-desc">sort by name (Z-A)</option>
              <option value="regularPrice-asc">sort by price(low first)</option>
              <option value="regularPrice-desc">
                sort by price(high first)
              </option>
              <option value="maxCapacity-asc">
                sort by capacity(low first)
              </option>
              <option value="maxCapacity-desc">
                sort by capacity(high first)
              </option>
            </select>
          </div>
        </div>
        <Tabel>
          <Thead>
            <td className="test">CABIN</td>
            <td>CAPACITY</td>
            <td>PRICE</td>
            <td>DISCOUNT</td>
          </Thead>
          <Tbody>
            {cabines.map((cabin: Cabin) => {
              return (
                <tr>
                  <td>
                    <img
                      src={`http://localhost:8800${cabin.image}`}
                      alt={`cabin ${cabin.name}`}
                    />
                  </td>
                  <td>{cabin.name}</td>
                  <td>Fits up to {cabin.maxCapacity}</td>
                  <td>${cabin.regularPrice}</td>

                  <td>${cabin.discount}</td>

                  <Options>
                    <li>
                      <button onClick={() => handleDuplicateCabin(cabin._id)}>
                        Duplicate
                      </button>
                    </li>
                    <li>
                      <button onClick={() => handleEditCabin({ ...cabin })}>
                        Edit
                      </button>
                    </li>
                    <li>
                      <button onClick={() => handleDeleteCabin(cabin._id)}>
                        Delete{" "}
                      </button>
                    </li>
                  </Options>
                </tr>
              );
            })}
          </Tbody>
        </Tabel>
        <button
          onClick={() => {
            setOpenWindow(!OpenWindow);
            setEditCabin(undefined);
          }}
          className="btn-new-cabin"
        >
          Add new cabin
        </button>
      </div>
    </>
  );
}

export default Cabin;
