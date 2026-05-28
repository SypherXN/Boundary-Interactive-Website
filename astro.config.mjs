// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { getDevlogLastmodMap } from './src/utils/devlogLastmod.ts';

const devlogLastmod = getDevlogLastmodMap();
const basePath = process.env.BASE_PATH ?? '/';
const siteUrl =
  basePath !== '/'
    ? `https://sypherxn.github.io${basePath.replace(/\/$/, '')}`
    : 'https://sypherxn.github.io';

function prefixRootRelativeUrls(base = '/') {
  const normalizedBase = base.endsWith('/') ? base.slice(0, -1) : base;

  return () => {
    return (tree) => {
      const walk = (node) => {
        if (!node || typeof node !== 'object') return;

        if (node.type === 'element' && node.properties) {
          ['src', 'href', 'poster'].forEach((key) => {
            const value = node.properties[key];
            if (typeof value === 'string' && value.startsWith('/')) {
              node.properties[key] = `${normalizedBase}${value}`;
            }
          });

          if (node.tagName === 'img') {
            node.properties.loading = node.properties.loading ?? 'lazy';
            node.properties.decoding = node.properties.decoding ?? 'async';
          }
        }

        if (Array.isArray(node.children)) {
          node.children.forEach(walk);
        }
      };

      walk(tree);
    };
  };
}

// https://astro.build/config
export default defineConfig({
  site: siteUrl,
  base: basePath,
  integrations: [
    sitemap({
      filter: (page) => !page.endsWith('/rss.xml'),
      serialize(item) {
        const devlogMatch = item.url.match(/\/devlog\/([^/]+)\/?$/);
        if (devlogMatch) {
          const lastmod = devlogLastmod.get(devlogMatch[1]);
          if (lastmod) {
            item.lastmod = lastmod;
          }
        }
        return item;
      },
    }),
  ],
  markdown: {
    rehypePlugins: [prefixRootRelativeUrls(basePath)],
  },
});
