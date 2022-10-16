import React, { useEffect, useState } from "react";

const leftColumns = [];

const UserDetail = () => {
  const [isLeft, setIsLeft] = useState(true);

  useEffect(() => {}, [isLeft]);

  return (
    <div className="mt-20">
      <header className="flex">
        <h1 onClick={() => setIsLeft(true)}>
          Danh sach khoa hoc cho xet duyet
        </h1>
        <h1 onClick={() => setIsLeft(false)}>Danh sach khoa hoc da mua</h1>
      </header>
    </div>
  );
};

export default UserDetail;
