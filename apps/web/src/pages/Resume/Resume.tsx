import { themeColor } from '@/themes/color';
import { DarkModeProps } from '@/types/blog';
import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import html2pdf from 'html2pdf.js';
import { DownloadIcon } from 'lucide-react';

type PDFOptions = {
    margin: number[];
    filename: string;
    image: { type: string; quality: number };
    html2canvas: {
        scale: number;
        useCORS: boolean;
        letterRendering: boolean;
        logging: boolean;
    };
    jsPDF: {
        unit: string;
        format: string;
        orientation: string;
    };
    pagebreak: { mode: string[] };
};

const PDF_STYLES = {
    FONT_SCALE: 0.75,
    MARGINS: {
        SMALL: '2px',
        MEDIUM: '4px',
        LARGE: '8px',
        XLARGE: '10px',
    },
    FONT_SIZES: {
        TITLE: '20px',
        SECTION_HEADING: '10px',
        SECTION_TITLE: '14px',
        EXPERIENCE_TITLE: '12px',
        COMPANY: '11px',
        DATE: '10px',
        DESCRIPTION: '10px',
        SKILL_ITEM: '9px',
        SKILL_CATEGORY: '11px',
    },
    LINE_HEIGHT: {
        COMPACT: '1.3',
    },
} as const;

const ResumeContainer = styled.section<{ isDarkMode: boolean }>`
    background-color: ${(props) =>
        props.isDarkMode ? themeColor.background.dark : themeColor.background.light};
    color: ${(props) => (props.isDarkMode ? themeColor.text.dark : themeColor.text.light)};
    padding: 0;

    ${themeColor.breakpoints.mobile} {
        padding: 0;
    }
`;

const SectionHeading = styled.h2<{ isDarkMode: boolean }>`
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 2px;
    margin-bottom: 15px;
    color: ${(props) => (props.isDarkMode ? themeColor.text.dark : themeColor.text.light)};
    opacity: 0.7;
    transform: translateY(20px);
    transition: all 0.6s ease;

    &.visible {
        transform: translateY(0);
        opacity: 0.7;
    }

    ${themeColor.breakpoints.mobile} {
        font-size: 0.75rem;
        letter-spacing: 1.5px;
        margin-bottom: 10px;
    }
`;

const PageTitle = styled.h1<{ isDarkMode: boolean }>`
    font-size: 2rem;
    font-weight: 700;
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
        font-size: 1.5rem;
        margin-bottom: 20px;
        line-height: 1.2;
    }
`;

const ResumeActions = styled.div`
    display: flex;
    justify-content: flex-end;

    ${themeColor.breakpoints.mobile} {
        justify-content: center;
        margin-bottom: 20px;
    }
`;

const DownloadButton = styled.button<{ isDarkMode: boolean }>`
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background-color: ${(props) =>
        props.isDarkMode ? themeColor.text.dark : themeColor.text.light};
    color: ${(props) =>
        props.isDarkMode ? themeColor.background.dark : themeColor.background.light};
    padding: 6px 14px;
    border-radius: 6px;
    border: none;
    font-size: 0.9rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        opacity: 0.85;
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    }

    svg {
        width: 16px;
        height: 16px;
    }

    ${themeColor.breakpoints.mobile} {
        padding: 4px 10px;
        font-size: 0.85rem;
        width: auto;
        gap: 6px;
        margin-left: auto;
    }
`;

const ResumeSection = styled.div`
    margin-bottom: 35px;

    ${themeColor.breakpoints.mobile} {
        margin-bottom: 22px;
    }
`;

const ResumeSectionTitle = styled.h3<{ isDarkMode: boolean }>`
    font-size: 1.4rem;
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 2px solid
        ${(props) => (props.isDarkMode ? themeColor.border.dark : themeColor.border.light)};
    color: ${(props) => (props.isDarkMode ? themeColor.text.dark : themeColor.text.light)};
    font-weight: 600;

    ${themeColor.breakpoints.mobile} {
        font-size: 1.1rem;
        margin-bottom: 15px;
        padding-bottom: 8px;
        border-bottom-width: 1px;
    }
`;

