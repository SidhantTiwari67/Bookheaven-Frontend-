import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader/Loader";
import { FaUserLarge } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import { IoOpenOutline } from "react-icons/io5";
import SeeUserData from "./SeeUserData";
const AllOrders = () => {
  const [Value, setValue] = useState({ status: "" });
  const [AllOrders, setAllOrders] = useState();
  const [Options, setOptions] = useState(-1);
  const [userDiv, setuserDiv] = useState("hidden");
  const [userDivData, setuserDivData] = useState();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "https://bookheaven-jruh.onrender.com/api/v1/get-all-orders",
        { headers }
      );
      setAllOrders(response.data.data);
    };
    fetch();
  }, [AllOrders]);
  const change = (e) => {
    const { value } = e.target;
    setValue({ status: value });
  };
  const setOptionsButton = (i) => {
    setOptions(i);
  };
  const submitChanges = async (i) => {
    const id = AllOrders[i]._id;
    const response = await axios.put(
      `https://bookheaven-jruh.onrender.com/api/v1/update-status/${id}`,
      Value,
      { headers }
    );
    alert(response.data.message);
  };
  return (
    <>
      {!AllOrders && (
        <div className="w-full h-[100%] flex items-center justify-center">
          <Loader />
        </div>
      )}
      {AllOrders && AllOrders.length > 0 && (
        <div className="h-[100%] p-0 md:p-4 text-zinc-100">
          <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
            All Orders
          </h1>
          <div className="mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2">
            <div className="w-[3%]">
              <h1 className="text-center">Sr.</h1>
            </div>
            <div className="w-[40%] md:w-[22%]">
              <h1>Books</h1>
            </div>
            <div className="w-0 md:w-[45%] hidden md:block">
              <h1>Description</h1>
            </div>
            <div className="w-[17%] md:w-[9%]">
              <h1>Price</h1>
            </div>
            <div className="w-[30%] md:w-[16%]">
              <h1>Status</h1>
            </div>
            <div className="w-[10%] md:w-[5%]">
              <h1>
                <FaUserLarge />
              </h1>
            </div>
          </div>
          {AllOrders &&
            AllOrders.map((items, i) => (
              <div className="bg-zinc-800 w-full rounded py-2 px-4 flex gap-4 hover:bg-zinc-900 hover:cursor-pointer">
                <div className="w-[3%]">
                  <h1 className="text-center">{i + 1}</h1>
                </div>
                <div className="w-[40%] md:w-[22%]">
                  <Link
                    to={`/view-book-details/${items.book._id}`}
                    className="hover:text-blue-300"
                  >
                    {items.book.title}
                  </Link>
                </div>
                <div className="w-0 md:w-[45%] hidden md:block">
                  <h1>{items.book.desc.slice(0, 50)}...</h1>
                </div>
                <div className="w-[17%] md:w-[9%]">
                  <h1>₹ {items.book.price}</h1>
                </div>
                <div className="w-[30%] md:w-[16%]">
                  <h1 className="font-semibold">
                    <button
                      className="hover:scale-105 transition-all duration-300"
                      onClick={() => setOptionsButton(i)}
                    >
                      {items.status === "Order Placed" ? (
                        <div className="text-yellow-500">{items.status}</div>
                      ) : items.status === "Cancelled" ? (
                        <div className="text-red-500">{items.status}</div>
                      ) : (
                        <div className="text-green-500">{items.status}</div>
                      )}
                    </button>
                    {Options === i && (
                      <div className="flex">
                        <select
                          name="status"
                          id=""
                          className="bg-gray-800"
                          onChange={change}
                          value={Value.status}
                        >
                          {[
                            "Order Placed",
                            "Out for Delivery",
                            "Delivered",
                            "Cancelled",
                          ].map((items, i) => (
                            <option value={items} key={i}>
                              {items}
                            </option>
                          ))}
                        </select>
                        <button
                          className="text-green-500 hover:text-pink-600 mx-2"
                          onClick={() => {
                            setOptions(-1);
                            submitChanges(i);
                          }}
                        >
                          <FaCheck />
                        </button>
                      </div>
                    )}
                  </h1>
                </div>
                <div className="w-[10%] md:w-[5%]">
                  <button
                    className="text-xl hover:text-orange-500"
                    onClick={() => {
                      setuserDiv("fixed");
                      setuserDivData(items.user);
                    }}
                  >
                    <IoOpenOutline />
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}
      {userDivData && (
        <SeeUserData
          userDiv={userDiv}
          setuserDiv={setuserDiv}
          userDivData={userDivData}
        />
      )}
    </>
  );
};

export default AllOrders;
