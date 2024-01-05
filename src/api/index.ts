export const fetchData = async () => {
  try {
    const response = await fetch(
      "https://wimpykido.github.io/data/output.json"
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const getRandomWord = async (): Promise<string> => {
  try {
    const data = await fetchData();
    const words = Object.values(data) as string[][];

    if (words.length === 0) {
      throw new Error("Empty words array");
    }

    const randomWordArray = words[Math.floor(Math.random() * words.length)];

    if (!randomWordArray || randomWordArray.length === 0) {
      throw new Error("Invalid random word array");
    }

    const randomWord =
      randomWordArray[Math.floor(Math.random() * randomWordArray.length)];
    console.log("Random Word:", randomWord);
    return randomWord;
  } catch (error) {
    console.error("Error getting a random word:", error);
    throw error;
  }
};
