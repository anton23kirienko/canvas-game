function getMagicPosition(target, sW, sH) {
  const tW = target.drawParams[3]; // target sW
  const tH = target.drawParams[4]; // target sH
  const tX = target.drawParams[5];
  const tY = target.drawParams[6]; 

  return [tX + (tW - sW) / 2, tY + (tH - sH) / 2];
}

export default getMagicPosition;
