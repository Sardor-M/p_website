import styled from 'styled-components';
import { themeColor } from '@/themes/color';
import Button from '@/components/Common/Button';

const NavigationContainer = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
    padding-bottom: 0.6rem;
    border-bottom: 0.5px solid
        ${({ theme }) => (theme.mode === 'dark' ? themeColor.border.dark : themeColor.border.light)};

    ${themeColor.breakpoints.mobile} {
        flex-direction: row;
        align-items: stretch;
        gap: 0.75rem;
    }
`;

export default function NavigationSection() {
    const scrollToTop = (): void => {
        window.scrollTo({ top: 0, behavior: 'smooth' });

        const mainContent = document.querySelector('main');
        if (mainContent) {
            mainContent.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <NavigationContainer>
            <Button to="/" size="sm" variant="ghost">
                ← Back
            </Button>
            <Button size="sm" variant="ghost" onClick={scrollToTop} type="button">
                ↑ Top
            </Button>
        </NavigationContainer>
    );
}
