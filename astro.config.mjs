// @ts-check
import { defineConfig } from 'astro/config';

function prefixRootRelativeUrls(basePath = '/') {
  const normalizedBase = basePath.endsWith('/') ? basePath.slice(0, -1) : basePath;

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
  site: 'https://boundaryinteractive.github.io',
  base: process.env.BASE_PATH ?? '/',
  markdown: {
    rehypePlugins: [prefixRootRelativeUrls(process.env.BASE_PATH ?? '/')],
  },
});
