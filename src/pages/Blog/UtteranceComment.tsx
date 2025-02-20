import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

interface UtterancesProps {
  repo: string;
  issueTerm: string;
  theme: 'github-light' | 'github-dark';
}

const Container = styled.div`
  width: 100%;
`;

const LoadingMessage = styled.div`
  color: ${({ theme }) => theme.mode === 'dark' ? '#9CA3AF' : '#4B5563'};
  font-size: 0.875rem;
  padding: 1rem 0;
`;

const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.mode === 'dark' ? '#EF4444' : '#DC2626'};
  font-size: 0.875rem;
  padding: 1rem 0;
`;

const CommentsContainer = styled.div`
  width: 100%;
`;

export default function UtterancesComment({ repo, issueTerm, theme }: UtterancesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
      const createUtteranceScript = () => {
        setIsLoading(true);
        setError(null);

        // Exisitng contentni o'chiramiz
        if (containerRef.current) {
          containerRef.current.innerHTML = '';
        }

        const script = document.createElement('script');
        const config = {
          src: 'https://utteranc.es/client.js',
          repo,
          'issue-term': issueTerm,
          theme,
          crossorigin: 'anonymous',
          async: 'true'
        };

        Object.entries(config).forEach(([key, value]) => {
          script.setAttribute(key, value);
        });

        script.onerror = () => {
          setError('Failed to load comments. Please check your GitHub authentication.');
          setIsLoading(false);
        };

        script.onload = () => {
          setIsLoading(false);
        };

        // Agar container bo'lsagina append qilamiz
        if (containerRef.current) {
          containerRef.current.appendChild(script);
        }
      };

    createUtteranceScript();

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [repo, issueTerm, theme]);

  return (
    <Container>
      {isLoading && (
        <LoadingMessage>
          Loading comments...
        </LoadingMessage>
      )}
      {error && (
        <ErrorMessage>
          {error}
        </ErrorMessage>
      )}
      <CommentsContainer ref={containerRef} />
    </Container>
  );
}