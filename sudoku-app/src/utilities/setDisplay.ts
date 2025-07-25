function setDisplay(dn: number): string {
  return dn > 0 && dn < 10 ? dn.toString() : "";
}
export default setDisplay;
