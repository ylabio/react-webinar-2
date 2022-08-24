import Api from "../../API";
import StateModule from "../module";

/**
 * Состояние логина/аутентификации
 */
class LoginState extends StateModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      user: {},
      token: localStorage.getItem("token") || "",
      isAuth: false,
      isLoading: false,
      error: "",
      prevPage: "",
    };
  }

  async auth(login, password) {
    this.setState({
      ...this.getState(),
      isLoading: true,
    });

    try {
      const response = await Api.auth(login, password);

      localStorage.setItem("token", response.token);
      this.setState({
        ...this.getState(),
        user: response.user,
        token: response.token,
        isAuth: true,
        error: "",
      });
    } catch (error) {
      const errors = error.response.data.error.data.issues
        .map((err) => err.message)
        .join(", ");
      this.setState({
        ...this.getState(),
        user: {},
        token: "",
        isAuth: false,
        error: errors,
      });
    } finally {
      this.setState({
        ...this.getState(),
        isLoading: false,
      });
    }
  }

  async logout() {
    this.setState({
      ...this.getState(),
      isLoading: true,
    });

    try {
      await Api.logout(this.getState().token);

      localStorage.removeItem("token");
      this.setState({
        ...this.getState(),
        isAuth: false,
        user: {},
        token: "",
        error: "",
      });
    } catch (error) {
      const errors = error.response.data.error.data.issues
        .map((err) => err.message)
        .join(", ");

      this.setState({
        ...this.getState(),
        error: errors,
      });
    } finally {
      this.setState({
        ...this.getState(),
        isLoading: false,
      });
    }
  }

  async authCheck() {
    this.setState({
      ...this.getState(),
      error: "",
      isLoading: true,
    });

    if (!this.getState().token) {
      this.setState({
        ...this.getState(),
        isLoading: false,
      });
    } else {
      try {
        const response = await Api.authCheck(this.getState().token);

        this.setState({
          ...this.getState(),
          isAuth: true,
          user: response,
          error: "",
        });
      } catch (error) {
        localStorage.removeItem("token");

        const errors = error.response.data.error.data.issues
          .map((err) => err.message)
          .join(", ");

        this.setState({
          ...this.getState(),
          user: {},
          token: "",
          isAuth: false,
          error: errors,
        });
      } finally {
        this.setState({
          ...this.getState(),
          isLoading: false,
        });
      }
    }
  }

  setPrevPage(location) {
    this.setState({
      ...this.getState(),
      prevPage: `${location.pathname}${location.search}`,
    });
  }

  resetErr() {
    this.setState({
      ...this.getState(),
      error: "",
    });
  }
}

export default LoginState;
