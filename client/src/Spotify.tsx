import useAuth from "useAuth";

interface IProps {
  codes: {
    code: string;
    state: string;
  };
}

const Spotify = ({ codes }: IProps) => {
  const accessToken = useAuth(codes.code);
  return (
    <div>
      spotify {codes.code} / {codes.state}
    </div>
  );
};

export default Spotify;
