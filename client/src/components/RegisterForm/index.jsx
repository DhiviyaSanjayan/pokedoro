import { Link } from "react-router-dom";
import { useCredentials } from "../../contexts";
import { useNavigate } from "react-router-dom";

export default function RegisterForm() {
  const { usernameValue, setUsernameValue, passwordValue, setPasswordValue } =
    useCredentials();
  const navigate = useNavigate();
  const registerRequest = async (formData) => {
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: formData.username,
        pass_word: formData.password,
      }),
    };
    const response = await fetch(
      "http://localhost:3000/users/register",
      options
    );
    const data = await response.json();

    if (response.status == 201) {
      localStorage.setItem("token", JSON.stringify(data.token));
      navigate("/login");
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
    registerRequest({ username: usernameValue, pass_word: passwordValue });
    setUsernameValue("");
    setPasswordValue("");
  };

  return (
    <div className="login-body">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1 className="login-title">Register</h1>
        <input
          type="text"
          className="login-input"
          value={usernameValue}
          onChange={handleUsernameChange}
          name="username"
          placeholder="Username"
        />
        <input
          type="password"
          className="login-input"
          value={passwordValue}
          name="password"
          placeholder="Password"
          onChange={handlePasswordChange}
        />
        <input type="submit" value="Register" className="login-button" />
        <Link to="/login">Already have an account? Log in.</Link>
      </form>
    </div>
  );
}
