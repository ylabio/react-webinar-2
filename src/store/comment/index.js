import StateModule from "../module";

/**
 * Комментарий
 */
class CommentState extends StateModule {

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      countAddComment: 0
    };
  }

  /**
   * Добавить комментарии
   * @param data
   * @returns {Promise<void>}
   */
  async addComment(data) {
    try {
      const json = await this.services.api.request({
        method: 'POST',
        url: '/api/v1/comments',
        body: JSON.stringify(data)
      });
      
      if (!json.error) {
        this.setState({
          ...this.getState(),
          countAddComment: this.getState().countAddComment += 1
        }, 'Коммент добавлен');
      }
    } catch (error) {
      console.error(error);
    }
  }
}

export default CommentState;
