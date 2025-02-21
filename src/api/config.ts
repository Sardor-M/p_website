export const API_ENDPOINTS = {
    BASE_URL: 'http://localhost:3000',
    BLOG: {
      GET_ALL: '/blog',
      GET_BY_ID: (id: number) => `/blog/${id}`
    }
  };