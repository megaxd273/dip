import React, { useEffect, useState } from "react";
import "./css/AdminDashboard.css";
import DepartmentHeadTab from "./tabs/DepartmentHeadTab";
import DepartmentTab from "./tabs/DepartmentTab";
import FacultyTab from "./tabs/FacultyTab";
import UsersTab from "./tabs/UsersTab";

const AdminDashboard = ({ selectedTab }) => {
  return (
    <div className="admin-dashboard">
      {selectedTab === "def" && (
        <UsersTab/>
      )}
      {selectedTab ==="depheads" && (
        <DepartmentHeadTab/>
      )}
      {selectedTab ==="departments" && (
        <DepartmentTab/>
      )}
      {selectedTab ==="faculties" && (
        <FacultyTab/>
      )}
    </div>
  );
};

export default AdminDashboard;
