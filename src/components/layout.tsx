import { ReactNode } from "react";
import styled from "styled-components";
import Navbar from "./Navbar";
import StyledCard from "./Card/StyledCard";
import { GithubFilled, LinkedinFilled, MailFilled } from "@ant-design/icons";
import { themeColor } from "../tools";

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
  // border-right: 0.2px solid rgb(211, 211, 211);
  background-color: ${({ theme }) => theme.sidebarBg || theme.bodyBg};
`;

const MainContent = styled.main`
  position: fixed;
  top: 60px;
  left: 310px;
  right: 360px;
  bottom: 0;
  overflow-y: auto;
  padding: 1rem;

  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
`;

const RightSidebar = styled.aside`
  width: 400px;
  padding: 2rem 1rem;
  position: fixed;
  right: 0;
  top: 60px;
  bottom: 0;
  overflow-y: auto;
  // border-left: 0.2px solid rgb(211, 211, 211);
  background-color: ${({ theme }) => theme.sidebarBg || theme.bodyBg};
`;

// tag components (left)
const TagSection = styled.section`
  margin: 1.5rem auto;
  padding-left: 70px;
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
  max-width: 280px;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 200px;
  border-radius: 5%;
  object-fit: cover;
  padding: 4 4rem;
`;

const ProfileName = styled.h2`
  font-size: 1rem;
  margin: 8px 8px;
`;

const ProfileBio = styled.p`
  color: rgb(165, 165, 165);
  margin: 10px 20px;
`;

const TagContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
`;

const Tag = styled.span`
  padding: 5px;
  margin: 0;
  border-radius: 8px;
  width: 40%;
  background-color: ${({ theme }) =>
    theme.mode === "dark" ? "#2D2D2D" : "rgb(235, 235, 235)"};
  color: ${({ theme }) => (theme.mode === "dark" ? "#FFFFFF" : "#000000")};
  text-align: center;
  font-size: 12px;
`;

const ContactTitle = styled.h2`
  font-size: 1.1rem;
  margin-top: 40px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.textColor};
  display: flex;
  align-items: center;
  gap: 0.5rem;

  svg {
    color: #6b7280;
  }
`;

const ContactList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ContactItem = styled.li`
  font-weight: 14px;
  padding: 0.75rem;
  cursor: pointer;
  transition: all 0.2s;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: ${({ theme }) =>
    theme.mode === "dark"
      ? themeColor.gray_text_color
      : themeColor.light_gray_text_color};

  &:hover {
    background-color: ${({ theme }) =>
      theme.mode === "dark" ? "#2D2D2D" : "#E5E7EB"};
  }

  svg {
    width: 14px;
    height: 14px;
  }
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
              <StyledCard key={"id"} variant="light" padding="sm" size="sm">
                <ProfileImage
                  src="https://avatars.githubusercontent.com/u/65296404?v=4"
                  alt="Profile"
                />
                <ProfileName>sardor-m</ProfileName>
                <ProfileBio>Sardor Madaminov</ProfileBio>
                {/* {// tags  */}
                <TagContainer>
                  <Tag>frontend</Tag>
                  <Tag>react-js</Tag>
                </TagContainer>
              </StyledCard>
              <ContactTitle>🔗 Contact</ContactTitle>
              <StyledCard key={"id"} variant="light" padding="sm" size="sm">
                <ContactList>
                  <ContactItem>
                    <GithubFilled />
                    github
                  </ContactItem>
                  <ContactItem>
                    <LinkedinFilled />
                    instagram
                  </ContactItem>
                  <ContactItem>
                    <MailFilled />
                    email
                  </ContactItem>
                </ContactList>
              </StyledCard>
            </ProfileSection>
          </RightSidebar>
        </ContentWrapper>
      </MaxWidthContainer>
    </LayoutContainer>
  );
}
