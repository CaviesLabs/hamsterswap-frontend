import styled from "@emotion/styled";

const styledMessages = styled.div`
  position: fixed;
  bottom: 0;
  right: 20px;
  font-family: poppins-regular !important;
  /* width: 100%; */
  z-index: 99;
  .message-body {
    height: 0;
    transition: height 0.3s linear;
    &.open {
      height: 500px;
    }
  }
  .conversation {
    background-color: rgb(237 233 254);
    padding: 0 25px;
    height: 440px;
    .timing {
      text-align: center;
      font-size: 12px;
      font-weight: 100;
      color: gray;
      padding: 16px 0;
    }
    .message-row {
      display: flex;
      flex-direction: column;
      .message-wrap {
        display: flex;
        &.message--left {
          .message {
            border-radius: 0 16px 16px 16px;
          }
        }
        &.message--right {
          flex-direction: row-reverse;
          .message {
            border-radius: 16px 16px 0 16px;
          }
        }
      }
    }
    .message {
      background: white;
      padding: 10px 15px;
      margin-bottom: 10px;
      overflow-wrap: break-word;
      max-width: 360px;
      word-wrap: break-word;
      hyphens: auto;
    }
  }

  .chatusername {
    letter-spacing: -1px;
  }
`;

export default styledMessages;
