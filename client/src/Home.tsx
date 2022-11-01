import { useSearchParams } from "react-router-dom";

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const code = searchParams.get("code");
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });
    const data = await response.json();
    console.log(data);
  };
  const apiUrl = "https://accounts.spotify.com/authorize?";
  const config = {
    client_id: "5ceb16cee0854f4cbdf3a0156443a9c7",
    client_secret: "b489598a0b39464586b81dd22e36cda9",
    redirect_uri: "http://localhost:3000",
    response_type: "code",
    scope: "user-read-private user-read-email playlist-read-private",
  };
  const params = new URLSearchParams(config).toString();

  return (
    <div>
      <a href={`${apiUrl}${params}`}>click spotify</a>
    </div>
  );
};

export default Home;
