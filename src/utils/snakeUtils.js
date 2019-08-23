const charStartColumn = {
  i: 0,
  t1: 1,
  e1: 4,
  r: 7,
  a: 10,
  t2: 13,
  e2: 16
};

const charToCharIdx = {
  i: 0,
  t1: 1,
  e1: 2,
  r: 3,
  a: 4,
  t2: 5,
  e2: 6
};

const blockWidth = 8;

function startPosition(char) {
  const charStartCol = charStartColumn[char];
  return { x: blockWidth * charStartCol + 3, y: blockWidth * 4 + 1 };
}

export const initialSnake = char => {
  const startPos = startPosition(char);
  return [
    { x: startPos.x, y: startPos.y + 3 },
    { x: startPos.x, y: startPos.y + 2 },
    { x: startPos.x, y: startPos.y + 1 },
    { x: startPos.x, y: startPos.y + 0 }
  ];
};

function iToBlockIdx(xLogo, yLogo, charStartCol) {
  let x = xLogo / blockWidth - charStartCol;
  let y = yLogo / blockWidth;

  if (x < 1 && y < 1) {
    return 0;
  }
  if (x < 1 && y < 3) {
    return 2;
  }
  return 3;
}

function tToBlockIdx(xLogo, yLogo, charStartCol) {
  let x = xLogo / blockWidth - charStartCol;
  let y = yLogo / blockWidth;

  if (x < 1 && y < 2) {
    return 0;
  }
  if (x < 1 && y < 3) {
    return 1;
  }
  if (x < 2 && y < 3) {
    return 2;
  }
  if (x < 1 && y < 4) {
    return 3;
  }
  if (x < 1) {
    return 4;
  }
  if (x < 2) {
    return 5;
  }
  return 6;
}

function eToBlockIdx(xLogo, yLogo, charStartCol) {
  let x = xLogo / blockWidth - charStartCol;
  let y = yLogo / blockWidth;

  if (x < 1 && y < 2) {
    return 0;
  }
  if (x < 2 && y < 2) {
    return 1;
  }
  if (x < 3 && y < 2) {
    return 2;
  }
  if (x < 1 && y < 3) {
    return 3;
  }
  if (x < 3 && y < 3) {
    return 4;
  }
  if (x < 1) {
    return 5;
  }
  return 6;
}

function aToBlockIdx(xLogo, yLogo, charStartCol) {
  let x = xLogo / blockWidth - charStartCol;
  let y = yLogo / blockWidth;

  if (x < 2 && y < 2) {
    return 0;
  }
  if (x < 3 && y < 2) {
    return 1;
  }
  if (x < 1 && y < 3) {
    return 2;
  }
  if (x < 3 && y < 3) {
    return 3;
  }
  if (x < 1) {
    return 4;
  }
  if (x < 2) {
    return 5;
  }
  return 6;
}

function rToBlockIdx(xLogo, yLogo, charStartCol) {
  let x = xLogo / blockWidth - charStartCol;
  let y = yLogo / blockWidth;

  if (x < 1 && y < 2) {
    return 0;
  }
  if (x < 2 && y < 2) {
    return 1;
  }
  if (x < 3 && y < 2) {
    return 2;
  }
  if (x < 1 && y < 3) {
    return 3;
  }
  return 4;
}

const pixelType = {
  "#ffffff": "WALL",
  "#000000": "BACKGROUND",
  "#ff0000": "APPLE",
  "#00ff00": "SNAKE"
};

function xToChar(x) {
  const xBlock = x / blockWidth;
  console.log({ xBlock });
  if (xBlock >= 16) return "e2";
  if (xBlock >= 13) return "t2";
  if (xBlock >= 10) return "a";
  if (xBlock >= 7) return "r";
  if (xBlock >= 4) return "e1";
  if (xBlock >= 1) return "t1";

  return "i";
}

const charToBlockIdx = {
  i: iToBlockIdx,
  t1: tToBlockIdx,
  e1: eToBlockIdx,
  r: rToBlockIdx,
  a: aToBlockIdx,
  t2: tToBlockIdx,
  e2: eToBlockIdx
};

function toBlockPixelCoords(x, y, charStartCol) {
  return (x % blockWidth) + (y % blockWidth) * blockWidth;
}

function xyToCBP(x, y) {
  console.log("---xyToCBP---");
  const char = xToChar(x);
  console.log("char", char);
  const C = charToCharIdx[char];
  console.log("charIdx", C);
  const startCol = charStartColumn[char];
  console.log("startCol", startCol);
  const B = charToBlockIdx[char](x, y, startCol);
  console.log("blockIdx", B);
  const P = toBlockPixelCoords(x, y);
  console.log("blockPixelsCoords", P);
  return {
    C: C,
    B: B,
    P: P
  };
}

function outOfBounds(x,y) {
  // returns true if snake is at a pos that's not a char
}

async function getLogo() {
  const logo = await fetch("https://logo-api.g2.iterate.no/logo", {
    method: "GET"
  });
  const jsonLogo = await logo.json();
  return jsonLogo.logo;
}

async function putLogo(logo) {
  return await fetch("https://logo-api.g2.iterate.no/pixel", {
    method: "PUT",
    body: JSON.stringify(logo),
    headers: {
      "Content-Type": "application/json"
    }
  });
}

export async function setColor(x, y, color) {
  console.log(`---setColor--- (x: ${x}, y: ${y})`);
  // const logo = await getLogo();
  // console.log('logo', logo)
  const logoPixel = xyToCBP(x, y);
  console.log("logoPixel", logoPixel);

  const body = {
    character: logoPixel.C,
    block: logoPixel.B,
    pixel: logoPixel.P,
    color: color
  };
  const res = await putLogo(body);

  if (!res.ok) {
    console.error("Error setting color", res);
  }
}
