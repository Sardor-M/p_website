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
        queryKey: notionKeys.posts(),
        queryFn: getPosts,
        staleTime: 10 * 60 * 1000,
        gcTime: 30 * 60 * 1000,
    });
};

/* here we only fetch single post by slug */
export const useNotionPostBySlug = (slug: string, enabled = true) => {
    return useQuery({
        queryKey: notionKeys.post(slug),
        queryFn: () => getPostBySlug(slug),
        enabled: enabled && !!slug,
        staleTime: 15 * 60 * 1000,
        gcTime: 60 * 60 * 1000,
    });
};

/* we fetch single post by ID */
export const useNotionPostById = (id: string, enabled = true) => {
    return useQuery({
        queryKey: notionKeys.postById(id),
        queryFn: () => getPostById(id),
        enabled: enabled && !!id,
        staleTime: 15 * 60 * 1000,
        gcTime: 60 * 60 * 1000,
    });
};

export const usePrefetchPost = () => {
    const queryClient = useQueryClient();

    return (slug: string, id: string) => {
        queryClient.prefetchQuery({
            queryKey: notionKeys.post(slug),
            queryFn: () => getPostBySlug(slug),
            staleTime: 15 * 60 * 1000,
        });
        /* this case we only prefetch the post by its id if it exists */
        if (id) {
            queryClient.prefetchQuery({
                queryKey: notionKeys.postById(id),
                queryFn: () => getPostById(id),
                staleTime: 15 * 60 * 1000,
            });
        }
    };
};
