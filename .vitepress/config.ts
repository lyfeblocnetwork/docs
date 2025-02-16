import { HeadConfig } from "vitepress";

const telegramSVG = ` <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12ZM12.43 8.85893C11.2628 9.3444 8.93014 10.3492 5.43189 11.8733C4.86383 12.0992 4.56626 12.3202 4.53917 12.5363C4.49339 12.9015 4.95071 13.0453 5.57347 13.2411C5.65818 13.2678 5.74595 13.2954 5.83594 13.3246C6.44864 13.5238 7.27283 13.7568 7.70129 13.766C8.08994 13.7744 8.52373 13.6142 9.00264 13.2853C12.2712 11.079 13.9584 9.96381 14.0643 9.93977C14.139 9.92281 14.2426 9.90148 14.3128 9.96385C14.3829 10.0262 14.376 10.1443 14.3686 10.176C14.3233 10.3691 12.5281 12.0381 11.5991 12.9018C11.3095 13.171 11.1041 13.362 11.0621 13.4056C10.968 13.5033 10.8721 13.5958 10.78 13.6846C10.2108 14.2333 9.78391 14.6448 10.8036 15.3168C11.2936 15.6397 11.6858 15.9067 12.077 16.1731C12.5042 16.4641 12.9303 16.7543 13.4816 17.1157C13.6221 17.2077 13.7562 17.3034 13.8869 17.3965C14.3841 17.751 14.8307 18.0694 15.3826 18.0186C15.7032 17.9891 16.0345 17.6876 16.2027 16.7884C16.6002 14.6631 17.3816 10.0585 17.5622 8.16097C17.578 7.99473 17.5581 7.78197 17.5422 7.68857C17.5262 7.59518 17.4928 7.46211 17.3714 7.3636C17.2276 7.24694 17.0056 7.22234 16.9064 7.22408C16.455 7.23203 15.7626 7.47282 12.43 8.85893Z" fill="currentColor"/>
</svg>`;

const { BASE: base = "/" } = process.env;

