export const API_ENDPOINTS = {
    // we set the reverse proxy 
    BASE_URL: 'https://3.88.85.245',
    BLOG: {
      GET_ALL: '/blog',
      GET_BY_ID: (id: number) => `/blog/${id}`
    }
  };