import dotenv from "dotenv/config";
import esbuild from "esbuild";
import process from "process";
// import builtins from 'builtin-modules'

const banner = `/*
THIS IS A GENERATED/BUNDLED FILE BY ESBUILD
if you want to view the source, please visit the github repository of this plugin
*/
`;

console.log(`esbuild version = ${esbuild.version}`);

const prod = process.argv[2] === "production";

const DEFAULT_DROPBOX_APP_KEY = process.env.DROPBOX_APP_KEY || "";
const DEFAULT_ONEDRIVE_CLIENT_ID = process.env.ONEDRIVE_CLIENT_ID || "";
const DEFAULT_ONEDRIVE_AUTHORITY = process.env.ONEDRIVE_AUTHORITY || "";

esbuild
  .build({
    banner: {
      js: banner,
    },
    loader: {
      ".svg": "text",
    },
    entryPoints: ["./src/main.ts"],
    bundle: true,
    external: [
      "obsidian",
      "electron",
      "fs",
      "crypto",
      // ...builtins
    ],
    format: "cjs",
    watch: !prod,
    target: "es2016",
    logLevel: "info",
    sourcemap: prod ? false : "inline",
    treeShaking: true,
    minify: prod,
    outfile: "main.js",
    define: {
      "process.env.DEFAULT_DROPBOX_APP_KEY": `"${DEFAULT_DROPBOX_APP_KEY}"`,
      "process.env.DEFAULT_ONEDRIVE_CLIENT_ID": `"${DEFAULT_ONEDRIVE_CLIENT_ID}"`,
      "process.env.DEFAULT_ONEDRIVE_AUTHORITY": `"${DEFAULT_ONEDRIVE_AUTHORITY}"`,
    },
  })
  .catch(() => process.exit(1));
