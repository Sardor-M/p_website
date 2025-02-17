import React from 'react';
import styled from 'styled-components';

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const TagButton = styled.button<{ selected: boolean }>`
  background: ${({ selected }) => (selected ? '#ffcc00' : '#ddd')};
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 5px;
`;

type Props = {
  tags: string[];
  selectedTag: string | null;
  setSelectedTag: (tag: string | null) => void;
};

const TagFilter: React.FC<Props> = ({ tags, selectedTag, setSelectedTag }) => {
  return (
    <Sidebar>
      {tags.map((tag) => (
        <TagButton
          key={tag}
          selected={selectedTag === tag}
          onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
        >
          {tag}
        </TagButton>
      ))}
    </Sidebar>
  );
};

export default TagFilter;
