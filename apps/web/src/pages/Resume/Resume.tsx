import { themeColor } from '@/themes/color';
import { DarkModeProps } from '@/types/blog';
import styled from 'styled-components';

const ResumeContainer = styled.section<{ isDarkMode: boolean }>`
    background-color: ${(props) =>
        props.isDarkMode ? themeColor.background.dark : themeColor.background.light};
    color: ${(props) => (props.isDarkMode ? themeColor.text.dark : themeColor.text.light)};

    ${themeColor.breakpoints.mobile} {
        padding: 20px 15px 15px;
    }
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
    margin-bottom: 40px;
    color: ${(props) => (props.isDarkMode ? themeColor.text.dark : themeColor.text.light)};
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
    }
`;

const ResumeContent = styled.div`
    max-width: 100%;
    margin: 0 auto;
    transform: translateY(20px);
    opacity: 0;
    transition: all 0.6s ease;
    transition-delay: 0.3s;

    &.visible {
        transform: translateY(0);
        opacity: 1;
    }
`;

const ResumeActions = styled.div`
    display: flex;
    gap: 20px;
    margin-bottom: 40px;

    ${themeColor.breakpoints.mobile} {
        flex-direction: column;
        gap: 15px;
    }
`;

const DownloadButton = styled.a<{ isDarkMode: boolean }>`
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background-color: ${(props) =>
        props.isDarkMode ? themeColor.text.dark : themeColor.text.light};
    color: ${(props) =>
        props.isDarkMode ? themeColor.background.dark : themeColor.background.light};
    padding: 12px 24px;
    border-radius: 4px;
    text-decoration: none;
    font-weight: 500;
    transition: all 0.3s ease;

    &:hover {
        opacity: 0.9;
        transform: translateY(-2px);
    }

    svg {
        width: 18px;
        height: 18px;
    }
`;

const PrintButton = styled.button<{ isDarkMode: boolean }>`
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background-color: transparent;
    color: ${(props) => (props.isDarkMode ? themeColor.text.dark : themeColor.text.light)};
    padding: 12px 24px;
    border-radius: 4px;
    border: 1px solid
        ${(props) => (props.isDarkMode ? themeColor.border.dark : themeColor.border.light)};
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        background-color: ${(props) =>
            props.isDarkMode ? themeColor.hover.dark : themeColor.hover.light};
    }

    svg {
        width: 18px;
        height: 18px;
    }
`;

const ResumeSection = styled.div`
    margin-bottom: 40px;
`;

const ResumeSectionTitle = styled.h3<{ isDarkMode: boolean }>`
    font-size: 1.5rem;
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid
        ${(props) => (props.isDarkMode ? themeColor.border.dark : themeColor.border.light)};
    color: ${(props) => (props.isDarkMode ? themeColor.text.dark : themeColor.text.light)};
`;

const ExperienceItem = styled.div`
    margin-bottom: 30px;
`;

const ExperienceHeader = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;

    ${themeColor.breakpoints.mobile} {
        flex-direction: column;
        gap: 5px;
    }
`;

const ExperienceTitle = styled.h4<{ isDarkMode: boolean }>`
    font-size: 1.2rem;
    color: ${(props) => (props.isDarkMode ? themeColor.text.dark : themeColor.text.light)};
`;

const ExperienceCompany = styled.h5<{ isDarkMode: boolean }>`
    font-size: 1rem;
    font-weight: 600;
    color: ${(props) => (props.isDarkMode ? themeColor.text.dark : themeColor.text.light)};
`;

const ExperienceDate = styled.span<{ isDarkMode: boolean }>`
    font-size: 0.9rem;
    color: ${(props) =>
        props.isDarkMode ? `${themeColor.text.dark}99` : `${themeColor.text.light}99`};
`;

const ExperienceDescription = styled.p<{ isDarkMode: boolean }>`
    font-size: 1rem;
    line-height: 1.6;
    color: ${(props) => (props.isDarkMode ? themeColor.text.dark : themeColor.text.light)};
