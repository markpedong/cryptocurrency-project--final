import { Container, Grid, Paper, Select, Text } from "@mantine/core";
import styled from "styled-components";

type StyledColor = {
  color: string;
};
export const CryptoName = styled(Text)`
  color: ${({ color }: StyledColor) => (color === "dark" ? "#fff" : "#000")};
  font-size: 2rem;
  font-weight: 800;
`;

export const GrayText = styled(Text)`
  color: ${({ color }: StyledColor) =>
    color === "dark" ? "#a1a7bb" : "#58667e"};
  font-size: 0.7rem;
  font-weight: 600;
  background-color: ${({ color }: StyledColor) =>
    color === "dark" ? "#323546" : "#eff2f5"};
  padding: 0.2rem 0.4rem;
  border-radius: var(--radius-2);
`;

export const GrayContainer = styled(Paper)`
  display: flex;
  align-items: center;
  gap: 0.7rem;
`;

export const GrayContainerLinks = styled(Paper)`
  display: flex;
  align-items: center;
  font-weight: 600;
  border-radius: var(--radius-2);
  gap: 0.5rem;
  color: ${({ color }: StyledColor) => (color === "dark" ? "white" : "black")};
  background-color: ${({ color }: StyledColor) =>
    color === "dark" ? "#323546" : "#eff2f5"};
  padding: 0.2rem 0.4rem;
  inline-size: max-content;
`;

export const GrayTextLink = styled(Text)`
  font-size: 0.7rem;
  cursor: pointer;
`;
