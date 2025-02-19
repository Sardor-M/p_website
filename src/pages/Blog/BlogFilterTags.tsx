import styled from "styled-components";
import { X } from "lucide-react";
import { getThemeStyles } from "@/themes";

type TagsProps = {
  tags: string[];
  selectedTag: string | null;
  onTagSelect: (tag: string | null) => void;
};

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  width: 100%;
  margin: 1rem 0;
`;

const TagsWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const TagItem = styled.span<{ $isSelected: boolean }>`
  padding: 0.4rem 0.8rem;
  border-radius: 10px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: ${(props) =>
    props.$isSelected
      ? props.theme.mode === "dark"
        ? "#2D2D2D"
        : "#E5E7EB"
      : "transparent"};
  color: ${(props) => props.theme.textColor};
  border: 1px transparent
    ${(props) => (props.theme.mode === "dark" ? "#3F3F3F" : "#E5E7EB")};

  &:hover {
    background-color: ${(props) =>
      props.theme.mode === "dark" ? "#2D2D2D" : "#E5E7EB"};
  }
`;

const ResetButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.4rem 0.8rem;
  border-radius: 10px;
  font-size: 0.875rem;
  cursor: pointer;
  background-color: transparent;
  ${({ theme }) => getThemeStyles(theme, "text")};
  border: 1px
    ${(props) => (props.theme.mode === "dark" ? "#3F3F3F" : "#E5E7EB")};
  transition: all 0.2s ease;

  &:hover {
    background-color: ${(props) =>
      props.theme.mode === "dark" ? "#2D2D2D" : "#E5E7EB"};
  }

  svg {
    width: 14px;
    height: 14px;
  }
`;

export default function BlogFilterTags({
  tags,
  selectedTag,
  onTagSelect,
}: TagsProps) {
  return (
    <FilterContainer>
      <TagsWrapper>
        {tags.map((tag) => (
          <TagItem
            key={tag}
            $isSelected={selectedTag === tag}
            onClick={() => onTagSelect(selectedTag === tag ? null : tag)}
          >
            {tag}
          </TagItem>
        ))}
      </TagsWrapper>
      {selectedTag && (
        <ResetButton onClick={() => onTagSelect(null)}>
          <X /> Reset
        </ResetButton>
      )}
    </FilterContainer>
  );
}
