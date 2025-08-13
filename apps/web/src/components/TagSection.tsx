import styled from 'styled-components';
import { themeColor } from '@/themes/color';

type TagSectionProps = {
    tags: string[] | null | undefined;
};

const TopicList = styled.div`
    display: flex;
    gap: 0.75rem;
    margin: 1rem 0;
    flex-wrap: wrap;
`;

const StyledTag = styled.span`
    padding: 0.2rem 0.4rem;
    font-size: 0.6rem;
    border-radius: 12px;
    background: ${({ theme }) =>
        theme.mode === 'dark' ? themeColor.backgroundSpan.dark : themeColor.backgroundSpan.light};
    color: ${({ theme }) =>
        theme.mode === 'dark' ? themeColor.text.muted.dark : themeColor.text.muted.light};
    border: 0.2px solid
        ${({ theme }) => (theme.mode === 'dark' ? themeColor.border.dark : themeColor.border.light)};
    transition: all 0.2s ease-in-out;

    &:hover {
        background: ${({ theme }) =>
            theme.mode === 'dark' ? themeColor.activeHover.dark : themeColor.activeHover.light};
        color: ${({ theme }) =>
            theme.mode === 'dark' ? themeColor.text.dark : themeColor.text.light};

        transform: translateY(-2px);
    }
`;

export default function TagSection({ tags }: TagSectionProps) {
    if (!tags || tags.length === 0) return null;

    return (
        <TopicList>
            {tags.map((tag, index) => (
                <StyledTag key={`tag-${index}`}>{tag}</StyledTag>
            ))}
        </TopicList>
    );
}
