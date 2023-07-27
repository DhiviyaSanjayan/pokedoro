import { Link } from "react-router-dom";
import { useCredentials } from "../../contexts";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const { usernameValue, setUsernameValue, passwordValue, setPasswordValue } =
    useCredentials();
  const navigate = useNavigate();
  const loginRequest = async (formData) => {
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: formData.username,
        pass_word: formData.pass_word,
      }),
    };
    // const response = await fetch(
    //   "https://pokedoro-api.onrender.com/users/login",
    //   options
    // );
    const response = await fetch("http://localhost:8080/users/login", options);
    const data = await response.json();
    console.log(data);

    if (response.status == 200) {
      localStorage.setItem("token", JSON.stringify(data.token));
      navigate("/");
    } else {
      alert(data.error);
    }
  };

  const handleUsernameChange = (e) => {
    setUsernameValue(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPasswordValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginRequest({ username: usernameValue, pass_word: passwordValue });
    setUsernameValue("");
    setPasswordValue("");
  };

  return (
    <div className="login-body">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1 className="login-title" role="heading">
          Sign In
        </h1>
        <input
          type="text"
          className="login-input"
          value={usernameValue}
          name="username"
          placeholder="Username"
          onChange={handleUsernameChange}
        />
        <input
          type="password"
          className="login-input"
          value={passwordValue}
          name="password"
          placeholder="Password"
          onChange={handlePasswordChange}
        />
        <input type="submit" value="Sign In" className="login-button" />
        <Link to="/register">Don't have an account? Register.</Link>
      </form>
    </div>
  );
}
