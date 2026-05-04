import { PHASE_DEVELOPMENT_SERVER } from "next/constants.js";

const isGithubPages = process.env.GITHUB_PAGES === "true";
const repositoryName = process.env.GITHUB_REPOSITORY_NAME ?? "";
const isUserOrOrgPages = repositoryName.endsWith(".github.io");
const basePath = isGithubPages && repositoryName && !isUserOrOrgPages
  ? `/${repositoryName}`
  : "";

/** @type {(phase: string) => import('next').NextConfig} */
const nextConfig = (phase) => ({
  output: phase === PHASE_DEVELOPMENT_SERVER ? undefined : "export",
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  trailingSlash: true,
  images: {
    unoptimized: true
  }
});

export default nextConfig;
