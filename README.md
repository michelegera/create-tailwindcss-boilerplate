# Create Tailwind CSS Boilerplate

A bare-bones Tailwind CSS boilerplate.

It creates a simple HTML + CSS template with [Tailwind CSS][tailwind] support,
served by [Parcel][parcel] and using [PurgeCSS][purgecss] in production builds.

## Getting started

### Requirements

[Yarn][yarn] is suggested, but not required. The project will be set up with
[npm][npm] if Yarn is not found.

### Create boilerplate

```bash
yarn create tailwindcss-boilerplate

# or

npx create-tailwindcss-boilerplate
```

Follow instructions at the prompt to create your project:

```bash
? Name your project root directory my-project
  ✔ Create directory structure
  ✔ Create project files
  ✔ Create templates
  ✔ Set up dependencies
```

### Run server

```bash
yarn dev
```

Open your favorite text editor and start coding!

## Build for production

```bash
yarn build
```

Build files will end up in `/dist`.

## Contributing

If you want to add a feature, fix a bug or propose a change, please feel free to
[submit an issue][issue] or [open a pull request][pr].

Thanks to [all the contributors][contributors]!

## Acknowledgments

This project piggybacks on the excellent [TailwindCSS + Parcel + PurgeCSS
Starter Project][starter-project] by [didier][didier]. Check out his
[blog post][blog-post] on getting started with Tailwind CSS.

[tailwind]: https://tailwindcss.com
[parcel]: https://parceljs.org
[purgecss]: https://purgecss.com
[yarn]: https://yarnpkg.com
[npm]: https://www.npmjs.com
[issue]: https://github.com/michelegera/create-tailwindcss-boilerplate/issues/new
[pr]: https://github.com/michelegera/create-tailwindcss-boilerplate/compare
[contributors]: https://github.com/michelegera/create-tailwindcss-boilerplate/graphs/contributors
[starter-project]: https://github.com/didier/tailwindcss-parcel-boilerplate
[didier]: https://github.com/didier
[blog-post]: https://dev.to/didier/getting-started-with-tailwindcss-in-seconds-8p2
