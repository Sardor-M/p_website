import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css'; // Switch to atom-one-dark theme
import 'highlight.js/lib/languages/javascript';
import 'highlight.js/lib/languages/typescript';
import 'highlight.js/lib/languages/python';
import 'highlight.js/lib/languages/bash';
import 'highlight.js/lib/languages/sql';
import 'highlight.js/lib/languages/json';

import Button from '@/components/Common/Button';
import { ReactNode, useState } from 'react';
import styled from 'styled-components';
import { themeColor } from '@/themes/color';

const CodeBlockWrapper = styled.div`
    position: relative;
    margin: 1.5rem 0;
`;

const CodeHeader = styled.div<{ language: string }>`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 1rem;
    background: ${({ theme }) =>
        theme.mode === 'dark'
            ? themeColor.codeContent.codeHeaderDark
            : themeColor.codeContent.codeHeaderLight};
    color: ${({ theme }) =>
        theme.mode === 'dark'
            ? themeColor.codeContent.codeHeaderBgDark
            : themeColor.codeContent.codeHeaderBgLight};
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    font-size: 0.8rem;
    font-family: 'Geist', monospace;
`;

const LanguageLabel = styled.span`
    color: ${({ theme }) =>
        theme.mode === 'dark'
            ? themeColor.codeContent.codeLangLabelDark
            : themeColor.codeContent.codeLangLabelLight};
    font-weight: 500;
    text-transform: lowercase;
`;

const CopyButton = styled(Button).attrs({
    variant: 'ghost',
    size: 'sm',
})`
    background: transparent;
    border: none;
    color: ${({ theme }) =>
        theme.mode === 'dark'
            ? themeColor.codeContent.codeButtonDark
            : themeColor.codeContent.codeButtonLight};
    cursor: pointer;
    padding: 0.25rem 0.5rem;
    font-size: 0.75rem;
    border-radius: 4px;
    transition: background 0.2s ease;

    &:hover {
        background: ${({ theme }) =>
            theme.mode === 'dark'
                ? themeColor.codeContent.codeButtonLight
                : themeColor.codeContent.codeButtonDark};
    }
`;

const PreBlock = styled.pre<{ hasHeader: boolean; language: string }>`
    margin: 0;
    border-top-left-radius: ${(props) => (props.hasHeader ? '0' : '8px')};
    border-top-right-radius: ${(props) => (props.hasHeader ? '0' : '8px')};
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    padding: 1.25rem;
    overflow-x: auto;
    font-size: 0.875rem;
    line-height: 1.6;
    font-family: 'Geist', monospace;
    background: ${({ theme }) =>
        theme.mode === 'dark'
            ? themeColor.codeContent.codePreDark
            : themeColor.codeContent.codePreLight};

    code {
        background: none !important;
        padding: 0 !important;
        font-size: 0.8rem;
        font-family: inherit !important;
        color: ${({ theme }) =>
            theme.mode === 'dark'
                ? themeColor.codeContent.codeCodeDark
                : themeColor.codeContent.codeCodeLight};
        display: block;
        white-space: pre-wrap;
    }

    .hljs {
        background: transparent !important;
    }
`;

const languageMap: Record<string, string> = {
    js: 'js',
    ts: 'ts',
    py: 'python',
    sh: 'bash',
    zsh: 'bash',
    mysql: 'sql',
    cmd: 'bash',
    redis: 'bash',
};

export default function CodeBlock({
    children,
    language,
}: {
    children: ReactNode;
    language: string;
}) {
    const [copied, setCopied] = useState(false);
    const displayLanguage = language?.toLowerCase() || 'text';
    const hljsLang = languageMap[displayLanguage] || displayLanguage;

    const codeContent =
        typeof children === 'string'
            ? children
            : children === null || children === undefined
              ? '// No code content provided'
              : String(children);

    function cleanCommentLines(code: string) {
        return code.replace(/^\s*[,;`]\s*(\/\/|\/\*|#|--)/gm, '$1');
    }

    let highlightedCode: string = '';
    try {
        if (codeContent && codeContent.trim() !== '') {
            const cleanedCode = cleanCommentLines(codeContent);

            highlightedCode = hljs.highlight(cleanedCode, {
                language: hljsLang,
                ignoreIllegals: true,
            }).value;
        } else {
            highlightedCode = '// No code content provided';
        }
    } catch (error) {
        console.error('Error highlighting code:', error);
        highlightedCode = codeContent || '// Error processing code content';
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(codeContent);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 2000);
    };

    return (
        <CodeBlockWrapper>
            <CodeHeader language={displayLanguage}>
                <LanguageLabel>{displayLanguage}</LanguageLabel>
                <CopyButton onClick={handleCopy}>{copied ? 'Copied' : 'Copy'}</CopyButton>
            </CodeHeader>
            <PreBlock hasHeader={true} language={displayLanguage}>
                <code
                    className={`language-${displayLanguage} hljs`}
                    dangerouslySetInnerHTML={{
                        __html: highlightedCode || codeContent || '// No code content',
                    }}
                />
            </PreBlock>
        </CodeBlockWrapper>
    );
}
