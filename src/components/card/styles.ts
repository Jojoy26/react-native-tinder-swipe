/* eslint-disable prettier/prettier */
import styled from "styled-components/native";

interface CardProps {
    index: number
}

export const ContainerCard = styled.Image<CardProps>`
    height: 100%;
    width: 100%;
    border-radius: 10px;
`;
