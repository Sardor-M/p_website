import { useBaseAnimation } from './useBaseAnimation';

export const useAboutAnimation = (isDarkMode: boolean) => {
  const sectionHeadingRef = useBaseAnimation<HTMLHeadingElement>([isDarkMode]);
  const pageTitleRef = useBaseAnimation<HTMLHeadingElement>([isDarkMode]);
  const aboutTextRef = useBaseAnimation<HTMLDivElement>([isDarkMode]);
  const skillsRef = useBaseAnimation<HTMLDivElement>([isDarkMode]);
  const experienceRef = useBaseAnimation<HTMLDivElement>([isDarkMode]);
  const statisticsRef = useBaseAnimation<HTMLDivElement>([isDarkMode]);

  return {
    sectionHeadingRef,
    pageTitleRef,
    aboutTextRef,
    skillsRef,
    experienceRef,
    statisticsRef,
  };
};
