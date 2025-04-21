import { CONFIG } from '@/config/site.config';
import { getThemeStyles } from '@/themes';
import { BlogPost } from '@/types/blog';
import { formatDate } from '@/utils/fomatDate';
import { CheckCircleFilled, LinkedinFilled, TwitterCircleFilled } from '@ant-design/icons';
import { Link, Share } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const AuthorSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const AuthorBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const AuthorImage = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
`;

const AuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const AuthorName = styled.span`
  font-size: 1rem;
  font-weight: 500;
  color: ${({ theme }) => theme.textColor};
`;

const PostMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.textMuted};
  font-size: 0.875rem;

  span:not(:last-child)::after {
    content: '·';
    margin-left: 0.5rem;
  }
`;

const ShareButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ShareButton = styled.button`
  font-family: Arial, Cantarell, 'Helvetica Neue', sans-serif;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px transparent;
  ${({ theme }) => (theme.mode === 'dark' ? '#404040' : '#e5e5e5')};
  background: transparent;
  ${({ theme }) => getThemeStyles(theme, 'text')};
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => (theme.mode === 'dark' ? '#2D2D2D' : '#f5f5f5')};
  }

  svg {
    width: 18px;
    height: 18px;
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
  min-width: 200px;
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

  &:hover {
    background: ${({ theme }) => (theme.mode === 'dark' ? '#2D2D2D' : '#f5f5f5')};
  }

  svg {
    width: 16px;
    height: 16px;
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
    // clean up function to clear
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
            <span>{formatDate(post.date || 'fix qilinadi', { includeTime: true })}</span>
            <span>{post.readTime}</span>
          </PostMeta>
        </AuthorInfo>
      </AuthorBlock>

      <ShareButtons>
        <DropdownContainer ref={dropdownRef}>
          <ShareButton onClick={() => setShowDropdown(!showDropdown)}>
            <Share />
          </ShareButton>
          {showDropdown && (
            <DropdownMenu>
              <DropdownItem onClick={handleCopyLink}>
                <Link />
                Copy link
              </DropdownItem>
              <DropdownItem onClick={() => handleShare('twitter')}>
                <TwitterCircleFilled />
                Share on Twitter
              </DropdownItem>
              <DropdownItem onClick={() => handleShare('linkedin')}>
                <LinkedinFilled />
                Share on LinkedIn
              </DropdownItem>
            </DropdownMenu>
          )}
        </DropdownContainer>
      </ShareButtons>

      {showCopyNotification && (
        <CopyNotification>
          <CheckCircleFilled size={16} />
          Link copied to clipboard
        </CopyNotification>
      )}
    </AuthorSection>
  );
}
