import styled from "@emotion/styled";

export const StyledProposalDetailPage = styled.div`
  margin-bottom: 138px;

  .cover-container {
    background-image: url("/assets/images/profile-bg.png");
    background-size: cover;
    background-position: center;
    width: 100%;
    height: 475px;
    @media screen and (max-width: 768px) {
      background-position: top right;
    }
  }
`;
