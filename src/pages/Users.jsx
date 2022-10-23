import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BsSearch,
  BsEyeFill,
  BsPencilSquare,
  BsFillTrashFill,
} from "react-icons/bs";
import swal from "sweetalert";
import { debounce } from "../utils/debounce";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUser,
  findUserByUsername,
  getUserList,
  resetStatus,
  selectUsers,
  usersError,
  usersStatus,
} from "../redux/usersSlice";
import { HTTP_STATUS } from "../api/httpStatusConstants";
import Table from "../components/Table";
import { handleConfirm } from "../utils/handleConfirm";

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
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);
  const error = useSelector(usersError);
  const status = useSelector(usersStatus);

  useEffect(() => {
    if (status === HTTP_STATUS.IDLE) dispatch(getUserList());
  }, [dispatch]);

  const handleSearch = debounce((value) => {
    value !== ""
      ? dispatch(findUserByUsername(value))
      : dispatch(getUserList());
  }, 1000);

  const onDeleteHandle = handleConfirm(async (e) => {
    await dispatch(deleteUser(e.row.taiKhoan));
    handleSearch(searchTerm);
  });

  const handleClick = (e) => {
    if (e.field === "view") {
      navigate(`detail/${e.row.taiKhoan}`);
    } else if (e.field === "edit") {
      navigate("update", {
        state: {
          user: e.row,
        },
      });
    } else if (e.field === "delete") {
      onDeleteHandle(e);
    }
  };

  if (status === HTTP_STATUS.FULFILLED) {
    dispatch(resetStatus());
  } else if (status === HTTP_STATUS.REJECTED) {
    swal({
      title: "Failed",
      text: error,
      icon: "error",
    });
  }

  return (
    <div className="mt-16 sm:mt-20 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
      <h1 className="text-3xl text-center font-bold my-4">Users Management</h1>
      <div className="flex justify-between my-4 ">
        <button
          className="bg-teal-400 hover:bg-teal-200 px-4 sm:px-6  py-2 sm:py-4 rounded-xl text-center font-semibold text-sm sm:text-lg"
          onClick={() => navigate("add")}
        >
          Add user
        </button>
        <div className="flex items-center border rounded p-2">
          <input
            type="text"
            value={searchTerm}
            placeholder="Search"
            className="outline-0"
            onChange={(e) => {
              handleSearch(e.target.value);
              setSearchTerm(e.target.value);
            }}
          />
          <BsSearch />
        </div>
      </div>

      <Table
        rows={users}
        columns={columns}
        onCellClick={handleClick}
        getRowId={(row) => row.taiKhoan}
        loading={status === HTTP_STATUS.PENDING}
      />
    </div>
  );
};

export default Users;
