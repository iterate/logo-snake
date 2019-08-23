import React from "react";
import { Global, css } from "@emotion/core";

import Snake from './Snake';

function App() {
  return (
    <div>
      <Global
        styles={css`
          body {
            margin: 0;
            padding: 0;
            background-color: #55615f;
            box-sizing: border-box;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
              Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
              sans-serif;
          }
        `}
      />
      <div>
        <Snake />
      </div>
    </div>
  );
}

export default App;
