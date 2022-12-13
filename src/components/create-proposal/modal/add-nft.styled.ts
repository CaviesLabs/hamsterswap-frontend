import styled from "@emotion/styled";

export const StyledModal = styled.div`
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    background-color: #735cf7;
    color: white;
    border-radius: 100px;
    font-size: 18px;
    font-weight: 700;
    margin: 1rem 0;
    padding: 14px 0;
    font-family: semi-poppins-bold;
  }

  button:disabled {
    background-color: #94a3b8;
  }
`;
