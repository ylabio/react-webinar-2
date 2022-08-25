import StateModule from "../module";


class ProfileState extends StateModule {

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      name: '',
      phone: '',
      email: '',
      waiting: false
    };
  }

  async loadProfile() {
    const token = localStorage.getItem("token");
    if (token){
      this.setState({
        ...this.getState(),
        waiting: true
      })
      const response = await fetch(`/api/v1/users/self`, {
        method: 'GET',
        headers: { 'X-Token': token, "Content-Type": "application/json" }
      });
      const json = await response.json();
      this.setState({
        name: json.result.profile.name,
        phone: json.result.profile.phone,
        email: json.result.email,
        waiting: false
      })}
  }

}


export default ProfileState;
