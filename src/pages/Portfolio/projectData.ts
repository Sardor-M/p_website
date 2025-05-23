export type ProjectProps = {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  audience: string;
  techStack: string[];
  githubLink: string;
  liveLink: string;
};

const projectsData: ProjectProps[] = [
  {
    id: 1,
    title: 'Sample Project',
    category: 'Vercel for AI Models',
    description:
      'Generate full LoRA datasets, train any model on H100 GPUs, and deploy to our sandbox, an OpenAI API SDK endpoint to request, or download the weights to deploy yourself. All using natural language.',
    image:
      'https://plus.unsplash.com/premium_photo-1682309512367-d835725f65f7?q=80&w=3067&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    audience: '10,000+',
    techStack: ['React', 'Node.js', 'Express', 'PostgreSQL'],
    githubLink: 'https://github.com/username/runway',
    liveLink: 'https://runway-demo.com',
  },
  {
    id: 2,
    title: 'Perplexity',
    category: 'AI-Powered Search Engine',
    description:
      'A search engine that uses AI to provide answers to questions, summarize information, and generate content based on user queries.',
    image:
      'https://plus.unsplash.com/premium_photo-1682309512367-d835725f65f7?q=80&w=3067&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    audience: '50,000+',
    techStack: ['React', 'Node.js', 'Express', 'PostgreSQL'],
    githubLink: 'https://github.com/username/sample-demo',
    liveLink: 'https://sample-demo.com',
  },
];

export default projectsData;
