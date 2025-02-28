export const API_ENDPOINTS = {
  // backned url for the api
  BASE_URL: 'https://api.sardor-m.dev',
  BLOG: {
    GET_ALL: '/blog',
    GET_BY_ID: (id: number) => `/blog/${id}`,
  },
};
