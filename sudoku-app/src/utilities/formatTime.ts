function formatTime(miliseconds: number): string {
  const totalSeconds = Math.floor(miliseconds / 100); // Convert to centiseconds
  const minutes = Math.floor(totalSeconds / 60); // Calculate total minutes
  const remainingSeconds = totalSeconds % 60; // Calculate remaining seconds
  return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
    .toString()
    .padStart(2, "0")}`;
}

export default formatTime;
