// src/Components/Sidebar.js
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaUpload,
  FaQuestionCircle,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import styled from "styled-components";

const SidebarContainer = styled.div`
  width: 250px;
  background-color: #0056b3;
  color: white;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  position: fixed; /* Fix the sidebar */
  height: 100vh;
  overflow-y: auto;
`;

const NavItem = styled.div`
  padding: 0.75rem 1rem;
  margin: 0.5rem 0;
  display: flex;
  align-items: center;
  color: white;
  text-decoration: none;
  font-size: 1.1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #007bff;
  }

  svg {
    margin-right: 10px;
    font-size: 1.2rem; /* Maintain icon size */
  }
`;

const SubMenu = styled.div`
  display: ${({ open }) => (open ? "block" : "none")};
  padding-left: 1.5rem;
`;

const SubMenuItem = styled(Link)`
  padding: 0.5rem 1rem;
  margin: 0.3rem 0;
  display: flex;
  align-items: center;
  color: white;
  text-decoration: none;
  font-size: 1rem;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #022b3a;
  }

  svg {
    margin-right: 8px;
    font-size: 1rem; /* Maintain icon size */
  }
`;

const ToggleIcon = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  cursor: pointer;

  svg {
    font-size: 0.8rem;
  }
`;

const Sidebar = () => {
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const location = useLocation();

  // Function to toggle the quiz submenu
  const toggleQuizMenu = () => {
    setIsQuizOpen(!isQuizOpen);
  };

  // Determine if the current path is within the quizzes section
  const isActive = (path) => location.pathname === path;

  return (
    <SidebarContainer>
      <h2>User Dashboard</h2>
      <NavItem
        as={Link}
        to="/dashboard"
        style={{
          backgroundColor: isActive("/dashboard") ? "#022B3A" : "inherit",
        }}
      >
        <FaHome /> Progress
      </NavItem>
      <NavItem
        as={Link}
        to="/upload"
        style={{ backgroundColor: isActive("/upload") ? "#022B3A" : "inherit" }}
      >
        <FaUpload /> Upload Documents
      </NavItem>
      <NavItem
        onClick={toggleQuizMenu}
        style={{
          backgroundColor: isActive("/quizzes") ? "#022B3A" : "inherit",
        }}
      >
        <FaQuestionCircle /> Take Quizzes
        <ToggleIcon>
          {isQuizOpen ? <FaChevronUp /> : <FaChevronDown />}
        </ToggleIcon>
      </NavItem>
      <SubMenu open={isQuizOpen}>
        <SubMenuItem
          to="/quizzes/general-knowledge"
          style={{
            backgroundColor: isActive("/quizzes/general-knowledge")
              ? "#022B3A"
              : "inherit",
          }}
        >
          General Knowledge
        </SubMenuItem>
        <SubMenuItem
          to="/quizzes/training-courses" // Correct route
          style={{
            backgroundColor: isActive("/quizzes/training-courses")
              ? "#022B3A"
              : "inherit",
          }}
        >
          Training Courses
        </SubMenuItem>

        {/* Add more quiz categories as needed */}
      </SubMenu>
    </SidebarContainer>
  );
};

export default Sidebar;
