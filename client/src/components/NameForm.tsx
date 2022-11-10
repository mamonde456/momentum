import styled from "styled-components";

const Input = styled.input`
  margin-top: 20px;
  width: 500px;
  height: 60px;
  border: none;
  border-bottom: solid 2px rgba(255, 255, 255, 0.3);
  font-size: 32px;
  text-align: center;
  color: white;
  background: none;
  :focus {
    outline: none;
    background-color: transparent;
    border-bottom: solid 2px rgba(255, 255, 255, 0.7);
  }
`;
const NameForm = ({ width }: any) => {
  const onSubmit = (e: React.FormEvent<HTMLFormElement | any>) => {
    //??
    e.preventDefault();
    const {
      currentTarget: {
        name: { value },
      },
    } = e;
    window.localStorage.setItem("name", value);
    return e.currentTarget.reset();
  };
  return (
    <form
      onSubmit={(e) => onSubmit(e)}
      style={
        window.localStorage.getItem("name")
          ? { display: "none" }
          : { display: "block" }
      }
    >
      <Input
        style={window.localStorage.getItem("name") ? { width: 800 } : { width }}
        type="text"
        name="name"
      />
    </form>
  );
};

export default NameForm;
