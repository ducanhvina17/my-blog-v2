
// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with matching tsconfig.json)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Anhdojo',
  tagline: 'Anhdojo is a blog about development, programming, and technology.',
  favicon: 'public/favicon.ico',
  url: 'https://anhdojo.com',
  baseUrl: '/docs/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // GitHub pages deployment config
  organizationName: 'your-org', 
  projectName: 'indie-blogosphere',

  // Even if you don't use internationalization, you can use this field to set
  // locale-specific configurations
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          editUrl: 'https://github.com/your-org/indie-blogosphere/tree/main/',
        },
        blog: {
          showReadingTime: true,
          path: './blog',
          routeBasePath: 'blog',
          editUrl: 'https://github.com/your-org/indie-blogosphere/tree/main/',
        },
        theme: {
          customCss: './src/css/docusaurus-custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'Anhdojo',
        logo: {
          alt: 'Anhdojo Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Documentation',
          },
          {to: '/blog', label: 'Blog', position: 'left'},
          {
            href: 'https://github.com/your-org/indie-blogosphere',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Getting Started',
                to: '/docs/intro',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Twitter',
                href: 'https://twitter.com/your-handle',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/your-org/indie-blogosphere',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Your Project, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: require('prism-react-renderer').themes.github,
        darkTheme: require('prism-react-renderer').themes.dracula,
      },
    }),
};

module.exports = config;
