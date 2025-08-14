import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getPosts, getPostBySlug, getPostById } from '@/api/index';

/* query keys */
export const notionKeys = {
    all: ['notion'] as const,
    posts: () => [...notionKeys.all, 'posts'] as const,
    post: (slug: string) => [...notionKeys.all, 'post', slug] as const,
    postById: (id: string) => [...notionKeys.all, 'postById', id] as const,
};

/* we fetch all posts */
export const useNotionPosts = () => {
    return useQuery({
        queryKey: ['notion-posts'],
        queryFn: async () => {
            const posts = await getPosts();
            return posts;
        },
        staleTime: 1000 * 60 * 10 /* 10 minutes */,
        gcTime: 1000 * 60 * 60 /* 1 hour */,
        refetchOnWindowFocus: false,
        retry: 1,
    });
};

/* here we only fetch single post by slug */
export const useNotionPostBySlug = (slug: string, enabled = true) => {
    return useQuery({
        queryKey: notionKeys.post(slug),
        queryFn: () => getPostBySlug(slug),
        enabled: enabled && !!slug,
        staleTime: 30 * 60 * 1000,
        gcTime: 2 * 60 * 60 * 1000,
    });
};

/* we fetch single post by ID */
export const useNotionPostById = (id: string, enabled = true) => {
    return useQuery({
        queryKey: notionKeys.postById(id),
        queryFn: () => getPostById(id),
        enabled: enabled && !!id,
        staleTime: 30 * 60 * 1000,
        gcTime: 2 * 60 * 60 * 1000,
    });
};

export const usePrefetchPost = () => {
    const queryClient = useQueryClient();

    return (slug: string, id: string) => {
        const existingBySlug = queryClient.getQueryData(notionKeys.post(slug));
        const existingById = queryClient.getQueryData(notionKeys.postById(id));

        if (!existingBySlug) {
            queryClient.prefetchQuery({
                queryKey: notionKeys.post(slug),
                queryFn: () => getPostBySlug(slug),
                staleTime: 30 * 60 * 1000 /* 30 minutes */,
            });
        }

        if (id && !existingById) {
            queryClient.prefetchQuery({
                queryKey: notionKeys.postById(id),
                queryFn: () => getPostById(id),
                staleTime: 30 * 60 * 1000,
            });
        }
    };
};

export const useBulkPrefetchPosts = () => {
    const queryClient = useQueryClient();

    return (posts: Array<{ slug: string; id: string }>) => {
        posts.forEach((post, index) => {
            setTimeout(() => {
                const existingBySlug = queryClient.getQueryData(notionKeys.post(post.slug));

                if (!existingBySlug) {
                    queryClient.prefetchQuery({
                        queryKey: notionKeys.post(post.slug),
                        queryFn: () => getPostBySlug(post.slug),
                        staleTime: 30 * 60 * 1000,
                    });
                }
            }, index * 90);
        });
    };
};
