import React from "react";
import styled from "styled-components";

const ProgressSection = styled.div`
  padding: 1rem;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const ProgressBar = styled.div`
  background-color: #ddd;
  border-radius: 25px;
  overflow: hidden;
  margin-bottom: 1rem;
`;

const Progress = styled.div`
  width: ${(props) => props.percentage || "0%"};
  background-color: #28a745;
  padding: 10px;
  color: white;
  text-align: center;
`;

const UserDashboard = () => {
  return (
    <div>
     
      <h1>Your Progress</h1>
      <ProgressSection>
        <h3>Quiz 1 Progress</h3>
        <ProgressBar>
          <Progress percentage="95%">99%</Progress>
        </ProgressBar>
        <h3>Quiz 2 Progress</h3>
        <ProgressBar>
          <Progress percentage="50%">50%</Progress>
        </ProgressBar>
      </ProgressSection>
    </div>
  );
};

export default UserDashboard;
