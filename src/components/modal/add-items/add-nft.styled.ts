import styled from "@emotion/styled";

export const StyledModal = styled.div`
  & .ant-modal-content {
    // TODO set modal background color to #F8F9FE
    background-color: cornflowerblue;
  }

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    background-color: #735cf7;
    color: white;
    border-radius: 1.5rem;
    font-size: 20px;
    font-weight: 700;
    margin: 1rem 0;
    padding: 0.75rem 0;
  }

  button:disabled {
    background-color: #94a3b8;
  }
`;
