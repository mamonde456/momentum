import { useEffect, useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
`;

interface ILocation {
  name: string;
  main: {
    temp: number;
  };
  sys: {
    country: string;
  };
  weather: IWeather[];
}

interface IWeather {
  description: string;
}

const Weather = () => {
  const [weather, setWeather] = useState<ILocation>();
  const onSuccess = async ({ coords }: GeolocationPosition) => {
    const lat = coords.latitude;
    const lon = coords.longitude;
    const endUrl = `${process.env.REACT_APP_WEATHER_API_URL}?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`;
    const response = await fetch(endUrl);
    const data = await response.json();

    setWeather(data);
  };

  const error = (err: any) => {
    console.log(err);
  };
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(onSuccess, error);
  }, []);
  return (
    <>
      <Wrapper>
        <p>{weather?.name}</p>
        <p>{weather?.weather.map((item) => item.description)}</p>
        <p>{weather?.main.temp}</p>
      </Wrapper>
    </>
  );
};

export default Weather;
