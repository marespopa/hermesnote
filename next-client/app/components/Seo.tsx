"use-client";

import Head from "next/head";
import { ComponentPropsWithoutRef } from "react";

export const defaultMeta = {
  title: "Hermes Markdown - Markdown Notes",
  siteName: "Hermes Markdown",
  description: `Hermes Markdown - Free online markdown editor. Start from scratch, or use a template, or even open your own markdown file! Easily export your notes to markdown or PDF with maximum privacy, as all data is stored locally, on your computer.`,
  url: "https://hermesmd.netlify.app",
  type: "website",
  robots: "follow, index",
};

type SeoProps = {
  date?: string;
  templateTitle?: string;
} & Partial<typeof defaultMeta>;

export default function Seo(props: SeoProps) {
  const meta = {
    ...defaultMeta,
    ...props,
  };
  meta["title"] = props.templateTitle
    ? `${props.templateTitle} | ${meta.siteName}`
    : meta.title;

  return (
    <Head>
      <title>{meta.title}</title>
      {/* Google Search Console */}
      <meta
        name="google-site-verification"
        content="EE5yya1yV2WhmcOZGqZzSRz_bbpqRfai3xXvB4Sb--A"
      />
      <meta name="robots" content={meta.robots} />
      <meta content={meta.description} name="description" />
      {/* Open Graph */}
      <meta property="og:type" content={meta.type} />
      <meta property="og:site_name" content={meta.siteName} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:title" content={meta.title} />
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@smoothwizz" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      {meta.date && (
        <>
          <meta property="article:published_time" content={meta.date} />
          <meta
            name="publish_date"
            property="og:publish_date"
            content={meta.date}
          />
          <meta name="author" property="article:author" content="Mares Popa" />
        </>
      )}

      {/* Favicons */}
      {favicons.map((linkProps) => (
        <link key={linkProps.href} {...linkProps} />
      ))}
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
      <meta name="theme-color" content="#ffffff" />
    </Head>
  );
}

const favicons: Array<ComponentPropsWithoutRef<"link">> = [
  {
    rel: "apple-touch-icon",
    sizes: "180x180",
    href: "/favicon/apple-touch-icon.png",
  },
  {
    rel: "icon",
    type: "image/png",
    sizes: "32x32",
    href: "/favicon/favicon-32x32.png",
  },
  {
    rel: "icon",
    type: "image/png",
    sizes: "16x16",
    href: "/favicon/favicon-16x16.png",
  },
  { rel: "manifest", href: "/favicon/site.webmanifest" },
  {
    rel: "mask-icon",
    href: "/favicon/safari-pinned-tab.svg",
    color: "#0044DE",
  },
  { rel: "shortcut icon", href: "/favicon/favicon.ico" },
];
