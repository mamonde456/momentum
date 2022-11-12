import { weatherApi } from "api";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  position: absolute;
  right: 20px;
  top: 20px;
  display: flex;
  flex-direction: column;
  align-items: end;
`;
const WeatherBox = styled.div`
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.5);
  display: flex;
  align-items: center;
`;

const Temp = styled.p`
  padding: 10px;
  color: #303030;
  font-size: 18px;
  font-weight: 700;
`;

const Icon = styled.div<{ bgIcon: string }>`
  width: 50px;
  height: 50px;

  background-image: url(${(props) => props.bgIcon});
  background-size: cover;
  background-position: center;
`;

const Nothing = styled.div`
  color: white;
  font-size: 14px;
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
  const [errMsg, setIsError] = useState<string | null>();
  const onSuccess = async ({ coords }: GeolocationPosition) => {
    const data = await weatherApi(coords.latitude, coords.longitude);
    setWeather(data);
  };

  const error = (err: any) => {
    console.log(err);
    setIsError("Sorry, I couldn't get the weather data.");
  };
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(onSuccess, error);
  }, []);
  return (
    <AnimatePresence>
      {JSON.parse(window.localStorage.getItem("Weather") || "true") && (
        <Wrapper>
          {weather && (
            <>
              <WeatherBox>
                <Icon
                  bgIcon={
                    `http://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png` ||
                    ""
                  }
                ></Icon>
                <Temp>{weather?.main.temp} ℃</Temp>
              </WeatherBox>
              <p
                style={{
                  opacity: 0.8,
                  color: "white",
                  padding: 10,
                  fontSize: 14,
                }}
              >
                {weather?.name}
              </p>
            </>
          )}
          {errMsg && <Nothing>{errMsg}</Nothing>}
        </Wrapper>
      )}
    </AnimatePresence>
  );
};

export default Weather;
