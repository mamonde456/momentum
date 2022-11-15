export const backgroundImgFn = async (query: string) => {
  const config = {
    client_id: process.env.REACT_APP_BG_CLIENT_ID || "",
    query,
    count: "10",
  };
  const params = new URLSearchParams(config).toString();

  const response = await fetch(
    `https://api.unsplash.com/photos/random?${params}`
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
