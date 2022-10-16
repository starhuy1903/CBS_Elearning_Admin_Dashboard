import React, { useEffect, useState } from "react";
import { deleteUser, findUserByUsername, getUserList } from "../api/api";
import { DataGrid } from "@mui/x-data-grid";
import { useLocation, useNavigate } from "react-router-dom";
import {
  BsSearch,
  BsEyeFill,
  BsPencilSquare,
  BsFillTrashFill,
} from "react-icons/bs";
import swal from "sweetalert";
import { debounce } from "../utils/debounce";

const columns = [
  { field: "id", headerName: "ID", width: 40 },
  { field: "taiKhoan", headerName: "Username", width: 130 },
  { field: "hoTen", headerName: "Full name", width: 150 },
  { field: "email", headerName: "Email", width: 230 },
  {
    field: "soDt",
    headerName: "Phone",
    width: 130,
  },
  {
    field: "maLoaiNguoiDung",
    headerName: "User Type",
    width: 80,
    align: "center",
  },
  {
    field: "view",
    headerName: "View",
    width: 50,
    renderCell: () => (
      <BsEyeFill className="text-xl text-green-500 hover:cursor-pointer" />
    ),
    align: "center",
  },
  {
    field: "edit",
    headerName: "Edit",
    width: 50,
    renderCell: () => (
      <BsPencilSquare className="text-xl text-orange-500 hover:cursor-pointer" />
    ),
    align: "center",
  },
  {
    field: "delete",
    headerName: "Delete",
    width: 70,
    renderCell: () => (
      <BsFillTrashFill className="text-xl text-red-500 hover:cursor-pointer" />
    ),
    align: "center",
  },
];

const Users = () => {
  // const location = useLocation();
  // const curSearchTerm =
  //   new URLSearchParams(location.search).get("searchTerm") || "";
  const [users, setUsers] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (searchTerm !== "") {
      findUserByUsername(searchTerm, setUsers);
    } else {
      getUserList(setUsers);
    }
  }, [searchTerm]);

  const handleSearch = debounce((e) => {
    const value = e.target.value;
    // console.log(value);
    // if (value === "") return;
    setSearchTerm(value);
    // navigate(`?searchTerm=${value}`);
  }, 1000);

  const handleDelete = (e) => {
    swal({
      title: "Warning",
      text: "Are you sure to delete?",
      icon: "warning",
      buttons: {
        cancel: {
          text: "Cancel",
          value: false,
          visible: true,
          closeModal: true,
        },
        confirm: {
          text: "OK",
          value: true,
          visible: true,
          closeModal: true,
        },
      },
    }).then((isDeleted) => {
      if (isDeleted) {
        (async () => {
          const res = await deleteUser(e.row.taiKhoan);
          if (res.status === 200) {
            if (searchTerm !== "") {
              findUserByUsername(searchTerm, setUsers);
            } else {
              getUserList(setUsers);
            }
          }
        })();
      }
    });
  };

  const handleClick = (e) => {
    if (e.field === "view") {
      navigate("/users/detail");
    } else if (e.field === "edit") {
      navigate("/users/add", {
        state: {
          user: e.row,
        },
      });
    } else if (e.field === "delete") {
      handleDelete(e);
    }
  };

  if (!users) return <p>Loading...</p>;

  return (
    <div className="mt-16 sm:mt-20 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
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
          onCellClick={handleClick}
        />
      </div>
    </div>
  );
};

export default Users;
