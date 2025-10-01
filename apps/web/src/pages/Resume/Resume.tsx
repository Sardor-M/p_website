import { themeColor } from '@/themes/color';
import { DarkModeProps } from '@/types/blog';
import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import html2pdf from 'html2pdf.js';
import { Download } from 'lucide-react';
import resumeData from '@/pages/Resume/Data/resumeData.json';

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
        SKILL_ITEM: '10px',
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

    font-family:
        'Inter',
        -apple-system,
        BlinkMacSystemFont,
        'Segoe UI',
        'Roboto',
        sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    font-size: 1.0625rem;
    line-height: 1.65;
    font-weight: 400;
    letter-spacing: -0.003em;
    color: ${({ theme }) =>
        theme.mode === 'dark' ? 'rgba(255, 255, 255, 0.95)' : 'rgba(0, 0, 0, 0.9)'};

    * {
        font-family: inherit;
    }

    code,
    pre,
    kbd,
    samp {
        font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, monospace;
    }

    ${themeColor.breakpoints.mobile} {
        font-size: 0.95rem;
        padding: 1rem 0 1rem 0;
    }

    ${themeColor.breakpoints.mobile} {
        padding: 0;
    }
`;

const PageTitle = styled.h1<{ isDarkMode: boolean }>`
    font-size: 2rem;
    font-weight: 700;
    color: ${(props) => (props.isDarkMode ? themeColor.text.dark : themeColor.text.light)};
    margin: 0;
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
        line-height: 1.2;
    }
`;

const TitleRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;

    ${themeColor.breakpoints.mobile} {
        flex-direction: column;
        align-items: flex-start;
        gap: 15px;
        margin-bottom: 15px;
    }
`;

const DownloadButton = styled.button<{ isDarkMode: boolean }>`
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background-color: transparent;
    color: ${(props) => (props.isDarkMode ? themeColor.text.dark : themeColor.text.light)};
    padding: 8px 16px;
    border-radius: 6px;
    border: 1px solid ${(props) => (props.isDarkMode ? '#444' : '#e5e5e5')};
    font-size: 0.9rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        background-color: ${(props) =>
            props.isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'};
        transform: translateY(-1px);
    }

    svg {
        width: 16px;
        height: 16px;
    }

    ${themeColor.breakpoints.mobile} {
        padding: 6px 12px;
        font-size: 0.85rem;
        gap: 6px;
    }
`;

const ResumeSection = styled.div`
    margin-bottom: 12px;

    ${themeColor.breakpoints.mobile} {
        margin-bottom: 20px;
    }
`;

const ResumeSectionTitle = styled.h3<{ isDarkMode: boolean }>`
    font-size: 1.4rem;
    margin-bottom: 10px;
    padding-bottom: 6px;
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
    margin-bottom: 6px;
    padding-left: 1px;
    padding-bottom: 4px;

    ${themeColor.breakpoints.mobile} {
        margin-bottom: 15px;
        padding-left: 0;
    }
`;

const ExperienceHeader = styled.div`
    display: flex;
    justify-content: space-between;
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
    margin: 6px 0;
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
    display: flex;
    flex-direction: column;
    padding: 0;

    ${themeColor.breakpoints.mobile} {
        gap: 15px;
        padding: 5px 0;
    }
`;

const SkillCategoryTitle = styled.h4<{ isDarkMode: boolean }>`
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 0;
    margin-right: 12px;
    color: ${(props) => (props.isDarkMode ? themeColor.text.dark : themeColor.text.light)};
    display: inline-block;

    ${themeColor.breakpoints.mobile} {
        font-size: 0.9rem;
        margin-right: 10px;
        display: block;
        margin-bottom: 8px;
        padding-bottom: 5px;
        border-bottom: 1px solid
            ${(props) => (props.isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)')};
    }
`;

const SkillCategory = styled.div<{ isDarkMode: boolean }>`
    margin-bottom: 6px;
    width: 100%;
    display: flex;
    align-items: baseline;

    ${themeColor.breakpoints.mobile} {
        flex-direction: column;
        margin-bottom: 12px;
        background: ${(props) =>
            props.isDarkMode ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)'};
        padding: 10px;
        border-radius: 8px;
    }
`;

const SkillsList = styled.ul`
    list-style-type: none;
    padding: 0;
    margin: 0;
    display: inline;
    flex: 1;

    ${themeColor.breakpoints.mobile} {
        display: block;
    }
`;