`;

const SkillsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;

    ${themeColor.breakpoints.tablet} {
        grid-template-columns: repeat(2, 1fr);
    }

    ${themeColor.breakpoints.mobile} {
        grid-template-columns: 1fr;
    }
`;

const SkillCategory = styled.div`
    margin-bottom: 20px;
`;

const SkillCategoryTitle = styled.h4<{ isDarkMode: boolean }>`
    font-size: 1.1rem;
    margin-bottom: 10px;
    color: ${(props) => (props.isDarkMode ? themeColor.text.dark : themeColor.text.light)};
`;

const SkillsList = styled.ul`
    list-style-type: none;
    padding: 0;
`;

const SkillItem = styled.li<{ isDarkMode: boolean }>`
    font-size: 0.95rem;
    margin-bottom: 5px;
    color: ${(props) => (props.isDarkMode ? themeColor.text.dark : themeColor.text.light)};
    display: flex;
    align-items: center;

    &:before {
        content: '•';
        margin-right: 8px;
        color: ${(props) => (props.isDarkMode ? themeColor.text.dark : themeColor.text.light)};
    }
`;

export default function Resume({ isDarkMode }: DarkModeProps) {
    const sectionHeadingRef = useElementAnimation<HTMLHeadingElement>();
    const pageTitleRef = useElementAnimation<HTMLHeadingElement>();
    const resumeContentRef = useElementAnimation<HTMLDivElement>();

    const handlePrint = () => {
        window.print();
    };

    return (
        <ResumeContainer isDarkMode={isDarkMode}>
            <SectionHeading ref={sectionHeadingRef} isDarkMode={isDarkMode}>
                MY RESUME
            </SectionHeading>
            <PageTitle ref={pageTitleRef} isDarkMode={isDarkMode}>
                Professional Experience
            </PageTitle>

            <ResumeContent ref={resumeContentRef} className="resume-content">
                <ResumeActions>
                    <DownloadButton
                        href="/resume.pdf"
                        download="RishiSrihari_Resume.pdf"
                        isDarkMode={isDarkMode}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                            <polyline points="7 10 12 15 17 10"></polyline>
                            <line x1="12" y1="15" x2="12" y2="3"></line>
                        </svg>
                        Download PDF
                    </DownloadButton>
                    <PrintButton onClick={handlePrint} isDarkMode={isDarkMode}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <polyline points="6 9 6 2 18 2 18 9"></polyline>
                            <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                            <rect x="6" y="14" width="12" height="8"></rect>
                        </svg>
                        Print Resume
                    </PrintButton>
                </ResumeActions>

                <ResumeSection>
                    <ResumeSectionTitle isDarkMode={isDarkMode}>Experience</ResumeSectionTitle>

                    <ExperienceItem>
                        <ExperienceHeader>
                            <div>
                                <ExperienceTitle isDarkMode={isDarkMode}>
                                    Teaching Assistant
                                </ExperienceTitle>
                                <ExperienceCompany isDarkMode={isDarkMode}>
                                    UC Irvine, Donald Bren School of ICS
                                </ExperienceCompany>
                            </div>
                            <ExperienceDate isDarkMode={isDarkMode}>
                                Mar 2024 - Present
                            </ExperienceDate>
                        </ExperienceHeader>
                        <ExperienceDescription isDarkMode={isDarkMode}>
                            Teaching Assistant for Boolean Logic and Discrete Structures, delivering
                            curriculum content to 400+ students. Collaborate on lecture and test
                            content preparation with course staff, and host weekly office hours.
                            Increased office hour attendance by 40% through interactive teaching
                            methods and accessible explanations.
                        </ExperienceDescription>
                    </ExperienceItem>

                    <ExperienceItem>
                        <ExperienceHeader>
                            <div>
                                <ExperienceTitle isDarkMode={isDarkMode}>
                                    Software Engineer
                                </ExperienceTitle>
                                <ExperienceCompany isDarkMode={isDarkMode}>
                                    TechInnovate Inc.
                                </ExperienceCompany>
                            </div>
                            <ExperienceDate isDarkMode={isDarkMode}>
                                Jun 2022 - Feb 2024
                            </ExperienceDate>
                        </ExperienceHeader>
                        <ExperienceDescription isDarkMode={isDarkMode}>
                            Developed modern web applications using React, TypeScript, and Next.js.
                            Implemented responsive designs with styled-components and Tailwind CSS.
                            Collaborated with cross-functional teams to deliver high-quality
                            software solutions. Optimized application performance resulting in 40%
                            faster page load times.
                        </ExperienceDescription>
                    </ExperienceItem>

                    <ExperienceItem>
                        <ExperienceHeader>
                            <div>
                                <ExperienceTitle isDarkMode={isDarkMode}>
                                    Frontend Developer Intern
                                </ExperienceTitle>
                                <ExperienceCompany isDarkMode={isDarkMode}>
                                    WebSolutions Co.
                                </ExperienceCompany>
                            </div>
                            <ExperienceDate isDarkMode={isDarkMode}>
                                Jan 2022 - May 2022
                            </ExperienceDate>
                        </ExperienceHeader>
                        <ExperienceDescription isDarkMode={isDarkMode}>
                            Assisted in developing user interfaces for client projects. Implemented
                            responsive designs and interactive components. Participated in code
                            reviews and agile development processes. Contributed to the company's
                            component library.
                        </ExperienceDescription>
                    </ExperienceItem>
                </ResumeSection>

                <ResumeSection>
                    <ResumeSectionTitle isDarkMode={isDarkMode}>Education</ResumeSectionTitle>

                    <ExperienceItem>
                        <ExperienceHeader>
                            <div>
                                <ExperienceTitle isDarkMode={isDarkMode}>
                                    M.S. in Computer Science
                                </ExperienceTitle>
                                <ExperienceCompany isDarkMode={isDarkMode}>
                                    University of California, Irvine
                                </ExperienceCompany>
                            </div>
                            <ExperienceDate isDarkMode={isDarkMode}>2023 - 2025</ExperienceDate>
                        </ExperienceHeader>
                        <ExperienceDescription isDarkMode={isDarkMode}>
                            Focus on Artificial Intelligence and Machine Learning. Relevant
                            coursework: Advanced Algorithms, Machine Learning, Natural Language
                            Processing, Computer Vision, and Distributed Systems.
                        </ExperienceDescription>
                    </ExperienceItem>

                    <ExperienceItem>
                        <ExperienceHeader>
                            <div>
                                <ExperienceTitle isDarkMode={isDarkMode}>
                                    B.S. in Computer Science
                                </ExperienceTitle>
                                <ExperienceCompany isDarkMode={isDarkMode}>
                                    University of California, Los Angeles
                                </ExperienceCompany>
                            </div>
                            <ExperienceDate isDarkMode={isDarkMode}>2018 - 2022</ExperienceDate>
                        </ExperienceHeader>
                        <ExperienceDescription isDarkMode={isDarkMode}>
                            Graduated with Honors, GPA: 3.8/4.0 Relevant coursework: Data
                            Structures, Algorithms, Operating Systems, Database Systems, and
                            Software Engineering.
                        </ExperienceDescription>
                    </ExperienceItem>
                </ResumeSection>

                <ResumeSection>
                    <ResumeSectionTitle isDarkMode={isDarkMode}>Skills</ResumeSectionTitle>

                    <SkillsGrid>
                        <SkillCategory>
                            <SkillCategoryTitle isDarkMode={isDarkMode}>
                                Programming Languages
                            </SkillCategoryTitle>
                            <SkillsList>
                                <SkillItem isDarkMode={isDarkMode}>
                                    JavaScript / TypeScript
                                </SkillItem>
                                <SkillItem isDarkMode={isDarkMode}>Python</SkillItem>
                                <SkillItem isDarkMode={isDarkMode}>Java</SkillItem>
                                <SkillItem isDarkMode={isDarkMode}>C++</SkillItem>
                                <SkillItem isDarkMode={isDarkMode}>SQL</SkillItem>
                            </SkillsList>
                        </SkillCategory>

                        <SkillCategory>
                            <SkillCategoryTitle isDarkMode={isDarkMode}>
                                Frontend
                            </SkillCategoryTitle>
                            <SkillsList>
                                <SkillItem isDarkMode={isDarkMode}>React</SkillItem>
                                <SkillItem isDarkMode={isDarkMode}>Next.js</SkillItem>
                                <SkillItem isDarkMode={isDarkMode}>HTML5 / CSS3</SkillItem>
                                <SkillItem isDarkMode={isDarkMode}>Tailwind CSS</SkillItem>
                                <SkillItem isDarkMode={isDarkMode}>Styled Components</SkillItem>
                            </SkillsList>
                        </SkillCategory>

                        <SkillCategory>
                            <SkillCategoryTitle isDarkMode={isDarkMode}>Backend</SkillCategoryTitle>
                            <SkillsList>
                                <SkillItem isDarkMode={isDarkMode}>Node.js</SkillItem>
                                <SkillItem isDarkMode={isDarkMode}>Express</SkillItem>
                                <SkillItem isDarkMode={isDarkMode}>Django</SkillItem>
                                <SkillItem isDarkMode={isDarkMode}>RESTful APIs</SkillItem>
                                <SkillItem isDarkMode={isDarkMode}>GraphQL</SkillItem>
                            </SkillsList>
                        </SkillCategory>

                        <SkillCategory>
                            <SkillCategoryTitle isDarkMode={isDarkMode}>
                                Database
                            </SkillCategoryTitle>
                            <SkillsList>
                                <SkillItem isDarkMode={isDarkMode}>MongoDB</SkillItem>
                                <SkillItem isDarkMode={isDarkMode}>PostgreSQL</SkillItem>
                                <SkillItem isDarkMode={isDarkMode}>MySQL</SkillItem>
                                <SkillItem isDarkMode={isDarkMode}>Firebase</SkillItem>
                                <SkillItem isDarkMode={isDarkMode}>Redis</SkillItem>
                            </SkillsList>
                        </SkillCategory>

                        <SkillCategory>
                            <SkillCategoryTitle isDarkMode={isDarkMode}>
                                DevOps & Tools
                            </SkillCategoryTitle>
                            <SkillsList>
                                <SkillItem isDarkMode={isDarkMode}>Git / GitHub</SkillItem>
                                <SkillItem isDarkMode={isDarkMode}>Docker</SkillItem>
                                <SkillItem isDarkMode={isDarkMode}>CI/CD</SkillItem>
                                <SkillItem isDarkMode={isDarkMode}>AWS</SkillItem>
                                <SkillItem isDarkMode={isDarkMode}>Vercel / Netlify</SkillItem>
                            </SkillsList>
                        </SkillCategory>

                        <SkillCategory>
                            <SkillCategoryTitle isDarkMode={isDarkMode}>Other</SkillCategoryTitle>
                            <SkillsList>
                                <SkillItem isDarkMode={isDarkMode}>Agile Development</SkillItem>
                                <SkillItem isDarkMode={isDarkMode}>UI/UX Design</SkillItem>
                                <SkillItem isDarkMode={isDarkMode}>Problem Solving</SkillItem>
                                <SkillItem isDarkMode={isDarkMode}>Team Collaboration</SkillItem>
                                <SkillItem isDarkMode={isDarkMode}>Technical Writing</SkillItem>
                            </SkillsList>
                        </SkillCategory>
                    </SkillsGrid>
                </ResumeSection>
            </ResumeContent>
        </ResumeContainer>
    );
}
