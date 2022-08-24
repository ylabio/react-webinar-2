import StateModule from '../module';
import { getUserToken, setUserToken } from '../../utils/localstorage/auth';

/**
 * Состояние товара
 */
class UserState extends StateModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    const token = getUserToken();

    if (token) {
      this.getSelf(token);
    }

    return {
      name: '',
      phone: '',
      email: '',
    };
  }

  async getSelf(token) {
    const response = await fetch(`/api/v1/users/self`, {
      headers: {
        'Content-Type': 'application/json',
        'X-Token': token,
      },
    });
    const json = await response.json();

    if (json.result) {
      this.setState({
        name: json.result.profile.name,
        phone: json.result.profile.phone,
        email: json.result.email,
      });
    } else {
      setUserToken('');
    }
  }

  async logInUser({ login, password }) {
    try {
      const response = await fetch(`/api/v1/users/sign?fields=_id,profile(*),email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          login,
          password,
          remember: true,
        }),
      });
      const json = await response.json();
      console.log(json);
      if (json.result) {
        this.setState({
          name: json.result.user.profile.name,
          phone: json.result.user.profile.phone,
          email: json.result.user.email,
        });
        setUserToken(json.result.token);
      } else if (json.error) {
        this.store.get('error').setError(json.error);
      }
    } catch (e) {
      this.store.get('error').setError(e);
    }
  }

  async logOutUser() {
    const token = getUserToken();
    const response = await fetch(`/api/v1/users/sign`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-Token': token,
      },
    });
    const json = await response.json();
    if (json.result) {
      this.setState({
        name: '',
        phone: '',
        email: '',
      });
      setUserToken('');
    }
  }
}

export default UserState;
