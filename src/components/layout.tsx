import { ReactNode } from "react";
import styled from "styled-components";
import Navbar from "./Navbar";

type LayoutProps = {
  children: ReactNode;
  onToggleTheme: () => void;
  theme: "light" | "dark";
};

const MaxWidthContainer = styled.div`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 1rem;
  position: relative;
`;

const LayoutContainer = styled.div`
  background-color: ${({ theme }) => theme.bodyBg};
  color: ${({ theme }) => theme.textColor};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex: 1;
  position: relative;
  // height: calc(100vh - 60px);
  // margin-top: 60px;
`;

const LeftSidebar = styled.aside`
  width: 350px;
  padding: 2rem 1rem;
  position: fixed;
  left: 0;
  top: 60px;
  bottom: 0;
  overflow-y: auto;
  border-right: 0.2px solid rgb(211, 211, 211);
  background-color: ${({ theme }) => theme.sidebarBg || theme.bodyBg};
`;

const MainContent = styled.main`
  position: fixed;
  top: 60px;
  left: 320px;
  right: 320px;
  bottom: 0;
  overflow-y: auto;
  padding: 2rem;
  
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
`;

const RightSidebar = styled.aside`
  width: 350px;
  padding: 2rem 1rem;
  position: fixed;
  right: 0;
  top: 60px;
  bottom: 0;
  overflow-y: auto;
  border-left: 0.2px solid rgb(211, 211, 211);
  background-color: ${({ theme }) => theme.sidebarBg || theme.bodyBg};
`;

// tag components (left)
const TagSection = styled.section`
  margin: 1rem auto;
  padding-left: 60px;
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

const ProfileSection = styled.section`
  text-align: center;
  margin-top: 30px;
  padding-right: 60px;
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

export default function Layout({
  children,
  onToggleTheme,
  theme,
}: LayoutProps) {
  return (
    <LayoutContainer>
      <Navbar onToggleTheme={onToggleTheme} theme={theme} />
      <MaxWidthContainer>
      <ContentWrapper>
        {/* chap tomon sibebar (tags filter uchun) */}
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
        {/* body content shu yerda  */}
        <MainContent>{children}</MainContent>
        {/* o'ng tomon contenti shu yerda */}
        <RightSidebar>
          <ProfileSection>
            <ProfileImage
              src="https://avatars.githubusercontent.com/u/65296404?v=4"
              alt="Profile"
            />
            <ProfileName>Sardor-M</ProfileName>
            <ProfileBio>Sardor Madaminov</ProfileBio>

            {/* {// tags  */}
            <div
              style={{
                display: "flex",
                gap: "0.5rem",
                justifyContent: "center",
                marginBottom: "1.5rem",
              }}
            >
              <span className="px-2 py-1 text-sm bg-gray-100 rounded-full">
                i18n-react
              </span>
              <span className="px-2 py-1 text-sm bg-gray-100 rounded-full">
                React Js
              </span>
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
      </MaxWidthContainer>
    </LayoutContainer>
  );
}
