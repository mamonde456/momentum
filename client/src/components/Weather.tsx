import { useEffect, useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
  display: flex;
  flex-direction: column;
  align-items: end;
`;
const WeatherBox = styled.div`
  display: flex;
  align-items: center;
`;

const Temp = styled.p`
  font-size: 24px;
  font-weight: 700;
`;

const Icon = styled.div<{ bgIcon: string }>`
  width: 50px;
  height: 50px;
  background-image: url(${(props) => props.bgIcon});
  background-size: cover;
  background-position: center;
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
  icon: string;
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
        <WeatherBox>
          <Icon
            bgIcon={
              `http://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png` ||
              ""
            }
          ></Icon>
          {/* <p>{weather?.weather.map((item) => item.description)}</p> */}
          <Temp>{weather?.main.temp} ℃</Temp>
        </WeatherBox>
        <p style={{ opacity: 0.8 }}>{weather?.name}</p>
      </Wrapper>
    </>
  );
};

export default Weather;
