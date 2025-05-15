// SPDX-FileCopyrightText: 2023 Dusan Mijatovic (Netherlands eScience Center)
// SPDX-FileCopyrightText: 2023 Netherlands eScience Center
//
// SPDX-License-Identifier: Apache-2.0

// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'KIN documentation',
  tagline: 'KIN documentation',
  favicon: 'favicon.ico',

  // Set the production url of your site here
  url: 'https://research-software-directory.org/',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/documentation/',
  trailingSlash: true,

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  // organizationName: 'dmijatovic', // Usually your GitHub org/user name.
  // projectName: 'rsd-documentation', // Usually your repo name.
  // deploymentBranch: 'main',

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  plugins: [[require.resolve('docusaurus-lunr-search'),{
    // language codes
    languages: ['en']
  }]],

  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          path: 'docs',
          breadcrumbs: true,
          // change to docs only site
          routeBasePath: '/',
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:'https://github.com/research-software-directory/RSD-as-a-service/edit/main/documentation',
          // do not use current/next version
          // includeCurrentVersion: false,
          showLastUpdateTime: false,
          showLastUpdateAuthor: false
        },
        // disable blog
        blog: false,
        theme: {
          customCss: ['./src/css/custom.css'],
        },
      }
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      // image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'RPD',
        logo: {
          alt: 'KIN logo',
          src: 'apple-touch-icon.png',
          height: '200px'
        },
        hideOnScroll: false,
        items: [
          {
            label: "Projects",
            to: "/users/adding-projects/",
            position: "left"
          },
          {
            label: "Organisations",
            to: "/users/organisation/",
            position: "left"
          },
          {
            label: 'Administration',
            to:'/rsd-instance/administration/',
            position: 'left',
          },
          {
            type: 'search',
            position: 'right',
          },
          {
            href: 'https://hetkin.nl',
            position: 'right',
            label: 'Het KIN',
          },
          // {
          //   href: 'https://ubuntu2204sudo.demo-nlesc.src.surf-hosted.nl/',
          //   position: 'right',
          //   label: 'KIN RPD demo',
          // },
          {
            href: 'https://github.com/research-software-directory/KIN-RPD/tree/main',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      // disable footer
      // footer: {
      //   style: 'dark',
      //   links: [
      //     {
      //       title: 'Docs',
      //       items: [
      //         {
      //           label: 'Users',
      //           to: '/category/users',
      //         },
      //         {
      //           label: 'Developers',
      //           to: '/category/developers',
      //         },
      //         {
      //           label: 'Contributors',
      //           to: '/category/contributors',
      //         },
      //       ],
      //     },
      //     {
      //       title: 'Community',
      //       items: [
      //         {
      //           label: 'Stack Overflow',
      //           href: 'https://stackoverflow.com/questions/tagged/docusaurus',
      //         },
      //         {
      //           label: 'Discord',
      //           href: 'https://discordapp.com/invite/docusaurus',
      //         },
      //         {
      //           label: 'Twitter',
      //           href: 'https://twitter.com/docusaurus',
      //         },
      //       ],
      //     },
      //     {
      //       title: 'Links',
      //       items: [
      //         {
      //           label: 'RSD Live',
      //           href: 'https://github.com/facebook/docusaurus',
      //         },
      //         {
      //           label: 'RSD Demo',
      //           href: 'https://github.com/facebook/docusaurus',
      //         },
      //         {
      //           label: 'GitHub',
      //           href: 'https://github.com/facebook/docusaurus',
      //         },
      //       ],
      //     },
      //   ],
      //   // copyright: "The Research Software Directory promotes the impact, re-use and citation of research software",
      // },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
