import { Link } from "react-router-dom";
import { useCredentials } from "../../contexts";
import { useNavigate } from "react-router-dom";

export default function RegisterForm() {
  const { usernameValue, setUsernameValue, passwordValue, setPasswordValue } =
    useCredentials();
  const navigate = useNavigate();
  const registerRequest = async (formData) => {
    console.log(formData);
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: formData.username,
        password: formData.password,
      }),
    };
    const response = await fetch(
      "http://localhost:3000/users/register",
      options
    );
    const data = await response.json();

    if (response.status == 200) {
      localStorage.setItem("token", JSON.stringify(data.token));
      navigate("/login");
      const token = JSON.parse(localStorage.getItem("token"));
    } else {
      alert(data.error);
    }
  };

  const handleUsernameChange = (e) => {
    setUsernameValue(e.target.value);
    console.log(usernameValue);
  };

  const handlePasswordChange = (e) => {
    setPasswordValue(e.target.value);
    console.log(passwordValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    registerRequest({ username: usernameValue, password: passwordValue });
    setUsernameValue("");
    setPasswordValue("");
  };

  return (
    <div className="login-body">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Register</h1>
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
