import * as nodePath from 'path';
const rootFolder = nodePath.basename(nodePath.resolve());

const buildServerFolder = './public/assets';
const buildFolder = './dist';
const srcFolder = './src';

export const path = {
    build: {
        js: `${buildFolder}/js`,
        serverJs: `${buildServerFolder}/js`,
        images: `${buildFolder}/images`,
        serverImages: `${buildServerFolder}/images`,
        css: `${buildFolder}/css`,
        serverCss: `${buildServerFolder}/css`,
        html: `${buildFolder}/`,
        fonts: `${buildFolder}/fonts/`,
        files: `${buildFolder}/files/`,
    },
    src: {
        js: `${srcFolder}/js/app.js`,
        images: `${srcFolder}/images/**/*.{jpg,jpeg,png,gif,webp}`,
        svg: `${srcFolder}/images/**/*.svg`,
        scss: `${srcFolder}/scss/style.scss`,
        html: `${srcFolder}/*.pug`, // or .html
        files: `${srcFolder}/files/**/*.*`,
        files: `${srcFolder}/files/**/*.*`,
        svgicons: `${srcFolder}/svgicons/*.svg`,
    },
    watch: {
        js: `${srcFolder}/js/**/*.js`,
        images: `${srcFolder}/images/**/*.{jpg,jpeg,png,gif,ico,svg,webp}`,
        scss: `${srcFolder}/scss/**/*.scss`,
        html: `${srcFolder}/**/*.pug`, // or .html
        files: `${srcFolder}/files/**/*.*`,
    },
    clean: buildFolder,
    cleanServer: buildServerFolder,
    buildFolder: buildFolder,
    srcFolder: srcFolder,
    rootFolder: rootFolder,
    ftp: `test`
}