export default [
  {
    extends: ['./node_modules/gts/', 'next/core-web-vitals'],
    overrides: [
      {
        files: ['test/**/*.ts', '*.config.ts'],
        rules: {
          'node/no-unpublished-import': ['off'],
        },
      },
    ],
    ignores: ['build/'],
  },
];
