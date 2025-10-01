import goStansImage from '@/assets/projectImages/gostans_banner.jpg';
import kodjImage from '@/assets/projectImages/kodj_banner.jpg';
import tunnelImage from '@/assets/projectImages/tunnel_banner.jpg';
import personalBanner from '@/assets/projectImages/personal_banner.jpg';

export type ProjectProps = {
    id: number;
    title: string;
    category: string;
    description: string;
    image: string;
    techStack: string[];
    githubLink: string;
    liveLink: string;
    lastUpdated?: string;
    language?: string;
};

export const projectsData: ProjectProps[] = [
    {
        id: 1,
        title: "KO'DJ Platform",
        category: 'Developer Community Platform',
        description:
            'A full-fledged platform connecting Uzbek Developers in Korea, featuring job listings, tech events, and knowledge sharing.',
        image: kodjImage,
        techStack: ['React', 'TS', 'Firebase'],
        githubLink: 'https://github.com/kodjdev/kodj-frontend',
        liveLink: 'https://kodj.dev',
        lastUpdated: '10/1/2025',
        language: 'TS',
    },
    {
        id: 2,
        title: 'GoStans',
        category: 'Global Travel Marketplace',
        description:
            'All-in-one travel platform for Central Asian destinations, featuring tour bookings, activities, and transportation.',
        image: goStansImage,
        techStack: ['React', 'TS', 'Styled-Components'],
        githubLink: 'https://github.com/GoStans-Co/gostans-frontend',
        liveLink: 'https://gostans.com',
        lastUpdated: '9/28/2025',
        language: 'TS',
    },
    {
        id: 3,
        title: 'Tunnel Chat',
        category: 'Secure Messaging Web-App',
        description:
            'End-to-end encrypted real-time messaging application with WebSocket communication, OAuth 2.0 authentication, and file sharing.',
        image: tunnelImage,
        techStack: ['React', 'Express', 'WebSocket'],
        githubLink: 'https://github.com/Sardor-M/tunnel_chat',
        liveLink: 'https://tunnel-chat.com',
        lastUpdated: '9/28/2025',
        language: 'JS',
    },
    {
        id: 4,
        title: 'Personal Website',
        category: 'Blog & Portfolio',
        description:
            'Serverless blog platform leveraging Notion API for content management, Firebase Functions for backend logic, and Redis caching.',
        image: personalBanner,
        techStack: ['React', 'Cloud Functions', 'Notion API'],
        githubLink: 'https://github.com/Sardor-M/p_website_frontend',
        liveLink: 'https://sardor-m.dev/',
        lastUpdated: '9/26/2025',
        language: 'TS',
    },
];