const SkillItem = styled.li<{ isDarkMode: boolean }>`
    font-size: 0.9rem;
    margin-bottom: 0;
    color: ${(props) => (props.isDarkMode ? themeColor.text.dark : themeColor.text.light)};
    display: inline;
    opacity: 0.85;

    &:after {
        content: ', ';
    }

    &:last-child:after {
        content: '';
    }

    ${themeColor.breakpoints.mobile} {
        font-size: 0.8rem;
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

        const downloadButton = clonedElement.querySelector('button');
        downloadButton?.remove();

        clonedElement.style.padding = '0';
        clonedElement.style.backgroundColor = '#ffffff';

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
        element.style.color = '#000000';

        const title = element.querySelector('h1') as HTMLHeadingElement | null;
        if (title) {
            title.style.fontSize = PDF_STYLES.FONT_SIZES.TITLE;
            title.style.marginBottom = PDF_STYLES.MARGINS.XLARGE;
            title.style.color = '#000000';
        }

        const sectionHeading = element.querySelector('h2') as HTMLHeadingElement | null;
        if (sectionHeading) {
            sectionHeading.style.fontSize = PDF_STYLES.FONT_SIZES.SECTION_HEADING;
            sectionHeading.style.marginBottom = PDF_STYLES.MARGINS.LARGE;
            sectionHeading.style.color = '#000000';
        }

        element.querySelectorAll('h3, h4, h5, p, span, li').forEach((el: Element) => {
            (el as HTMLElement).style.color = '#000000';
        });

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

        element.querySelectorAll('.skill-category li').forEach((item: Element) => {
            const liElement = item as HTMLLIElement;
            liElement.style.fontSize = PDF_STYLES.FONT_SIZES.SKILL_ITEM;
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
        const skillsSection = element.querySelector('.skills-section') as HTMLElement | null;
        if (skillsSection) {
            skillsSection.style.marginBottom = '10px';
        }

        element.querySelectorAll('.skill-category').forEach((cat: Element) => {
            const categoryEl = cat as HTMLElement;
            categoryEl.style.marginBottom = '4px';
        });

        element.querySelectorAll('h4').forEach((cat: Element) => {
            const h4Element = cat as HTMLHeadingElement;
            const parentEl = h4Element.parentElement as HTMLElement | null;
            if (parentEl?.classList.contains('skill-category')) {
                h4Element.style.fontSize = PDF_STYLES.FONT_SIZES.SKILL_CATEGORY;
                h4Element.style.marginBottom = '0';
                h4Element.style.marginRight = '10px';
            }
        });
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
            <TitleRow>
                <PageTitle isDarkMode={isDarkMode} className="resume-title visible">
                    Sardor Madaminov
                </PageTitle>
                <DownloadButton onClick={handleDownloadPDF} isDarkMode={isDarkMode}>
                    <Download />
                </DownloadButton>
            </TitleRow>
            <ResumeContent className="resume-content visible">
                <ResumeSection>
                    <ResumeSectionTitle isDarkMode={isDarkMode}>Experience</ResumeSectionTitle>

                    {resumeData.experiences.map((exp, index) => (
                        <ExperienceItem key={index}>
                            <ExperienceHeader>
                                <div>
                                    <ExperienceTitle isDarkMode={isDarkMode}>
                                        {exp.title}
                                    </ExperienceTitle>
                                    <ExperienceCompany isDarkMode={isDarkMode}>
                                        {exp.company}
                                    </ExperienceCompany>
                                </div>
                                <ExperienceDate isDarkMode={isDarkMode}>{exp.date}</ExperienceDate>
                            </ExperienceHeader>
                            <ExperienceDescription isDarkMode={isDarkMode}>
                                {exp.description}
                            </ExperienceDescription>
                        </ExperienceItem>
                    ))}
                </ResumeSection>
                <ResumeSection>
                    <ResumeSectionTitle isDarkMode={isDarkMode}>Education</ResumeSectionTitle>

                    {resumeData.education.map((edu, index) => (
                        <ExperienceItem key={index}>
                            <ExperienceHeader>
                                <div>
                                    <ExperienceTitle isDarkMode={isDarkMode}>
                                        {edu.degree}
                                    </ExperienceTitle>
                                    <ExperienceCompany isDarkMode={isDarkMode}>
                                        {edu.school}
                                    </ExperienceCompany>
                                </div>
                                <ExperienceDate isDarkMode={isDarkMode}>{edu.date}</ExperienceDate>
                            </ExperienceHeader>
                            <ExperienceDescription isDarkMode={isDarkMode}>
                                {edu.description}
                            </ExperienceDescription>
                        </ExperienceItem>
                    ))}
                </ResumeSection>
                <ResumeSection className="skills-section">
                    <ResumeSectionTitle isDarkMode={isDarkMode}>Skills</ResumeSectionTitle>

                    <SkillsGrid>
                        {Object.entries(resumeData.skills).map(([category, skills]) => (
                            <SkillCategory
                                key={category}
                                isDarkMode={isDarkMode}
                                className="skill-category"
                            >
                                <SkillCategoryTitle isDarkMode={isDarkMode}>
                                    {category}
                                </SkillCategoryTitle>
                                <SkillsList>
                                    {skills.map((skill, index) => (
                                        <SkillItem key={index} isDarkMode={isDarkMode}>
                                            {skill}
                                        </SkillItem>
                                    ))}
                                </SkillsList>
                            </SkillCategory>
                        ))}
                    </SkillsGrid>
                </ResumeSection>
            </ResumeContent>
        </ResumeContainer>
    );
}
