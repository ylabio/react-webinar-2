import StateModule from "../module";

export default class SessionState extends StateModule {
  initState() {
    return {
      user: null,
      isLoading: true,
      loadingErr: false
    }
  }

  setUser(user) {
    this.setState({
      ...this.getState(),
      user
    }, 'Инициализация юзера')
  }

  async getProfile() {
    const token = localStorage.getItem('TOKEN')
    
    this.changeLoading(true)
    
    const res = await fetch('/api/v1/users/self', {
      headers: {
        "X-Token": token
      }
    })
    const data = await res.json()
    if (data.error) {
      this.setLoadingErr(true)   
      this.changeLoading(false)
      return
    }

    this.setState({
      ...this.getState(),
      isLoading: false,
      user: data.result
    }, 'Получен юзер по токену')
    
    this.changeLoading(false)
  }

  async quit() {
    const token = localStorage.getItem('TOKEN')
    await fetch('/api/v1/users/sign', {
      method: 'DELETE',
      headers: {
        "X-Token": token
      }
    })
    localStorage.removeItem('TOKEN')
    
    this.setState({
      ...this.getState(),
      user: null
    }, 'Выход на клиенте')
  }

  setLoadingErr(b) {
    this.setState({
      ...this.getState(),
      loadingErr: b
    }, b ? 'Установка ошибки при подзагрузке' : 'Сброс ошибки при подзагрузке')
  }

  changeLoading(b) {
    this.setState({
      ...this.getState(),
      isLoading: b
    }, b ? 'Начало загрузки' : 'Конец загрузки')
  }
}