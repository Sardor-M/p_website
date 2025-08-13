import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';
import { themeColor } from '@/themes/color';

type CodeBlockProps = {
    language: string;
    code: string;
};

const CodeBlockWrapper = styled.div`
    position: relative;
    margin: 1.5rem 0;
    border-radius: 6px;
    overflow: hidden;
    border: 1px solid
        ${({ theme }) => (theme.mode === 'dark' ? themeColor.border.dark : themeColor.border.light)};

    ${themeColor.breakpoints.mobile} {
        margin: 1.5rem 0;
        border-radius: 0;
        border-left: none;
        border-right: none;
    }
`;

const CodeHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.65rem 0.9rem;
    background: ${({ theme }) =>
        theme.mode === 'dark'
            ? themeColor.codeContent.codeHeaderDark
            : themeColor.codeContent.codeHeaderLight};
    border-bottom: 1px solid
        ${({ theme }) => (theme.mode === 'dark' ? themeColor.border.dark : themeColor.border.light)};

    ${themeColor.breakpoints.mobile} {
        padding: 0.5rem 0.75rem;
    }
`;

const LanguageLabel = styled.span`
    color: ${({ theme }) =>
        theme.mode === 'dark'
            ? themeColor.codeContent.codeLangLabelDark
            : themeColor.codeContent.codeLangLabelLight};
    font-weight: 500;
    font-size: 0.875rem;
    text-transform: lowercase;
`;

const CopyButton = styled.button`
    background: transparent;
    border: 0.4px solid
        ${({ theme }) => (theme.mode === 'dark' ? themeColor.border.dark : themeColor.border.light)};
    color: ${({ theme }) =>
        theme.mode === 'dark'
            ? themeColor.codeContent.codeButtonDark
            : themeColor.codeContent.codeButtonLight};
    cursor: pointer;
    padding: 0.25rem 0.75rem;
    font-size: 0.75rem;
    border-radius: 4px;
    transition: all 0.2s ease;
    font-family: inherit;

    &:hover {
        background: ${({ theme }) =>
            theme.mode === 'dark' ? themeColor.background.light : themeColor.background.light};
        color: ${({ theme }) =>
            theme.mode === 'dark'
                ? themeColor.codeContent.codeCodeLight
                : themeColor.codeContent.codeButtonDark};
    }

    &:active {
        transform: scale(0.95);
    }
`;

const PreBlock = styled.pre`
    margin: 0;
    padding: 1rem;
    overflow-x: auto;
    font-size: 0.9rem;
    line-height: 1.6;
    background: ${({ theme }) =>
        theme.mode === 'dark'
            ? themeColor.codeContent.codePreDark
            : themeColor.codeContent.codePreLight};

    code {
        background: none !important;
        padding: 0 !important;
        color: ${({ theme }) =>
            theme.mode === 'dark'
                ? themeColor.codeContent.codeTextDark
                : themeColor.codeContent.codeTextLight};
        display: block;
        white-space: pre;
    }

    &::-webkit-scrollbar {
        height: 2px;
    }

    &::-webkit-scrollbar-track {
        background: ${({ theme }) =>
            theme.mode === 'dark' ? themeColor.background.dark : themeColor.background.light};
    }

    &::-webkit-scrollbar-thumb {
        background: ${({ theme }) =>
            theme.mode === 'dark' ? themeColor.border.dark : themeColor.border.light};
        border-radius: 4px;
    }

    ${themeColor.breakpoints.mobile} {
        padding: 1rem;
        font-size: 0.85rem;
    }
`;

const languageMap: Record<string, string> = {
    javascript: 'javascript',
    js: 'javascript',
    typescript: 'typescript',
    ts: 'typescript',
    python: 'python',
    py: 'python',
    sql: 'sql',
    json: 'json',
    bash: 'bash',
    sh: 'bash',
    css: 'css',
    html: 'html',
    jsx: 'javascript',
    tsx: 'typescript',
    java: 'java',
    cpp: 'cpp',
    c: 'c',
    go: 'go',
    rust: 'rust',
    php: 'php',
    ruby: 'ruby',
    swift: 'swift',
    kotlin: 'kotlin',
    yaml: 'yaml',
    yml: 'yaml',
    markdown: 'markdown',
    md: 'markdown',
};

export default function CodeBlock({ language, code }: CodeBlockProps) {
    const [copied, setCopied] = useState<boolean>(false);
    const codeRef = useRef<HTMLElement>(null);

    const normalizedLanguage = languageMap[language?.toLowerCase()] || language || 'plaintext';

    useEffect(() => {
        if (codeRef.current && hljs) {
            try {
                hljs.highlightElement(codeRef.current);
            } catch (err) {
                console.warn('Failed to highlight code:', err);
            }
        }
    }, [code, normalizedLanguage]);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    return (
        <CodeBlockWrapper>
            <CodeHeader>
                <LanguageLabel>{normalizedLanguage}</LanguageLabel>
                <CopyButton onClick={handleCopy}>{copied ? 'Copied !' : 'Copy'}</CopyButton>
            </CodeHeader>
            <PreBlock>
                <code ref={codeRef} className={`language-${normalizedLanguage}`}>
                    {code}
                </code>
            </PreBlock>
        </CodeBlockWrapper>
    );
}
