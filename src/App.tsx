import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { Button } from "antd";
import {
  GithubOutlined,
  InstagramOutlined,
  MailOutlined,
} from "@ant-design/icons";

interface AppProps {
  onToggleTheme: () => void;
}

const Container = styled.div`
  background-color: ${({ theme }) => theme.bodyBg};
  color: ${({ theme }) => theme.textColor};
  min-height: 100vh;
  padding: 1rem;
`;

function App({ onToggleTheme }: AppProps) {
  const { t, i18n } = useTranslation();

  const switchLanguage = (lang: string) => {
    void i18n.changeLanguage(lang);
  };

  return (
    <Container>
      <header>
        <h1>{t("welcome")}</h1>
        <p>{t("description")}</p>
        <Button onClick={onToggleTheme} type="primary">
          Toggle Theme
        </Button>
        &nbsp;
        <Button onClick={() => switchLanguage("en")}>EN</Button>
        &nbsp;
        <Button onClick={() => switchLanguage("ko")}>KO</Button>
      </header>
      <section>
        <h2>Contact</h2>
        <div>
          <Button
            icon={<GithubOutlined />}
            href="https://github.com/"
            target="_blank"
          >
            Github
          </Button>
          &nbsp;
          <Button
            icon={<InstagramOutlined />}
            href="https://instagram.com/"
            target="_blank"
          >
            Instagram
          </Button>
          &nbsp;
          <Button icon={<MailOutlined />} href="mailto:example@domain.com">
            Email
          </Button>
        </div>
      </section>
      <section>
        <h2>Blog Posts</h2>
        <ul>
          <li>New Post</li>
          <li>New post Here</li>
          <li>Add i18next to React-Vite</li>
        </ul>
      </section>
    </Container>
  );
}

export default App;
