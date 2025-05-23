import { useBaseAnimation } from './useBaseAnimation';

export const useContactAnimation = (isDarkMode: boolean) => {
  const sectionHeadingRef = useBaseAnimation<HTMLHeadingElement>([isDarkMode]);
  const pageTitleRef = useBaseAnimation<HTMLHeadingElement>([isDarkMode]);
  const contactInfoRef = useBaseAnimation<HTMLDivElement>([isDarkMode]);
  const contactFormRef = useBaseAnimation<HTMLFormElement>([isDarkMode]);
  const nameGroupRef = useBaseAnimation<HTMLDivElement>([isDarkMode]);
  const emailGroupRef = useBaseAnimation<HTMLDivElement>([isDarkMode]);
  const messageGroupRef = useBaseAnimation<HTMLDivElement>([isDarkMode]);
  const submitButtonRef = useBaseAnimation<HTMLDivElement>([isDarkMode]);

  return {
    sectionHeadingRef,
    pageTitleRef,
    contactInfoRef,
    contactFormRef,
    nameGroupRef,
    emailGroupRef,
    messageGroupRef,
    submitButtonRef,
  };
};
