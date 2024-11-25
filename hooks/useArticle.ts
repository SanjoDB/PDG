import { useQuery } from '@tanstack/react-query';
import { ArticleServices } from '@/services/article.services';

export const useArticle = (url: string) => {
  const articleServices = new ArticleServices();

  const article = useQuery({
    queryKey: ['article.md'],
    queryFn: () => articleServices.getArticle(url),
  });

  return {
    data: article.data !== undefined ? article.data.toString() : '',
    error: article.error !== undefined ? article.error : null,
    loading: article.isLoading,
  };
};
