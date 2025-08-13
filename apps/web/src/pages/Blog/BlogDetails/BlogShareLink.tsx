import Button from '@/components/Common/Button';
import { CONFIG } from '@/config/site.config';
import { getThemeStyles } from '@/themes';
import { themeColor } from '@/themes/color';
import { BlogPost } from '@/types/blog';
import { formatDate } from '@/utils/fomatDate';
import { LinkedinFilled, TwitterCircleFilled } from '@ant-design/icons';
import { CheckCircle, Link, Share } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const AuthorSection = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 0.2rem;
    padding-top: 2rem;
    width: 100%;

    ${themeColor.breakpoints.mobile} {
        padding-top: 1rem;
    }
`;

const AuthorBlock = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    flex-grow: 1;

    ${themeColor.breakpoints.mobile} {
        gap: 0.75rem;
    }
`;

const ShareButtons = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-shrink: 0;
    margin-left: auto;
`;
const AuthorImage = styled.img`
    width: 48px;
    height: 48px;
    border-radius: 50%;
    flex-shrink: 0;

    ${themeColor.breakpoints.mobile} {
        width: 40px;
        height: 40px;
    }
`;

const AuthorInfo = styled.div`
    display: flex;
    flex-direction: column;
    min-width: 0;
    flex: 1;
`;

const AuthorName = styled.span`
    font-size: 1rem;
    font-weight: 500;
    color: ${({ theme }) => theme.textColor};

    ${themeColor.breakpoints.mobile} {
        font-size: 0.9375rem;
    }
`;

const PostMeta = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: ${({ theme }) => theme.textColor};
    font-size: 0.875rem;
    flex-wrap: wrap;

    span:not(:last-child)::after {
        margin-left: 0.5rem;
    }

    ${themeColor.breakpoints.mobile} {
        font-size: 0.8125rem;
        gap: 0.375rem;
    }
`;

const PostMetaReadTime = styled.span`
    color: ${({ theme }) => theme.textColor};
    font-size: 0.875rem;

    ${themeColor.breakpoints.mobile} {
        display: none;
    }
`;

const DropdownContainer = styled.div`
    position: relative;
`;

const DropdownMenu = styled.div`
    position: absolute;
    top: 100%;
    right: 0;
    margin-top: 0.5rem;
    ${({ theme }) => getThemeStyles(theme, 'background')};
    border: 1px solid ${({ theme }) => (theme.mode === 'dark' ? '#404040' : '#e5e5e5')};
    border-radius: 8px;
    padding: 0.5rem;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
    z-index: 10;
    min-width: 150px;

    ${themeColor.breakpoints.mobile} {
        right: -2px;
        min-width: 130px;
        padding: 0.3rem;
    }
`;

const DropdownItem = styled.button`
    font-family: Arial, Cantarell, 'Helvetica Neue', sans-serif;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    width: 100%;
    padding: 0.5rem 0.75rem;
    border: none;
    background: transparent;
    ${({ theme }) => getThemeStyles(theme, 'text')};
    font-size: 0.875rem;
    border-radius: 4px;
    transition: all 0.2s ease;
    cursor: pointer;

    &:hover {
        background: ${({ theme }) => (theme.mode === 'dark' ? '#2D2D2D' : '#f5f5f5')};
    }

    svg {
        width: 16px;
        height: 16px;
        flex-shrink: 0;
    }

    ${themeColor.breakpoints.mobile} {
        padding: 0.625rem 0.75rem;
        font-size: 0.8125rem;
    }
`;

const CopyNotification = styled.div`
    position: fixed;
    top: 1.5rem;
    left: 50%;
    transform: translateX(-50%);
    ${({ theme }) => getThemeStyles(theme, 'background')};
    border: 1px solid ${({ theme }) => (theme.mode === 'dark' ? '#404040' : '#e5e5e5')};
    padding: 0.75rem 1rem;
    border-radius: 8px;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
    z-index: 1000;
    white-space: nowrap;

    ${themeColor.breakpoints.mobile} {
        top: 1rem;
        padding: 0.625rem 0.875rem;
        font-size: 0.875rem;
        max-width: 90%;
    }
`;

export default function AuthorSectionWithShare({ post }: { post: BlogPost }) {
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const [showCopyNotification, setShowCopyNotification] = useState(false);
    const [authorImg, setAuthorImg] = useState(
        'https://avatars.githubusercontent.com/u/65296404?v=4'
    );

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        setShowCopyNotification(true);
        setTimeout(() => setShowCopyNotification(false), 2000);
        setShowDropdown(false);
    };

    const handleShare = (platform: 'twitter' | 'linkedin') => {
        const url = encodeURIComponent(window.location.href);
        const title = encodeURIComponent(post.title || '');

        const shareUrls = {
            twitter: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
            linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
        };

        window.open(shareUrls[platform], '_blank');
        setShowDropdown(false);
    };

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <AuthorSection>
            <AuthorBlock>
                <AuthorImage
                    src={authorImg}
                    alt={post.metadata.author.name || 'Author'}
                    onError={() => setAuthorImg(CONFIG.profile.imageUrl)}
                />
                <AuthorInfo>
                    <AuthorName>{post.metadata.author.name}</AuthorName>
                    <PostMeta>
                        <span>
                            {formatDate(post.date || 'fix qilinadi', { includeTime: true })}
                        </span>
                        <PostMetaReadTime>- {post.readTime}</PostMetaReadTime>
                    </PostMeta>
                </AuthorInfo>
            </AuthorBlock>

            <ShareButtons>
                <DropdownContainer ref={dropdownRef}>
                    <Button
                        onClick={() => setShowDropdown(!showDropdown)}
                        size="sm"
                        variant="ghost"
                    >
                        <Share
                            style={{
                                width: '20px',
                            }}
                        />
                    </Button>
                    {showDropdown && (
                        <DropdownMenu>
                            <DropdownItem onClick={handleCopyLink}>
                                <Link />
                                Copy link
                            </DropdownItem>
                            <DropdownItem onClick={() => handleShare('twitter')}>
                                <TwitterCircleFilled />
                                Twitter
                            </DropdownItem>
                            <DropdownItem onClick={() => handleShare('linkedin')}>
                                <LinkedinFilled />
                                LinkedIn
                            </DropdownItem>
                        </DropdownMenu>
                    )}
                </DropdownContainer>
            </ShareButtons>

            {showCopyNotification && (
                <CopyNotification>
                    <CheckCircle size={16} />
                    Link copied to clipboard
                </CopyNotification>
            )}
        </AuthorSection>
    );
}
