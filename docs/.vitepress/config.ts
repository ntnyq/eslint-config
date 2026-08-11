import path from 'node:path'
import { transformerRenderWhitespace } from '@shikijs/transformers'
import { transformerTwoslash } from '@shikijs/vitepress-twoslash'
import { globSync } from 'tinyglobby'
import { pascalCase } from 'uncase'
import { defineConfig } from 'vitepress'
import { groupIconMdPlugin } from 'vitepress-plugin-group-icons'
import packageJson from '../../package.json' with { type: 'json' }
import meta from './meta.json' with { type: 'json' }
import type { DefaultTheme } from 'vitepress/theme'

const { version } = packageJson
const { PACKAGE_NAME, REPO_SLUG, SITE_DESCRIPTION, SITE_NAME, SITE_URL } = meta

export default defineConfig({
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
  lastUpdated: true,
  cleanUrls: true,
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['link', { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }],
    ['meta', { name: 'theme-color', content: '#ffffff' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: SITE_NAME }],
    ['meta', { property: 'og:url', content: SITE_URL }],
    ['meta', { property: 'og:description', content: SITE_DESCRIPTION }],
    // ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    // ['meta', { name: 'twitter:image', content: `${appUrl}/og.png` }],
  ],

  themeConfig: {
    search: {
      provider: 'local',
      options: {
        detailedView: true,
      },
    },

    outline: {
      label: 'On this page',
      level: [2, 3],
    },

    editLink: {
      text: 'Suggest changes to this page',
      pattern: `https://github.com/${REPO_SLUG}/edit/main/docs/:path`,
    },

    logo: {
      light: '/logo.svg',
      dark: '/logo.svg',
    },

    socialLinks: [
      { icon: 'x', link: 'https://x.com/ntnyq' },
      { icon: 'npm', link: `https://www.npmjs.com/package/${PACKAGE_NAME}` },
      { icon: 'github', link: `https://github.com/${REPO_SLUG}` },
    ],

    nav: [
      {
        link: '/',
        text: 'Home',
      },
      {
        link: '/guide/',
        text: 'Guide',
      },
      {
        link: '/configs/',
        text: 'Configs',
      },
      {
        text: 'Resources',
        items: [{ text: 'FAQ', link: '/faq' }],
      },
      {
        text: `v${version}`,
        items: [
          { text: `v${version} (current)`, link: '/' },
          {
            text: `Release Notes`,
            link: `https://github.com/${REPO_SLUG}/releases`,
          },
        ],
      },
      {
        link: 'https://eslint-config-inspector.ntnyq.com',
        target: '_blank',
        text: 'Inspector',
      },
    ],

    sidebar: {
      '/guide/': {
        items: sidebarGuide(),
      },
      '/configs/': {
        items: sidebarConfigs(),
      },
      '/faq': {
        items: [
          {
            text: 'FAQ',
            link: '/faq',
          },
          {
            text: 'Back to Guide',
            link: '/guide/',
          },
        ],
      },
    },
  },

  markdown: {
    config(md) {
      md.use(groupIconMdPlugin)
    },

    codeTransformers: [
      transformerRenderWhitespace({
        position: 'all',
      }),
      transformerTwoslash({
        explicitTrigger: /\btwoslash\b/,
      }),
    ],
  },
})

function sidebarGuide(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'Guide',
      items: [
        { text: 'Getting Started', link: '/guide/' },
        { text: 'Custom Configuration', link: '/guide/custom' },
      ],
    },
    {
      text: 'Resources',
      items: [
        { text: 'Configs', link: '/configs/' },
        {
          text: 'Config Inspector',
          link: 'https://eslint-config-inspector.ntnyq.com',
        },
      ],
    },
  ]
}

function sidebarConfigs(): DefaultTheme.SidebarItem[] {
  const files = globSync('*.md', {
    cwd: path.resolve(import.meta.dirname, '../configs'),
    ignore: ['index.md', 'ignores.md'],
    onlyFiles: true,
  })

  // keep ignores at the first
  files.unshift('ignores')

  return [
    {
      text: 'Configs',
      items: files
        .map(file => file.replace('.md', ''))
        .map(file => ({
          text: pascalCase(file),
          link: `/configs/${file}`,
        })),
    },
  ]
}