const ExperienceItem = styled.div`
    margin-bottom: 28px;
    padding-left: 1px;

    ${themeColor.breakpoints.mobile} {
        margin-bottom: 20px;
        padding-left: 0;
    }
`;

const ExperienceHeader = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    align-items: baseline;

    ${themeColor.breakpoints.mobile} {
        flex-direction: column;
        gap: 5px;
        margin-bottom: 8px;
    }
`;

const ExperienceTitle = styled.h4<{ isDarkMode: boolean }>`
    font-size: 1.1rem;
    font-weight: 600;
    margin: 0 0 4px 0;
    color: ${(props) => (props.isDarkMode ? themeColor.text.dark : themeColor.text.light)};

    ${themeColor.breakpoints.mobile} {
        font-size: 0.95rem;
        margin-bottom: 3px;
    }
`;

const ExperienceCompany = styled.h5<{ isDarkMode: boolean }>`
    font-size: 0.95rem;
    font-weight: 500;
    margin: 3px 0;
    color: ${(props) => (props.isDarkMode ? '#9ca3af' : '#6b7280')};

    ${themeColor.breakpoints.mobile} {
        font-size: 0.85rem;
        margin: 2px 0;
    }
`;

const ExperienceDate = styled.span<{ isDarkMode: boolean }>`
    font-size: 0.9rem;
    color: ${(props) =>
        props.isDarkMode ? `${themeColor.text.dark}99` : `${themeColor.text.light}99`};
    font-style: normal;

    ${themeColor.breakpoints.mobile} {
        font-size: 0.8rem;
        margin-top: 2px;
        display: block;
    }
`;

const ExperienceDescription = styled.p<{ isDarkMode: boolean }>`
    font-size: 0.95rem;
    line-height: 1.6;
    margin: 8px 0;
    color: ${(props) => (props.isDarkMode ? themeColor.text.dark : themeColor.text.light)};
    opacity: 0.9;

    ${themeColor.breakpoints.mobile} {
        font-size: 0.85rem;
        line-height: 1.5;
        margin: 6px 0;
        text-align: justify;
    }
`;

const SkillsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 25px;
    padding: 10px 0;

    ${themeColor.breakpoints.tablet} {
        grid-template-columns: repeat(2, 1fr);
        gap: 20px;
    }

    ${themeColor.breakpoints.mobile} {
        grid-template-columns: 1fr;
        gap: 15px;
        padding: 5px 0;
    }
`;

const SkillCategory = styled.div<{ isDarkMode: boolean }>`
    margin-bottom: 0;

    ${themeColor.breakpoints.mobile} {
        background: ${(props) =>
            props.isDarkMode ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)'};
        padding: 10px;
        border-radius: 8px;
    }
`;

const SkillCategoryTitle = styled.h4<{ isDarkMode: boolean }>`
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 10px;
    color: ${(props) => (props.isDarkMode ? themeColor.text.dark : themeColor.text.light)};

    ${themeColor.breakpoints.mobile} {
        font-size: 0.9rem;
        margin-bottom: 8px;
        padding-bottom: 5px;
        border-bottom: 1px solid
            ${(props) => (props.isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)')};
    }
`;

const SkillsList = styled.ul`
    list-style-type: none;
    padding: 0;
    margin: 0;

    ${themeColor.breakpoints.mobile} {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 5px;
    }
`;

const SkillItem = styled.li<{ isDarkMode: boolean }>`
    font-size: 0.9rem;
    margin-bottom: 6px;
    color: ${(props) => (props.isDarkMode ? themeColor.text.dark : themeColor.text.light)};
    display: flex;
    align-items: center;
    opacity: 0.85;

    &:before {
        content: '▸';
        margin-right: 8px;
        color: ${(props) => (props.isDarkMode ? '#9ca3af' : '#6b7280')};
        font-size: 0.8rem;
    }

    ${themeColor.breakpoints.mobile} {
        font-size: 0.8rem;
        margin-bottom: 4px;

        &:before {
            margin-right: 5px;
            font-size: 0.7rem;
        }
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

    ${themeColor.breakpoints.mobile} {
        padding: 0;
    }
`;

