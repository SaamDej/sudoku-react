function createKeyMap() {
  const km = new Map();
  for (let i = 0; i < 9; i++) {
    km.set(`Digit${i + 1}`, i + 1);
  }
  return km;
}

export default createKeyMap;
