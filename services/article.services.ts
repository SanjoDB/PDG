export class ArticleServices {
  async getArticle(url: string): Promise<string> {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch article');
      }
      return await response.text();
    } catch (error) {
      console.error('Error getting article:', error);
      throw error;
    }
  }
}
