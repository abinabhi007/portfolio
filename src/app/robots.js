export default function robots() {
  // Replace with your actual domain when deploying
  const baseUrl = 'https://abinhn.vercel.app';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/private/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
