import styled from "@emotion/styled";

export const Table = styled.table`
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
  margin: 1rem auto;
`;

export const Td = styled.td`
  border: 1px solid #2c2c2c;
  text-align: center;
  padding: 8px;
  color: #fff;
`;

export const Th = styled.th`
  border: 1px solid #2c2c2c;
  text-align: center;
  padding: 8px;
  color: #fff;
`;

export const Tr = styled.tr`
  &:nth-of-type(even) {
    background-color: #dddddd3b;
  }
`;

export const TabButton = styled.button`
  margin-right: 1rem;
  padding: .5rem;
  min-width: 150px;
  background-color: #cbcbcb;
  border: 1px solid #2c2c2c;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    background-color: #696767;
    color: #fff;
  }
`;

export const Button = styled.button`
  background-color: #cbcbcb;
  cursor: pointer;
  padding: .5rem 1rem;
  border-radius: 6px;
  border: 1px solid #2c2c2c;
  font-weight: bold;
  font-size: 1rem;
  min-width: 100px;
  color: #2c2c2c;
  &:hover {
    background-color: #696767;
    color: #fff;
  }
`;

export const Controls = styled.div`
  text-align: center;
`;

export const Title = styled.h1`
  color: #fff;
  max-width: 200px;
  margin: 2.5rem auto;
  background-color: #0000006e;
  border-radius: 6px;
`;

export const Logo = styled.img`
  background-color: #0000006e;
  padding: 2rem;
  border-bottom-left-radius: 35px;
  border-bottom-right-radius: 35px;
`;

export const Filters = styled.div`
  color: #fff;
  div {
    margin: .5rem auto;
    .react-date-picker {
      margin-left: 10px;

      .react-date-picker__button {
        background-color: #cbcbcb;
      }
    }
  }
`;