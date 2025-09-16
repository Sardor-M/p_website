import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

type UtterancesProps = {
    repo: string;
    issueTerm: string;
    theme: 'github-light' | 'github-dark';
};

const Container = styled.div`
    width: 100%;
    min-height: 200px;
    margin: 24px 0;
`;

export default function UtterancesComment({ repo, issueTerm, theme }: UtterancesProps) {
    const commentRef = useRef<HTMLDivElement>(null);
    const location = useLocation();

    useEffect(() => {
        const loadUtterancesScript = () => {
            if (commentRef.current) {
                commentRef.current.innerHTML = '';
            }

            const script = document.createElement('script');
            script.src = 'https://utteranc.es/client.js';
            script.setAttribute('repo', repo);
            script.setAttribute('issue-term', issueTerm);
            script.setAttribute('label', '💬');
            script.setAttribute('theme', theme);
            script.setAttribute('crossorigin', 'anonymous');
            script.async = true;

            script.onerror = () => {
                console.error('Error loading Utterances script');
                if (commentRef.current) {
                    commentRef.current.innerHTML =
                        '<div style="color: red;">Error loading comments. Please try again later.</div>';
                }
            };

            if (commentRef.current) {
                commentRef.current.appendChild(script);
            }
        };

        const timer = setTimeout(() => {
            loadUtterancesScript();
        }, 300);

        return () => {
            clearTimeout(timer);
            if (commentRef.current) {
                commentRef.current.innerHTML = '';
            }
        };
    }, [repo, issueTerm, theme, location.pathname]);

    return <Container ref={commentRef} id="utterances-comments" />;
}
