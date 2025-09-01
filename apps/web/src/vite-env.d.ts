/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_NOTION_BLOG_DATABASE_ID: string;
    readonly VITE_NOTION_API_SECRET: string;
    readonly VITE_NOTION_API_SECRET: string;
    readonly VITE_FIREBASE_FUNCTIONS_URL: string;
    readonly VITE_FIREBASE_API_KEY: string;
    readonly DEV: boolean;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}

declare module '*.svg?react' {
    import * as React from 'react';
    const ReactComponent: React.FunctionComponent<
        React.SVGProps<SVGSVGElement> & { title?: string }
    >;
    export default ReactComponent;
}
