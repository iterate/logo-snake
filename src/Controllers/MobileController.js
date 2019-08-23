import React from "react";
import { css } from "emotion";
import styled from "@emotion/styled";

function MobileController({updateDirection}) {
  return (
    <div
      className={css`
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
      `}
    >
      <div
        className={css`
          display: grid;
          grid-gap: 5px;
          grid-template-areas:
            "1 2 3"
            "4 5 6"
            "7 8 9"
            "a 0 b";

            > div {
              width: 40px;
            }
        `}
      >
        <Button area="1">
          <div>1</div>
          <div
            className={css`
              position: relative;
              height: 10px;
              width: 22px;
              margin: 2px;
            `}
          >
            <div className={css`
              width: 14px;
              height: 1px;
              position: absolute;
              background-color: black;
              bottom: 0;
              left: 4px;
            `} />
            <div
              className={css`
                height: 6px;
                width: 6px;
                border-radius: 4px;
                border: 1px solid black;
                position: absolute;
                bottom: 0;
                left: 0;
              `}
            />
            <div
              className={css`
                height: 6px;
                width: 6px;
                border-radius: 4px;
                border: 1px solid black;
                position: absolute;
                bottom: 0;
                right: 0;
              `}
            />
          </div>
        </Button>
        <Button area="2" onClick={() => updateDirection("UP")}>
          <div>2</div>
          <div>abc</div>
        </Button>
        <Button area="3">
          <div>3</div>
          <div>def</div>
        </Button>
        <Button area="4" onClick={() => updateDirection("LEFT")}>
          <div>4</div>
          <div>ghi</div>
        </Button>
        <Button area="5">
          <div>5</div>
          <div>jkl</div>
        </Button>
        <Button area="6" onClick={() => updateDirection("RIGHT")}>
          <div>6</div>
          <div>mno</div>
        </Button>
        <Button area="7">
          <div>7</div>
          <div>pqrs</div>
        </Button>
        <Button area="8" onClick={() => updateDirection("DOWN")}>
          <div>8</div>
          <div>tuv</div>
        </Button>
        <Button area="9">
          <div>9</div>
          <div>wxyz</div>
        </Button>
        <Button area="a">
          <div>*</div>
          <div className={css`padding-left: 7px`}>+</div>
        </Button>
        <Button area="0">
          <div>0</div>
          <div className={css`
              height: 6px;
              width: 22px;
              margin: 2px;
              border-width: 0 1px 1px 1px;
              border-style: solid;
              border-color: black;
            `}/>
        </Button>
        <Button area="b">
          <div>#</div>
          <div className={css`padding-left: 7px`}>A</div>
        </Button>
      </div>
    </div>
  );
}

export default MobileController;

const Button = styled.div`
  grid-area: ${props => props.area}
  width: 60px;
  height: 30px;
  padding: 2px 10px;
  border-radius: 40% 40% 12px 12px;
  background-color: #cfd2cf;
  display: flex;
  justify-content: center;
  align-items: baseline;

  div:first-child {
    margin-top: 4px;
    font-weight: 600;
    font-size: 19px;
  }
`;
