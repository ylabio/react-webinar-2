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
      profile: {},
      isLoading: false,
    };
  }

  /**
   * Загрузка списка товаров
   */
  async getProfile() {
    // Сброс текущего товара и установка признака ожидания загрузки
    this.setState({
      isLoading: true,
      data: {},
    });

    try {
      const response = await fetch(
        `/api/v1/articles/${id}?fields=*,maidIn(title,code),category(title)`
      );
      const json = await response.json();

      // Товар загружен успешно
      this.setState({
        data: json.result,
        isLoading: false,
      });
    } catch (e) {
      // Ошибка при загрузке
      // @todo В стейт можно положть информауию об ошибке
      this.setState({
        data: {},
        isLoading: false,
      });
    }
  }
}

export default ProfileState;
