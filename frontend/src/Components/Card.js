import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const CardContainer = styled(motion.div)`
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;       /* Balanced padding for content spacing */
  margin: 1rem;          /* Margin between cards */
  width: 300px;          /* Adjusted card width */
  text-align: center;
  cursor: pointer;
  border:2px solid #003366;
  &:hover{
  border-radius:10px;
    border:2px solid #003366 ;
    border-image: linear-gradient(90deg, #2CB67D, #3333ff) 1;
  }
  
`;

const IconWrapper = styled.div`
  font-size: ${({ iconFontSize }) => iconFontSize || '1.2rem'}; /* Adjusted icon size */
  margin-bottom: 0.75rem;  /* Space between icon and title */
`;

const Title = styled.h2`
  font-size: ${({ titleFontSize }) => titleFontSize || '1rem'}; /* Adjusted title size */
  margin-bottom: 0.5rem;   /* Space between title and description */
`;

const Description = styled.p`
  // font-size: ${({ descriptionFontSize }) => descriptionFontSize || '0.8rem'}; /* Adjusted description size */
  margin-bottom: 0;        /* No margin needed below description */
`;


const Card = ({ icon, title, description, whileHover, onClick, titleFontSize, descriptionFontSize, iconFontSize}) => (
  <CardContainer whileHover={whileHover} onClick={onClick}>
    <IconWrapper iconFontSize={iconFontSize}>{icon}</IconWrapper>
    <Title titleFontSize={titleFontSize}>{title}</Title>
    <Description descriptionFontSize={descriptionFontSize}>{description}</Description>
  </CardContainer>
);

export default Card;
