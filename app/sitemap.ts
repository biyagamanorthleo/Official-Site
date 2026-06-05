import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://lcbn.org';
  const now = new Date();

  return [
    { url: base,                      lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${base}/about`,           lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/projects`,        lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${base}/team`,            lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/achievements`,    lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/gallery`,         lastModified: now, changeFrequency: 'weekly',  priority: 0.7 },
    { url: `${base}/starter-pack`,    lastModified: now, changeFrequency: 'yearly',  priority: 0.5 },
  ];
}
