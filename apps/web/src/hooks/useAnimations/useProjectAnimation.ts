import { useBaseAnimation } from './useBaseAnimation';

export const useProjectCardAnimation = (isDarkMode: boolean, projectCount: number) => {
  const sectionHeadingRef = useBaseAnimation<HTMLHeadingElement>([isDarkMode]);
  const pageTitleRef = useBaseAnimation<HTMLHeadingElement>([isDarkMode]);

  const projectRefs = Array.from({ length: projectCount }, () => ({
    cardRef: useBaseAnimation<HTMLDivElement>([isDarkMode]),
    categoryRef: useBaseAnimation<HTMLHeadingElement>([isDarkMode]),
    titleRef: useBaseAnimation<HTMLHeadingElement>([isDarkMode]),
    descriptionRef: useBaseAnimation<HTMLParagraphElement>([isDarkMode]),
    statsRef: useBaseAnimation<HTMLDivElement>([isDarkMode]),
    techStackRef: useBaseAnimation<HTMLDivElement>([isDarkMode]),
    linksRef: useBaseAnimation<HTMLDivElement>([isDarkMode]),
  }));

  return {
    sectionHeadingRef,
    pageTitleRef,
    projectRefs,
  };
};
