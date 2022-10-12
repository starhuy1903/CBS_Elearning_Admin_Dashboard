import React, { useEffect, useState } from "react";
import api from "../api/api";
import { DataGrid } from "@mui/x-data-grid";

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
  const [users, setUsers] = useState();

  useEffect(() => {
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
  }, []);

  if (!users) return <p>Loading...</p>;

  return (
    <div className="mt-24 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
      <h1 className="text-3xl">Users</h1>
      <button>Add user</button>
      <div style={{ height: 650, width: "100%" }}>
        <DataGrid
          rows={users}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          checkboxSelection
        />
      </div>
    </div>
  );
};

export default Users;
