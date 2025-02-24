export const API_ENDPOINTS = {
    BASE_URL: import.meta.env.BACKEND_SERVER_URL,
    BLOG: {
      GET_ALL: '/blog',
      GET_BY_ID: (id: number) => `/blog/${id}`
    }
  };