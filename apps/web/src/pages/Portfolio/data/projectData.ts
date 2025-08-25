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
    audience: string;
    impact: string;
    techStack: string[];
    githubLink: string;
    liveLink: string;
    stats?: {
        primary: { label: string; value: string };
        secondary?: { label: string; value: string };
    };
};

const projectsData: ProjectProps[] = [
    {
        id: 1,
        title: "KO'DJ Platform",
        category: 'Developer Community Platform',
        description:
            'A full-fledged platform connecting Uzbek Developers in Korea, featuring job listings, tech events, and knowledge sharing. Built to bridge language barriers and create networking opportunities for 300+ active developers in the Korean IT ecosystem.',
        image: kodjImage,
        audience: 'Active 300+',
        impact: 'Developers participating in monthly tech events',
        stats: {
            primary: { label: 'Active Users', value: '300+' },
            secondary: { label: 'Monthly Events', value: '11+' },
        },
        techStack: [
            'React 18',
            'TypeScript',
            'Ant Design',
            'Recoil',
            'Firebase',
            'KakaoMap API',
            'OAuth 2.0',
        ],
        githubLink: 'https://github.com/kodjdev/kodj-frontend',
        liveLink: 'https://kodj.dev',
    },
    {
        id: 2,
        title: 'GoStans',
        category: 'Global Travel Marketplace',
        description:
            'All-in-one travel platform for Central Asian destinations, featuring tour bookings, activities, and transportation. Integrated multiple payment gateways including Visa, Mastercard, PayPal, and local Uzbek payment cards for seamless global transactions.',
        image: goStansImage,
        audience: 'Registered 10+ Agencies',
        impact: 'Tour agencies actively promoting their tours',
        stats: {
            primary: { label: 'Active Tour Agencies', value: '10+' },
        },
        techStack: [
            'React.js',
            'TypeScript',
            'Styled-Components',
            'Recoil',
            'Mapbox GL',
            'PayPal SDK',
            'Ant Design',
        ],
        githubLink: 'https://github.com/GoStans-Co/gostans-frontend',
        liveLink: 'https://gostans.com',
    },
    {
        id: 3,
        title: 'Tunnel Chat',
        category: 'Secure Messaging Web-App',
        description:
            'End-to-end encrypted real-time messaging application with WebSocket communication, OAuth 2.0 authentication, and file sharing capabilities. Built with Monorepo architecture for efficient frontend-backend integration.',
        image: tunnelImage,
        audience: 'Not Known',
        impact: 'Messages encrypted daily with zero data breaches',
        techStack: [
            'React',
            'Express.js',
            'WebSocket',
            'Redis',
            'OAuth 2.0',
            'pnpm workspace',
            'Multer',
            'JWT',
        ],
        githubLink: 'https://github.com/Sardor-M/tunnel_chat',
        liveLink: 'https://tunnel-chat.com',
    },
    {
        id: 4,
        title: 'Personal Website',
        category: 'Blog & Portfolio',
        description:
            'Serverless blog platform leveraging Notion API for content management, Firebase Functions for backend logic, and Redis caching for optimized performance. Features multilingual support and modern development practices.',
        image: personalBanner,
        audience: 'Not Known',
        impact: 'Monthly visitors with <2s load time',
        techStack: [
            'React 19',
            'Vite',
            'Firebase Functions',
            'Notion API',
            'Redis',
            'i18next',
            'TypeScript',
        ],
        githubLink: 'https://github.com/Sardor-M/p_website_frontend',
        liveLink: 'https://sardor-m.dev/',
    },
];

export default projectsData;
