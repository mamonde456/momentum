export const backgroundImgFn = async (query: string) => {
  const config = {
    client_id: "YDIkdn5nE19BVaUr1L9Cnh12iVuX0BBdA3TwzBCZT8w",
    query,
    count: "10",
  };
  const param = new URLSearchParams(config).toString();

  const response = await fetch(
    `https://api.unsplash.com/photos/random?${param}`
  );

  return await response.json();
};

export const quotesFn = async () => {
  const response = await fetch("https://api.adviceslip.com/advice");
  return await response.json();
};
