import { transformerRenderWhitespace } from '@shikijs/transformers'
import { transformerTwoslash } from '@shikijs/vitepress-twoslash'
import { defineConfig } from 'vitepress'
import { groupIconMdPlugin } from 'vitepress-plugin-group-icons'
import { version } from '../../package.json'
import {
  PACKAGE_NAME,
  REPO_SLUG,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from './meta'

export default defineConfig({
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
  lastUpdated: true,
  cleanUrls: true,
  ignoreDeadLinks: true,

  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['link', { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }],
    ['meta', { name: 'theme-color', href: '#ffffff' }],
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

    editLink: {
      text: 'Suggest changes to this page',
      pattern: `https://github.com/${REPO_SLUG}/edit/main/docs/:path`,
    },

    // logo: {
    //   light: '/logo.svg',
    //   dark: '/logo.svg',
    // },

    socialLinks: [
      { icon: 'x', link: 'https://twitter.com/ntnyq' },
      { icon: 'npm', link: `https://www.npmjs.com/package/${PACKAGE_NAME}` },
      { icon: 'github', link: `https://github.com/${REPO_SLUG}` },
    ],

    nav: [
      {
        link: '/',
        text: 'Home',
      },
      {
        link: '/guide',
        text: 'Guide',
      },
      {
        link: '/configs',
        text: 'Configs',
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
      // {
      //   link: '/inspector',
      //   text: 'Inspector',
      // },
    ],

    sidebar: [],
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
