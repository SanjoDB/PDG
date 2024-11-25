import '@/styles/markdown.css';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { useArticle } from '@/hooks/useArticle';
import Loader from '@/components/loader';
interface MarkdownViewerProps {
  markdownUrl: string;
}

const MarkdownViewer: React.FC<MarkdownViewerProps> = ({ markdownUrl }) => {
  const { data: markdownContent, loading: articleLoading } =
    useArticle(markdownUrl);

  return (
    <>
      {articleLoading ? (
        <Loader />
      ) : (
        <ReactMarkdown>{markdownContent}</ReactMarkdown>
      )}
    </>
  );
};

export default MarkdownViewer;
