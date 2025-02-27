import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

interface UtterancesProps {
  repo: string;
  issueTerm: string;
  theme: 'github-light' | 'github-dark';
}

const Container = styled.div`
  width: 100%;
  min-height: 200px; /* Give some space for comments to load */
`;

export default function UtterancesComment({ repo, issueTerm, theme }: UtterancesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    if (window.location.search.includes('utterances=')) {
      const cleanUrl = window.location.pathname;
      window.history.replaceState({}, document.title, cleanUrl);
    }

    const loadUtterancesScript = () => {
      // Exisitng contentni o'chiramiz
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }

      const script = document.createElement('script');
      script.src = 'https://utteranc.es/client.js';
      script.setAttribute('repo', repo);
      script.setAttribute('issue-term', issueTerm);
      script.setAttribute('theme', theme);
      script.setAttribute('crossorigin', 'anonymous');
      script.async = true;

      if (containerRef.current) {
        containerRef.current.appendChild(script);
      }
    };

    const timer = setTimeout(() => {
      loadUtterancesScript();
    }, 300);

    return () => {
      clearTimeout(timer);
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [repo, issueTerm, theme, location.pathname]);

  return <Container id="comments" ref={containerRef} />;
}
