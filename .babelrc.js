module.exports = {
  env: {
    development: {
      presets: ["next/babel"],
      plugins: [
        [
          "styled-components",
          {
            ssr: true,
            displayName: true,
          },
        ],
        [
          "import",
          {
            libraryName: "antd",
            libraryDirectory: "lib",
            style: true,
          },
        ],
      ],
    },
    production: {
      presets: ["next/babel"],
      plugins: [
        [
          "styled-components",
          {
            ssr: true,
            displayName: false,
          },
        ],
      ],
    },
  },
};
// {
//   presets: [['next/babel']],
//   plugins: [
//     [
//       'import',
//       {
//         libraryName: 'antd',
//         libraryDirectory: 'lib',
//         style: true,
//       },
//     ],
//   ],
//   ignore: ['node_modules'],
// };

// {
//   "presets": ["next/babel"],
//   "plugins": [
//       ["import", { "libraryName": "antd", "style": true }]
//   ]
// }
