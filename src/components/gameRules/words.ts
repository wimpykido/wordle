const georgianWords: Array<string> = [
  "კარადა",
  "მსხალი",
  "დივანი",
  "საწოლი",
  "ბალიში",
  "სურათი",
  "ენძელა",
  "ჟაკეტი",
  "სახელი",
  "პატარა",
  "მუსიკა",
  "გოგონა",
  "ხალიჩა",
  "თოჯინა",
  "ბანანი",
  "ფოთოლი",
  "წითელი",
  "წრიული",
];

export function getRandomWord(): string {
  const randomIndex = Math.floor(Math.random() * georgianWords.length);
  return georgianWords[randomIndex];
}
