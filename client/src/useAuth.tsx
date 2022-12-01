import { useEffect, useState } from "react";

const useAuth = (code: string) => {
  const [accessToken, setAccessToken] = useState<string>("");
  const [refreshToken, setRefreshToken] = useState<string>("");
  const [expiresIn, setExpiresIn] = useState<number>(0);

  useEffect(() => {
    const getAccessToken = async () => {
      const response = await fetch(process.env.REACT_APP_SERVER_API_URL || "", {
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          code,
        }),
      });
      const data = await response.json();
      if (data.status !== 200) {
        // 에러 발생 시 home으로 return
        console.log("데이터를 가져오지 못했습니다.");
        return window.location.assign("/");
      }
      setAccessToken(data.accessToken);
      setRefreshToken(data.refreshToken);
      setExpiresIn(data.expiresIn);
      window.history.pushState({}, "", "/");
    };
    getAccessToken();
  }, [code]);

  useEffect(() => {
    // 리프레시 토큰 / 만료 시간이 없다면 다시 리턴시켜줌.
    if (!refreshToken && !expiresIn) return;
    //인터벌로 계속 액세스 토큰 갱신 > 보안의 이유
    const interval = setInterval(async () => {
      const response = await fetch(
        process.env.REACT_APP_SERVER_API_REFRESH_URL || "",
        {
          method: "post",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            refreshToken,
          }),
        }
      );
      const data = await response.json();
      if (data.status !== 200) {
        //에러 발생시 home으로 return
        return window.location.assign("/");
      }
      //리프레시 토큰: 새로운 액세스 토큰 발행하면 state값 변경
      setAccessToken(data.accessToken);
      setExpiresIn(data.expiresIn);
      //만료 시간 > 3600
    }, (expiresIn - 60) * 1000);
    // 인터벌 삭제
    return () => clearInterval(interval);
  }, [refreshToken, expiresIn]);

  return accessToken;
};

export default useAuth;
