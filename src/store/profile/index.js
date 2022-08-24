import StateModule from "../module";

/**
 * Состояние каталога
 */
class ProfileState extends StateModule {
  initState() {
    return {
      username: "",
      phone: "",
      email: "",
    };
  }

  async getProfile(token, callback) {
    try {
      const response = await fetch("/api/v1/users/self", {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          "X-Token": token,
        },
      });
      const json = await response.json();

      if (!json.error) {
        this.setState({
          username: json.result.profile.name,
          phone: json.result.profile.phone,
          email: json.result.email,
        });
        callback(true);
      } else {
        this.setState({
          username: "",
          phone: "",
          email: "",
        });
        callback(false);
      }
    } catch (e) {
      console.log(e.message);
    }
  }
}

export default ProfileState;
