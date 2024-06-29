import { withLogtail } from "@logtail/next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withLogtail(withNextIntl(nextConfig));
