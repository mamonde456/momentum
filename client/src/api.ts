export const backgroundImgFn = async (query: string) => {
  // const config = {
  //   client_id: "YDIkdn5nE19BVaUr1L9Cnh12iVuX0BBdA3TwzBCZT8w",
  //   query: query || "nature",
  //   count: "10",
  // };
  const param =
    "client_id=YDIkdn5nE19BVaUr1L9Cnh12iVuX0BBdA3TwzBCZT8w&query=nature&count=10";

  const response = await fetch(
    `https://api.unsplash.com/photos/random?${param}`
  );

  return await response.json();
};

export const quotesFn = async () => {
  const response = await fetch("https://api.adviceslip.com/advice");
  return await response.json();
};

export const weatherApi = async (lat: number, lon: number) => {
  const endUrl = `${process.env.REACT_APP_WEATHER_API_URL}?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`;
  const response = await fetch(endUrl);
  return await response.json();
};