export default function Resume({ isDarkMode }: DarkModeProps) {
    const resumeRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            const elements = document.querySelectorAll(
                '.resume-heading, .resume-title, .resume-content'
            );
            elements.forEach((el) => el.classList.add('visible'));
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    const getPDFOptions = (): PDFOptions => ({
        margin: [5, 10, 5, 10],
        filename: 'sardor_resume.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
            scale: 2,
            useCORS: true,
            letterRendering: true,
            logging: false,
        },
        jsPDF: {
            unit: 'mm',
            format: 'a4',
            orientation: 'portrait',
        },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
    });

    const prepareElementForPDF = (element: HTMLElement): HTMLElement => {
        const clonedElement = element.cloneNode(true) as HTMLElement;

        const actionsDiv = clonedElement.querySelector('.resume-actions');
        actionsDiv?.remove();

        clonedElement.style.padding = '0';
        clonedElement.style.backgroundColor = isDarkMode ? '#1a1a1a' : '#ffffff';

        return clonedElement;
    };

    const applyGlobalFontScaling = (element: HTMLElement): void => {
        const allElements = element.querySelectorAll('*');
        allElements.forEach((el: Element) => {
            const htmlEl = el as HTMLElement;
            const computedStyle = window.getComputedStyle(htmlEl);
            const fontSize = parseFloat(computedStyle.fontSize);

            if (fontSize) {
                htmlEl.style.fontSize = `${fontSize * PDF_STYLES.FONT_SCALE}px`;
            }

            if (htmlEl.style.marginBottom) {
                htmlEl.style.marginBottom = PDF_STYLES.MARGINS.MEDIUM;
            }
            if (htmlEl.style.marginTop) {
                htmlEl.style.marginTop = PDF_STYLES.MARGINS.SMALL;
            }
            if (htmlEl.style.paddingBottom) {
                htmlEl.style.paddingBottom = PDF_STYLES.MARGINS.SMALL;
            }
        });
    };

    const applyHeaderStyles = (element: HTMLElement): void => {
        const title = element.querySelector('h1') as HTMLHeadingElement | null;
        if (title) {
            title.style.fontSize = PDF_STYLES.FONT_SIZES.TITLE;
            title.style.marginBottom = PDF_STYLES.MARGINS.XLARGE;
        }

        const sectionHeading = element.querySelector('h2') as HTMLHeadingElement | null;
        if (sectionHeading) {
            sectionHeading.style.fontSize = PDF_STYLES.FONT_SIZES.SECTION_HEADING;
            sectionHeading.style.marginBottom = PDF_STYLES.MARGINS.LARGE;
        }

        element.querySelectorAll('h3').forEach((title: Element) => {
            const h3Element = title as HTMLHeadingElement;
            h3Element.style.fontSize = PDF_STYLES.FONT_SIZES.SECTION_TITLE;
            h3Element.style.marginBottom = PDF_STYLES.MARGINS.LARGE;
            h3Element.style.paddingBottom = PDF_STYLES.MARGINS.MEDIUM;
        });

        element.querySelectorAll('h4').forEach((title: Element) => {
            const h4Element = title as HTMLHeadingElement;
            h4Element.style.fontSize = PDF_STYLES.FONT_SIZES.EXPERIENCE_TITLE;
            h4Element.style.marginBottom = PDF_STYLES.MARGINS.SMALL;
        });

        element.querySelectorAll('h5').forEach((company: Element) => {
            const h5Element = company as HTMLHeadingElement;
            h5Element.style.fontSize = PDF_STYLES.FONT_SIZES.COMPANY;
            h5Element.style.margin = '0';
        });
    };

    const applyContentStyles = (element: HTMLElement): void => {
        element.querySelectorAll('span').forEach((date: Element) => {
            const spanElement = date as HTMLSpanElement;
            spanElement.style.fontSize = PDF_STYLES.FONT_SIZES.DATE;
        });

        element.querySelectorAll('p').forEach((desc: Element) => {
            const pElement = desc as HTMLParagraphElement;
            pElement.style.fontSize = PDF_STYLES.FONT_SIZES.DESCRIPTION;
            pElement.style.lineHeight = PDF_STYLES.LINE_HEIGHT.COMPACT;
            pElement.style.margin = `${PDF_STYLES.MARGINS.MEDIUM} 0`;
        });

        element.querySelectorAll('li').forEach((item: Element) => {
            const liElement = item as HTMLLIElement;
            liElement.style.fontSize = PDF_STYLES.FONT_SIZES.SKILL_ITEM;
            liElement.style.marginBottom = PDF_STYLES.MARGINS.SMALL;
        });
    };

    const applySkillSectionStyles = (element: HTMLElement): void => {
        element.querySelectorAll('h4').forEach((cat: Element) => {
            const h4Element = cat as HTMLHeadingElement;
            const parentEl = h4Element.parentElement?.parentElement as HTMLElement | null;
            if (parentEl?.className?.includes('skill')) {
                h4Element.style.fontSize = PDF_STYLES.FONT_SIZES.SKILL_CATEGORY;
                h4Element.style.marginBottom = PDF_STYLES.MARGINS.MEDIUM;
            }
        });

        const skillsGrid = element.querySelector('[style*="grid"]') as HTMLElement | null;
        if (skillsGrid) {
            skillsGrid.style.gap = PDF_STYLES.MARGINS.XLARGE;
        }
    };

    const compactSectionMargins = (element: HTMLElement): void => {
        element.querySelectorAll('div').forEach((section: Element) => {
            const divElement = section as HTMLDivElement;
            if (divElement.style.marginBottom && parseInt(divElement.style.marginBottom) > 10) {
                divElement.style.marginBottom = PDF_STYLES.MARGINS.XLARGE;
            }
        });
    };

    const handleDownloadPDF = (): void => {
        const element = resumeRef.current;
        if (!element) return;

        try {
            const options = getPDFOptions();
            const clonedElement = prepareElementForPDF(element);

            applyGlobalFontScaling(clonedElement);
            applyHeaderStyles(clonedElement);
            applyContentStyles(clonedElement);
            applySkillSectionStyles(clonedElement);
            compactSectionMargins(clonedElement);

            /* here we  generate and download pdf */
            html2pdf()
                .set(options)
                .from(clonedElement)
                .save()
                .catch((error: Error) => {
                    console.error('Error generating PDF:', error);
                    alert('Failed to generate PDF. Please try again.');
                });
        } catch (error) {
            console.error('Error in PDF generation:', error);
            alert('An error occurred while generating the PDF.');
        }
    };

    return (
        <ResumeContainer isDarkMode={isDarkMode} ref={resumeRef}>
            <SectionHeading isDarkMode={isDarkMode} className="resume-heading visible">
                MY RESUME
            </SectionHeading>
            <PageTitle isDarkMode={isDarkMode} className="resume-title visible">
                Sardor Madaminov
            </PageTitle>
            <ResumeContent className="resume-content visible">
                <ResumeActions className="resume-actions">
                    <DownloadButton onClick={handleDownloadPDF} isDarkMode={isDarkMode}>
                        <DownloadIcon
                            style={{ width: '14px', height: '14px', marginRight: '2px' }}
                        />
                        Download
                    </DownloadButton>
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
                        <SkillCategory isDarkMode={isDarkMode}>
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

                        <SkillCategory isDarkMode={isDarkMode}>
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

                        <SkillCategory isDarkMode={isDarkMode}>
                            <SkillCategoryTitle isDarkMode={isDarkMode}>Backend</SkillCategoryTitle>
                            <SkillsList>
                                <SkillItem isDarkMode={isDarkMode}>Node.js</SkillItem>
                                <SkillItem isDarkMode={isDarkMode}>Express</SkillItem>
                                <SkillItem isDarkMode={isDarkMode}>Django</SkillItem>
                                <SkillItem isDarkMode={isDarkMode}>RESTful APIs</SkillItem>
                                <SkillItem isDarkMode={isDarkMode}>GraphQL</SkillItem>
                            </SkillsList>
                        </SkillCategory>

                        <SkillCategory isDarkMode={isDarkMode}>
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

                        <SkillCategory isDarkMode={isDarkMode}>
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

                        <SkillCategory isDarkMode={isDarkMode}>
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
