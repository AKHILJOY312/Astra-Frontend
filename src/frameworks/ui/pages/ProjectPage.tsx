import React from "react";
import { Button } from "../common/Button";
import { useDispatch } from "react-redux";
import { logoutUser } from "../redux/slices/authSlice";
import type { AppDispatch } from "../redux/store";
import { useNavigate } from "react-router-dom";

function ProjectPage() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <div>
      projectPage
      <Button
        onClick={() => {
          handleLogout();
        }}
      >
        {" "}
        logout
      </Button>
    </div>
  );
}

export default ProjectPage;
