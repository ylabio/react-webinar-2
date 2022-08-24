import Api from "../../API";
import StateModule from "../module";

/**
 * Состояние профиля
 */
class ProfileState extends StateModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      user: {},
      isLoading: false,
      error: "",
    };
  }

  async getProfile(token) {
    this.setState({
      ...this.getState(),
      error: "",
      isLoading: true,
    });

    if (!token) {
      this.setState({
        ...this.getState(),
        isLoading: false,
      });
    } else {
      try {
        const response = await Api.authCheck(token);

        this.setState({
          ...this.getState(),
          user: response,
          error: "",
        });
      } catch (error) {
        const errors = error.response.data.error.data.issues
          .map((err) => err.message)
          .join(", ");
        console.log(`Ошибка загрузки профиля ${errors}`);
        this.setState({
          ...this.getState(),
          user: {},
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
}

export default ProfileState;
