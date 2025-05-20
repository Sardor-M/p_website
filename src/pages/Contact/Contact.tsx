import { Button } from '@/components/Common/Button';
import { themeColor } from '@/themes/color';
import { DarkModeProps } from '@/types/blog';
import { useElementAnimation } from '@/utils/useAnimation';
import { MessageOutlined } from '@ant-design/icons';
import { MapIcon } from 'lucide-react';
import React, { useState } from 'react';

import styled from 'styled-components';

const ContactContainer = styled.section<{ isDarkMode: boolean }>`
  background-color: ${(props) => (props.isDarkMode ? '#1A1A1A' : themeColor.background.light)};
  color: ${(props) => (props.isDarkMode ? themeColor.text.dark : themeColor.text.light)};

  ${themeColor.breakpoints.mobile} {
    padding: 30px 2px 2px;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionHeading = styled.h2<{ isDarkMode: boolean }>`
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 20px;
  color: ${(props) => (props.isDarkMode ? themeColor.text.dark : themeColor.text.light)};
  opacity: 0.7;
  transform: translateY(20px);
  opacity: 0;
  transition: all 0.6s ease;

  &.visible {
    transform: translateY(0);
    opacity: 0.7;
  }
`;

const PageTitle = styled.h1<{ isDarkMode: boolean }>`
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 20px;
  color: ${(props) => (props.isDarkMode ? '#FFFFFF' : themeColor.text.light)};
  transform: translateY(20px);
  opacity: 0;
  transition: all 0.6s ease;
  transition-delay: 0.2s;

  &.visible {
    transform: translateY(0);
    opacity: 1;
  }

  ${themeColor.breakpoints.mobile} {
    font-size: 2.5rem;
    margin-bottom: 30px;
  }
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;

  ${themeColor.breakpoints.tablet} {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  ${themeColor.breakpoints.mobile} {
    grid-template-columns: 1fr;
    gap: 30px;
  }
`;

const ContactInfo = styled.div`
  transform: translateY(20px);
  opacity: 0;
  transition: all 0.6s ease;
  transition-delay: 0.3s;

  &.visible {
    transform: translateY(0);
    opacity: 1;
  }
`;

const ContactText = styled.p<{ isDarkMode: boolean }>`
  font-size: 1.2rem;
  line-height: 1.8;
  margin-bottom: 30px;
  color: ${(props) => (props.isDarkMode ? 'rgba(255, 255, 255, 0.8)' : themeColor.text.light)};

  ${themeColor.breakpoints.mobile} {
    font-size: 1rem;
    line-height: 1.6;
  }
`;

const ContactMethods = styled.div`
  margin-top: 40px;
`;

const ContactMethod = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 25px;
`;

const ContactIcon = styled.div<{ isDarkMode: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  color: ${(props) => (props.isDarkMode ? '#FFFFFF' : themeColor.text.light)};

  svg {
    width: 24px;
    height: 24px;
  }
`;

const ContactDetails = styled.div``;

const ContactLabel = styled.div<{ isDarkMode: boolean }>`
  font-size: 0.9rem;
  color: ${(props) => (props.isDarkMode ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)')};
  margin-bottom: 4px;
`;

const ContactValue = styled.div<{ isDarkMode: boolean }>`
  font-size: 1rem;
  color: ${(props) => (props.isDarkMode ? '#FFFFFF' : themeColor.text.light)};
`;

const ContactForm = styled.form<{ isDarkMode: boolean }>`
  transform: translateY(20px);
  opacity: 0;
  transition: all 0.6s ease;
  transition-delay: 0.4s;

  &.visible {
    transform: translateY(0);
    opacity: 1;
  }

  padding: 24px 30px;
  background-color: ${(props) => (props.isDarkMode ? '#2A2A2A' : '#F9F9F9')};
  border: 1px solid
    ${(props) => (props.isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)')};
  border-radius: 8px;
`;

const FormGroup = styled.div`
  margin-bottom: 25px;
`;

const Label = styled.label<{ isDarkMode: boolean }>`
  display: block;
  margin-bottom: 8px;
  font-size: 0.9rem;
  color: ${(props) => (props.isDarkMode ? 'rgba(255, 255, 255, 0.7)' : themeColor.text.light)};
`;

const Input = styled.input<{ isDarkMode: boolean }>`
  width: 100%;
  padding: 12px;
  font-size: 1rem;
  border-radius: 8px;
  border: 1px solid
    ${(props) => (props.isDarkMode ? 'rgba(255, 255, 255, 0.1)' : themeColor.border.light)};
  background-color: ${(props) => (props.isDarkMode ? '#252525' : '#FFFFFF')};
  color: ${(props) => (props.isDarkMode ? '#FFFFFF' : themeColor.text.light)};
  transition: all 0.3s ease;

  &::placeholder {
    color: ${(props) => (props.isDarkMode ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.3)')};
  }

  &:focus {
    outline: none;
    border-color: ${(props) => (props.isDarkMode ? '#9D76FF' : themeColor.background.light)};
  }

  ${themeColor.breakpoints.mobile} {
    padding: 14px;
  }
`;

const TextArea = styled.textarea<{ isDarkMode: boolean }>`
  width: 100%;
  padding: 16px;
  font-size: 1rem;
  border-radius: 8px;
  border: 1px solid
    ${(props) => (props.isDarkMode ? 'rgba(255, 255, 255, 0.1)' : themeColor.border.light)};
  background-color: ${(props) => (props.isDarkMode ? '#252525' : '#FFFFFF')};
  color: ${(props) => (props.isDarkMode ? '#FFFFFF' : themeColor.text.light)};
  min-height: 150px;
  resize: vertical;
  transition: all 0.3s ease;

  &::placeholder {
    color: ${(props) => (props.isDarkMode ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.3)')};
  }

  &:focus {
    outline: none;
    border-color: ${(props) => (props.isDarkMode ? '#9D76FF' : themeColor.background.light)};
  }

  ${themeColor.breakpoints.mobile} {
    padding: 14px;
    min-height: 120px;
  }
`;

const SubmitButton = styled(Button).attrs(() => ({
  variant: 'default',
  size: 'lg',
  fullWidth: true,
}))<{ isDarkMode: boolean }>`
  border-color: ${(props) => (props.isDarkMode ? '#9D76FF' : props.theme.border)};
  color: ${(props) => (props.isDarkMode ? '#9D76FF' : props.theme.text)};
  padding: 10px;
  background-color: #9d76ff;
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    background-color: #7b5ee8;
    color: #ffffff;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(157, 118, 255, 0.25);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
    box-shadow: none;
  }
  ${themeColor.breakpoints.mobile} {
    padding: 14px;
  }
`;

const SuccessMessage = styled.div<{ isDarkMode: boolean; visible: boolean }>`
  padding: 15px;
  border-radius: 4px;
  background-color: rgb(235, 248, 241);
  color: #00c853;
  margin-top: 20px;
  display: ${(props) => (props.visible ? 'block' : 'none')};
`;

export default function ContactMe({ isDarkMode }: DarkModeProps) {
  const sectionHeadingRef = useElementAnimation<HTMLHeadingElement>();
  const pageTitleRef = useElementAnimation<HTMLHeadingElement>();
  const contactInfoRef = useElementAnimation<HTMLDivElement>();
  const contactFormRef = useElementAnimation<HTMLFormElement>();

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    /* form submission logic will be changed to
     * actual API call as of now i am just
     * simulating a delay
     */
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);

      setFormState({
        name: '',
        email: '',
        message: '',
      });

      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
  };

  return (
    <ContactContainer isDarkMode={isDarkMode}>
      <ContentWrapper>
        <SectionHeading ref={sectionHeadingRef} isDarkMode={isDarkMode}>
          GET IN TOUCH
        </SectionHeading>
        <PageTitle ref={pageTitleRef} isDarkMode={isDarkMode}>
          Let's Connect
        </PageTitle>

        <ContactGrid>
          <ContactInfo ref={contactInfoRef} className={contactInfoRef.current?.className}>
            <ContactText isDarkMode={isDarkMode}>
              I'm always interested in hearing about new projects and opportunities. Whether you
              have a question or just want to say hi, I'll try my best to get back to you!
            </ContactText>

            <ContactMethods>
              <ContactMethod>
                <ContactIcon isDarkMode={isDarkMode}>
                  <MessageOutlined size={24} style={{ color: '#9d76ff' }} />
                </ContactIcon>
                <ContactDetails>
                  <ContactLabel isDarkMode={isDarkMode}>Email</ContactLabel>
                  <ContactValue isDarkMode={isDarkMode}>sardor0968@gmail.com</ContactValue>
                </ContactDetails>
              </ContactMethod>

              <ContactMethod>
                <ContactIcon isDarkMode={isDarkMode}>
                  <MapIcon size={24} style={{ color: '#9d76ff' }} />
                </ContactIcon>
                <ContactDetails>
                  <ContactLabel isDarkMode={isDarkMode}>Location</ContactLabel>
                  <ContactValue isDarkMode={isDarkMode}>Seoul, South Korea</ContactValue>
                </ContactDetails>
              </ContactMethod>
            </ContactMethods>
          </ContactInfo>

          <ContactForm
            ref={contactFormRef}
            className={contactFormRef.current?.className}
            onSubmit={handleSubmit}
            isDarkMode={isDarkMode}
          >
            <FormGroup>
              <Label htmlFor="name" isDarkMode={isDarkMode}>
                Name
              </Label>
              <Input
                type="text"
                id="name"
                name="name"
                placeholder="Your name"
                value={formState.name}
                onChange={handleChange}
                required
                isDarkMode={isDarkMode}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="email" isDarkMode={isDarkMode}>
                Email
              </Label>
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="your.email@example.com"
                value={formState.email}
                onChange={handleChange}
                required
                isDarkMode={isDarkMode}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="message" isDarkMode={isDarkMode}>
                Message
              </Label>
              <TextArea
                id="message"
                name="message"
                placeholder="Your message"
                value={formState.message}
                onChange={handleChange}
                required
                isDarkMode={isDarkMode}
              />
            </FormGroup>

            <SubmitButton type="submit" isDarkMode={isDarkMode} disabled={isSubmitting}>
              {isSubmitting ? 'Sending Message...' : 'Send Message'}
            </SubmitButton>

            <SuccessMessage isDarkMode={isDarkMode} visible={isSubmitted}>
              Your message has been sent successfully. I'll get back to you soon!
            </SuccessMessage>
          </ContactForm>
        </ContactGrid>
      </ContentWrapper>
    </ContactContainer>
  );
}
