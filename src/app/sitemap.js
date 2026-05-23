export default function sitemap() {
  // Replace with your actual domain when deploying
  const baseUrl = 'https://abinhn.vercel.app';

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    // Add additional page routes here as they are created
  ];
}
