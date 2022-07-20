import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/LoadingError/Loading";
import Toast from "../components/LoadingError/Toast";
import { login } from "../Redux/Actions/UserActions";
import Message from "./../components/LoadingError/Error";
const Login = ({ history }) =>
{
  window.scrollTo(0, 0);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;

  useEffect(() =>
  {
    if (userInfo && userInfo.user.role_id === "94C7AFC2-1B38-4D3D-9851-3A1419016AE3")
    {
      history.push("/");
    } else if (
      userInfo && userInfo.user.role_id === "B896936E-EF5A-4332-8872-46301343805C"
    )
    {
      history.push("/orders");
    }
  }, [userInfo, history]);

  const submitHandler = (e) =>
  {
    e.preventDefault();
    dispatch(login(username, password));
  };
  return (
    <>
      <Toast />
      <div
        className="card shadow mx-auto"
        style={{ maxWidth: "380px", marginTop: "100px" }}
      >
        <div className="card-body">
          {error && <Message variant="alert-danger">{error}</Message>}
          {loading && <Loading />}
          <h4 className="card-title mb-4 text-center">Đăng nhập vào hệ thống</h4>
          <form onSubmit={submitHandler}>
            <div className="mb-3">
              <input
                className="form-control"
                placeholder="Nhập tài khoản"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <input
                className="form-control"
                placeholder="Nhập mật khẩu"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <button type="submit" className="btn btn-primary w-100">
                Đăng nhập
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
