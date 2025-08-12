import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '50mb', // ضيف هذا السطر لزيادة حد حجم الجسم المسموح به
    },
  },
};

export default nextConfig;
