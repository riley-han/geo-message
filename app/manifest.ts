import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Geo Message',
    short_name: 'Geo Message',
    description: 'A Progressive Web App for Geo Message',
    start_url: '/messages',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    "icons": [
        {
          "src": "/web-app-manifest-192x192.png",
          "sizes": "192x192",
          "type": "image/png",
          "purpose": "maskable"
        },
        {
          "src": "/web-app-manifest-512x512.png",
          "sizes": "512x512",
          "type": "image/png",
          "purpose": "maskable"
        }
      ],
      }
}