import React, { useEffect, useState } from "react";
import api from "../api/api";
import { DataGrid } from "@mui/x-data-grid";
import { useLocation, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "taiKhoan", headerName: "Username", width: 180 },
  { field: "hoTen", headerName: "Full name", width: 200 },
  { field: "email", headerName: "Email", width: 300 },
  {
    field: "soDt",
    headerName: "Phone",
    width: 150,
  },
  {
    field: "maLoaiNguoiDung",
    headerName: "User Type",
    width: 80,
  },
];

const Users = () => {
  // const location = useLocation();
  // const curSearchTerm =
  //   new URLSearchParams(location.search).get("searchTerm") || "";
  const [users, setUsers] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // console.log(searchTerm);

  useEffect(() => {
    if (searchTerm !== "") {
      const getUserList = async () => {
        try {
          const res = await api.request({
            url: "/api/QuanLyNguoiDung/TimKiemNguoiDung",
            method: "GET",
            params: {
              MaNhom: "GP02",
              tuKhoa: searchTerm,
            },
          });
          setUsers(res.data.map((user, index) => ({ ...user, id: index + 1 })));
        } catch (err) {
          console.log(err);
        }
      };
      getUserList();
    } else {
      const getUserList = async () => {
        try {
          const res = await api.request({
            url: "/api/QuanLyNguoiDung/LayDanhSachNguoiDung",
            method: "GET",
          });
          setUsers(res.data.map((user, index) => ({ ...user, id: index + 1 })));
        } catch (err) {
          console.log(err);
        }
      };
      getUserList();
    }
  }, [searchTerm]);

  const debounce = (cb, delay) => {
    let timer;
    return (...args) => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        cb(...args);
      }, delay);
    };
  };

  const handleSearch = debounce((e) => {
    const value = e.target.value;
    // console.log(value);
    // if (value === "") return;
    setSearchTerm(value);
    // navigate(`?searchTerm=${value}`);
  }, 1000);

  if (!users) return <p>Loading...</p>;

  return (
    <div className="mt-24 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
      <h1 className="text-3xl text-center font-bold my-4">Users Management</h1>
      <div className="flex justify-between my-4 ">
        <button
          className="bg-teal-400 hover:bg-teal-200 px-4 sm:px-6  py-2 sm:py-4 rounded-xl text-center font-semibold text-sm sm:text-lg"
          onClick={() => navigate("/users/add")}
        >
          Add user
        </button>
        <div className="flex items-center border rounded p-2">
          <input
            type="text"
            placeholder="Search"
            className="outline-0"
            onChange={handleSearch}
          />
          <BsSearch />
        </div>
      </div>

      <div className="m-1 mt-4" style={{ height: 650, width: "100%" }}>
        <DataGrid
          rows={users}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          onRowClick={(e) =>
            navigate("/users/add", {
              state: {
                user: e.row,
              },
            })
          }
        />
      </div>
    </div>
  );
};

export default Users;