// https://vitepress.dev/concepts/site-config
export default {
  lang: "en-US",
  title: "Lyfebloc Docs",
  description: "Highly scalable modular blockchain powering dynamic applications with extensive full-stack adaptability.",
  lastUpdated: true,
  cleanUrls: true,
  ignoreDeadLinks: true,
  base: base,
  markdown: {
    math: true,
  },
  sitemap: {
    hostname: "https://docs.lyfebloc.network",
  },

  head: [
    [
      "link",
      { rel: "icon", href: "/favicons/favicon.svg", type: "image/svg+xml" },
    ],
    ["link", { rel: "icon", href: "/favicons/favicon.png", type: "image/png" }],
    [
      "link",
      {
        rel: "shortcut icon",
        href: "/favicons/favicon.ico",
        type: "image/x-icon",
      },
    ],
    ["meta", { name: "msapplication-TileColor", content: "#fff" }],
    ["meta", { name: "theme-color", content: "#fff" }],
    [
      "meta",
      {
        name: "viewport",
        content:
          "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no",
      },
    ],
    [
      "meta",
      {
        property: "description",
        content: "Lyfebloc Network is a highly scalable modular blockchain powering dynamic applications with extensive full-stack adaptability..",
      },
    ],
    ["meta", { httpEquiv: "Content-Language", content: "en" }],

    ["meta", { name: "twitter:card", content: "summary_large_image" }],
    ["meta", { name: "twitter:site", content: "@lyfeblocnetwork" }],
    ["meta", { name: "twitter:site:domain", content: "docs.lyfebloc.network" }],
    ["meta", { name: "twitter:url", content: "https://docs.lyfebloc.network" }],
    [
      "meta",
      {
        name: "twitter:image",
        content: "",
      },
    ],
    ["meta", { name: "twitter:image:alt", content: "Lyfebloc Documentation" }],

    ["meta", { property: "og:type", content: "website" }],
    ["meta", { property: "og:site_name", content: "Lyfebloc Docs" }],
    ["meta", { property: "og:url", content: "https://docs.lyfebloc.network" }],
    [
      "meta",
      {
        property: "og:image",
        content: "/Network-og.png",
      },
    ],
    ["meta", { property: "og:image:width", content: "1200" }],
    ["meta", { property: "og:image:height", content: "630" }],
    ["meta", { property: "og:image:type", content: "image/png" }],

    ["meta", { name: "apple-mobile-web-app-title", content: "Lyfebloc Network" }],
  ],

  themeConfig: {
    // https://vitepress.dev/concepts/default-theme-config
    nav: nav(),
    outline: {
      level: "deep",
    },

    search: {
      provider: "local",
      options: {
        detailedView: true,
      },
    },

    sidebar: {
      "/": sidebarHome(),
    },

    logo: {
      alt: "Lyfebloc Logo",
      light: "/logo-light.svg",
      dark: "/logo-dark.svg",
    },

    siteTitle: false,

    socialLinks: [
      { icon: "github", link: "https://github.com/lyfeblocnetwork/docs" },
      { icon: "twitter", link: "https://twitter.com/LyfeblocNetwork" },
      { icon: "youtube", link: "https://www.youtube.com" },
      { icon: "discord", link: "https://discord.gg" },
      { icon: { svg: telegramSVG }, link: "https://t.me" },
    ],

    transformHead(assets: string[]): HeadConfig[] {
      const youthRegularFont = assets.find(
        (file) => /youth\/Youth-Regular\.\w+\.woff2/
      );
      const untitledSansRegularFont = assets.find(
        (file) => /Untitled-Sans-Regular\.\w+\.woff2/
      );
      const untitledSansMediumFont = assets.find(
        (file) => /Unititled-Sans-Medium\.\w+\.woff2/
      );

      const headConfig: HeadConfig[] = [];

      if (youthRegularFont) {
        headConfig.push([
          "link",
          {
            rel: "preload",
            href: youthRegularFont,
            as: "font",
            type: "font/woff2",
            crossorigin: "",
          },
        ]);
      }

      if (untitledSansRegularFont) {
        headConfig.push([
          "link",
          {
            rel: "preload",
            href: untitledSansRegularFont,
            as: "font",
            type: "font/woff2",
            crossorigin: "",
          },
        ]);
      }

      if (untitledSansMediumFont) {
        headConfig.push([
          "link",
          {
            rel: "preload",
            href: untitledSansMediumFont,
            as: "font",
            type: "font/woff2",
            crossorigin: "",
          },
        ]);
      }

      return headConfig;
    },
  },
  transformPageData(pageData) {
    pageData.frontmatter.head ??= [];
    pageData.frontmatter.head.push(
      [
        "meta",
        {
          property: "og:title",
          content:
            pageData.frontmatter.layout === "home"
              ? "Lyfebloc Docs"
              : `${pageData.title} | Lyfebloc Docs`,
        },
      ],
      [
        "meta",
        {
          property: "og:description",
          content:
            pageData.description || "Lyfebloc Network is a highly scalable modular blockchain powering dynamic applications with extensive full-stack adaptability.",
        },
      ],
    );
  },
};

function nav() {
  return [
    {
      text: "Join the network",
      items: [
        { text: "Overview", link: "/overview/introduction" },
        { text: "Installation", link: "/get-started/installation" },
        {
          text: "Resources",
          items: [
            {
              text: "Lyfebloc Network Explorer",
              link: "https://lyfeblocscan.com/",
            },
            {
              text: "lyfebloc-core API docs",
              link: "get-started/api-docs",
            },
          ],
        },
      ],
    },
  ];
}

