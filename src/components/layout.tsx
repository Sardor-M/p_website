
import React, { ReactNode } from "react";
import styled from "styled-components";
import Navigation from "./navigation/Navigation";

interface LayoutProps {
  children: ReactNode;
}

// const LayoutContainer = styled.div`
//   background-color: ${({ theme }) => theme.bodyBg};
//   color: ${({ theme }) => theme.textColor};
//   min-height: 100vh;
// //   padding: 1rem;
// `;

// const MainContent = styled.main`
//     padding: 1rem;
// `


const LayoutContainer = styled.div`
  background-color: ${({ theme }) => theme.bodyBg};
  color: ${({ theme }) => theme.textColor};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex: 1;
  height: calc(100vh - 60px); // Adjust based on your navigation height
`;

const LeftSidebar = styled.aside`
  width: 250px;
  padding: 2rem 1rem;
  position: fixed;
  left: 0;
  top: 60px; // Adjust based on your navigation height
  bottom: 0;
  overflow-y: auto;
  border-right: 1px solid ${({ theme }) => theme.borderColor};
  background-color: ${({ theme }) => theme.sidebarBg || theme.bodyBg};
`;

const MainContent = styled.main`
  flex: 1;
  margin-left: 250px; // Same as LeftSidebar width
  margin-right: 300px; // Same as RightSidebar width
  padding: 2rem;
  overflow-y: auto;
  min-height: 100%;
`;

const RightSidebar = styled.aside`
  width: 300px;
  padding: 2rem 1rem;
  position: fixed;
  right: 0;
  top: 60px; // Adjust based on your navigation height
  bottom: 0;
  overflow-y: auto;
  border-left: 1px solid ${({ theme }) => theme.borderColor};
  background-color: ${({ theme }) => theme.sidebarBg || theme.bodyBg};
`;

// Tag components for the left sidebar
const TagSection = styled.section`
  margin-bottom: 2rem;
`;

const TagTitle = styled.h2`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  font-weight: 600;
`;

const TagList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const TagItem = styled.li`
  padding: 0.5rem 0;
  cursor: pointer;
  transition: color 0.2s;
  
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

// Profile components for the right sidebar
const ProfileSection = styled.section`
  text-align: center;
`;

const ProfileImage = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 10%;
  margin-bottom: 1rem;
  object-fit: cover;
`;

const ProfileName = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
`;

const ProfileBio = styled.p`
  color: ${({ theme }) => theme.textMuted};
  margin-bottom: 1.5rem;
`;

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <LayoutContainer>
      <Navigation />
      <ContentWrapper>
        <LeftSidebar>
          <TagSection>
            <TagTitle>📌 Tags</TagTitle>
            <TagList>
              <TagItem>Daily</TagItem>
              <TagItem>Blog</TagItem>
              <TagItem>Network</TagItem>
              <TagItem>React.js</TagItem>
              <TagItem>Next.js</TagItem>
              <TagItem>Troubleshooting</TagItem>
            </TagList>
          </TagSection>
        </LeftSidebar>

        <MainContent>
          {children}
        </MainContent>

        <RightSidebar>
          <ProfileSection>
            <ProfileImage src="https://avatars.githubusercontent.com/u/65296404?v=4" alt="Profile" />
            <ProfileName>Sardor-M</ProfileName>
            <ProfileBio>Sardor Madaminov</ProfileBio>
            
            {/* {// tags  */}
            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginBottom: '1.5rem' }}>
              <span className="px-2 py-1 text-sm bg-gray-100 rounded-full">i18n-react</span>
              <span className="px-2 py-1 text-sm bg-gray-100 rounded-full">React Js</span>
            </div>

            {/* // social media section */}
            <TagSection>
              <TagTitle>✉️ Contact</TagTitle>
              <TagList>
                <TagItem>github</TagItem>
                <TagItem>instagram</TagItem>
                <TagItem>email</TagItem>
              </TagList>
            </TagSection>
          </ProfileSection>
        </RightSidebar>
      </ContentWrapper>
    </LayoutContainer>
  );
};

export default Layout;