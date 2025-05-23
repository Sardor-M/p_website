import { Button } from '@/components/Common/Button';
import { useContactAnimation } from '@/hooks/useAnimations/useContactAnimation';
import { themeColor } from '@/themes/color';
import { DarkModeProps } from '@/types/blog';
import { MessageOutlined } from '@ant-design/icons';
import { MapIcon } from 'lucide-react';
import React, { useState } from 'react';
import styled from 'styled-components';

const ContactContainer = styled.section<{ isDarkMode: boolean }>`
  color: ${(props) => (props.isDarkMode ? themeColor.text.dark : themeColor.text.light)};
`;

const ContentWrapper = styled.div`
  max-width: 100%;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SectionHeading = styled.h2<{ isDarkMode: boolean }>`
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 20px;
  color: ${(props) => (props.isDarkMode ? themeColor.text.dark : themeColor.text.light)};
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s ease;
  display: flex;
  flex-direction: row;
  gap: 10px;
  width: 100%;
  align-self: left;

  &.visible {
    transform: translateY(0);
    opacity: 0.7;
  }

  ${themeColor.breakpoints.mobile} {
    display: flex;
    flex-direction: row;
    gap: 10px;
    width: 100%;
    font-size: 0.8rem;
    align-self: left;
    justify-self: left;
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
  display: flex;
  flex-direction: row;
  gap: 10px;
  width: 100%;
  align-self: left;

  &.visible {
    transform: translateY(0);
    opacity: 1;
  }

  ${themeColor.breakpoints.mobile} {
    font-size: 2.3rem;
    margin-bottom: 20px;
    display: flex;
    flex-direction: row;
    width: 100%;
    align-self: left;
    justify-self: left;
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
    gap: 10px;
  }
`;

const ContactInfo = styled.div<{ isDarkMode: boolean }>`
  transform: translateY(20px);
  opacity: 0;
  transition: all 0.6s ease;
  transition-delay: 0.3s;

  &.visible {
    transform: translateY(0);
    opacity: 1;
  }

  ${themeColor.breakpoints.mobile} {
    display: flex;
    border-radius: 8px;
    border: 0.8px solid
      ${(props) => (props.isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)')};
    background-color: ${(props) => (props.isDarkMode ? '#2A2A2A' : '#FFFFFF')};
    color: ${(props) => (props.isDarkMode ? '#FFFFFF' : themeColor.text.light)};
    padding: 20px;
    margin-bottom: 20px;
    flex-direction: column;
    gap: 20px;
    align-items: center;
    justify-content: flex-start;
    box-shadow: 0 4px 12px
    text-align: left;
    width: 100%;
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
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;

const ContactMethod = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 25px;
  width: 100%;
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

const ContactDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  flex: 1;
  text-align: left;
  margin-left: 10px;
`;

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
  padding: 24px 30px;
  border-radius: 8px;
  transform: translateY(20px);
  opacity: 0;
  transition:
    transform 0.6s ease,
    opacity 0.6s ease;
  border: 0.8px solid
    ${(props) => (props.isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)')};
  background-color: ${(props) => (props.isDarkMode ? '#2A2A2A' : '#FFFFFF')};

  &.visible {
    transform: translateY(0);
    opacity: 1;
  }

  @media (max-width: 768px) {
    padding: 15px 20px;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 25px;
  transform: translateY(20px);
  opacity: 0;
  transition:
    transform 0.6s ease,
    opacity 0.6s ease;

  &.visible {
    transform: translateY(0);
    opacity: 1;
  }
`;
const Label = styled.label<{ isDarkMode: boolean }>`
  display: block;
  margin-bottom: 8px;
  font-size: 0.9rem;
  color: ${(props) => (props.isDarkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.8)')};
`;

const Input = styled.input<{ isDarkMode: boolean }>`
  width: 100%;
  padding: 12px;
  font-size: 1rem;
  border-radius: 8px;
  border: 0.3px solid
    ${(props) => (props.isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)')};
  background-color: ${(props) => (props.isDarkMode ? '#252525' : '#FFFFFF')};
  color: ${(props) => (props.isDarkMode ? '#FFFFFF' : '#000000')};
  transition: border-color 0.3s ease;

  &::placeholder {
    color: ${(props) => (props.isDarkMode ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.5)')};
  }

  &:focus {
    outline: none;
    border-color: #9d76ff !important;
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
  border: 0.3px solid
    ${(props) => (props.isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)')};
  background-color: ${(props) => (props.isDarkMode ? '#252525' : '#FFFFFF')};
  color: ${(props) => (props.isDarkMode ? '#FFFFFF' : '#000000')};
  min-height: 150px;
  resize: vertical;
  transition: border-color 0.3s ease;

  &::placeholder {
    color: ${(props) => (props.isDarkMode ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.5)')};
  }

  &:focus {
    outline: none;
    border-color: #9d76ff !important;
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
  color: #ffffff;
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
  background-color: ${(props) =>
    props.isDarkMode ? 'rgba(0, 200, 83, 0.1)' : 'rgba(0, 200, 83, 0.1)'};
  color: ${(props) => (props.isDarkMode ? '#00C853' : '#00C853')};
  font-size: 0.9rem;
  margin-top: 20px;
  display: ${(props) => (props.visible ? 'block' : 'none')};
`;

export default function ContactMe({ isDarkMode }: DarkModeProps) {
  const {
    sectionHeadingRef,
    pageTitleRef,
    contactInfoRef,
    contactFormRef,
    nameGroupRef,
    emailGroupRef,
    messageGroupRef,
    submitButtonRef,
  } = useContactAnimation(isDarkMode);

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
      }, 3000);
    }, 1000);
  };

  return (
    <ContactContainer isDarkMode={isDarkMode}>
      <ContentWrapper>
        <SectionHeading
          ref={sectionHeadingRef}
          isDarkMode={isDarkMode}
          style={{ transitionDelay: '0ms' }}
        >
          GET IN TOUCH
        </SectionHeading>
        <PageTitle ref={pageTitleRef} isDarkMode={isDarkMode} style={{ transitionDelay: '100ms' }}>
          Let's Connect
        </PageTitle>

        <ContactGrid>
          <ContactInfo
            ref={contactInfoRef}
            style={{ transitionDelay: '200ms' }}
            isDarkMode={isDarkMode}
          >
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
            onSubmit={handleSubmit}
            isDarkMode={isDarkMode}
            style={{ transitionDelay: '300ms' }}
          >
            <FormGroup ref={nameGroupRef} style={{ transitionDelay: '400ms' }}>
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

            <FormGroup ref={emailGroupRef} style={{ transitionDelay: '500ms' }}>
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

            <FormGroup ref={messageGroupRef} style={{ transitionDelay: '600ms' }}>
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
            <div ref={submitButtonRef}>
              <SubmitButton type="submit" isDarkMode={isDarkMode} disabled={isSubmitting}>
                {isSubmitting ? 'Sending Message...' : 'Send Message'}
              </SubmitButton>
            </div>
            <SuccessMessage isDarkMode={isDarkMode} visible={isSubmitted}>
              Your message has been sent successfully. I'll get back to you soon!
            </SuccessMessage>
          </ContactForm>
        </ContactGrid>
      </ContentWrapper>
    </ContactContainer>
  );
}