function sidebarHome() {
  return [
    {
      text: "Overview",
      collapsed: true,
      items: [
        {
          text: "Network Overview",
          collapsed: true,
          items: [
            {
              text: "Introduction",
              link: "overview/introduction",
            },
          ],
        },
        {
          text: "LYB",
          collapsed: true,
          items: [
            {
              text: "Overview of LYB",
              link: "/overview/lyb",
            },
            {
              text: "How to stake LYB",
              link: "/overview/how-to-stake-lyb",
            },
            {
              text: "Staking dashboards",
              link: "/overview/staking",
            },
          ],
        },
      ],
    },
    {
      text: "How-to guides",
      collapsed: true,
      items: [
        {
          text: "Run a Node",
          collapsed: true,
          items: [
            {
              text: "Getting Started",
              collapsed: true,
              items: [
                {
                  text: "Installation",
                  link: "get-started/installation",
                },
                {
                  text: "Local Setup",
                  link: "/get-started/environment",
                },
                {
                  text: "Cloud Setup",
                  link: "/get-started/cloud-setup",
                },
                {
                  text: "CLI Commands",
                  link: "/get-started/cli-commands",
                },
                {
                  text: "RPC Commands",
                  link: "/get-started/rpc-commands",
                },
              ],
            },
            {
              text: "Network Endpoints",
              collapsed: true,
              items: [
                {
                  text: "JSON RPC",
                  link: "/get-started/json-rpc",
                },
                { text: "Operator Info", link: "/get-started/operator-information" },
                { text: "Backup/Restore", link: "/get-started/backup-restore" },
              ],
            },
            {
              text: "Consensus",
              collapsed: true,
              items: [
                {
                  text: "Lyfebloc Proof of Stake (POS)",
                  collapsed: true,
                  items: [
                    { text: "POS Concepts", link: "/get-started/pos-concepts" },
                    {
                      text: "POS Contract Setup",
                      link: "/get-started/pos-setup",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          text: "Configuration",
          collapsed: true,
          items: [
            {
              text: "Server Config File",
              link: "get-started/sample-config.md",
            },
            {
              text: "Manage private keys",
              link: "get-started/private-keys.md",
            },
            {
              text: "Enable Metrics",
              link: "get-started/metrics.md",
            },
          ],
        },
      ],
    },
    {
      text: "Architecture",
      collapsed: true,
      items: [
        {
          text: "Overview",
          collapsed: true,
          items: [
            {
              text: "Overview",
              link: "/architecture/overview",
            },           
          ],
        },
        {
          text: "Modules",
          collapsed: true,
          items: [
            {
              text: "Blockchain",
              link: "/architecture/blockchain",
            },
            {
              text: "Consensus",
              link: "/architecture/consensus",
            },
            {
              text: "Protocol",
              link: "/architecture/protocol",
            },
            {
              text: "Minimal",
              link: "/architecture/minimal",
            },
            {
              text: "Networking",
              link: "/architecture/networking",
            },
            {
              text: "JSON RPC",
              link: "/architecture/json-rpc",
            },
            {
              text: "Sealer",
              link: "/architecture/sealer",
            },
            {
              text: "Storage",
              link: "/architecture/storage",
            },
            {
              text: "Types",
              link: "/architecture/types",
            },
            {
              text: "TxPool",
              link: "/architecture/txpool",
            },
            {
              text: "Other Modules",
              link: "/architecture/other",
            },
          ],
        },
      ],
    },
    {
      text: "Concepts",
      collapsed: true,
      items: [
        {
          text: "EVM",
          link: "/concepts/evm",
        },
        {
          text: "EVM State",
          link: "/concepts/evm-state",
        },
      ],
    },
    {
      text: "Performance Reports",
      collapsed: true,
      items: [
        {
          text: "Overview",
          link: "performance-reports/overview",
        },
        {
          text: "Testing",
          link: "performance-reports/stress-testing",
        },
        {
          text: "EVM State",
          link: "/concepts/evm-state",
        },
      ],
    },
  ];
}
