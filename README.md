# TeachForAll

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

✨ Your new, shiny [Nx workspace](https://nx.dev) is ready ✨.

[Learn more about this workspace setup and its capabilities](https://nx.dev/nx-api/expo?utm_source=nx_project&amp;utm_medium=readme&amp;utm_campaign=nx_projects) or run `npx nx graph` to visually explore what was created. Now, let's get you up to speed!

## Run tasks

To run the dev server for your app, use:

```sh
npx nx serve mobile-app
```

To create a production bundle:

```sh
npx nx build mobile-app
```

To see all available targets to run for a project, run:

```sh
npx nx show project mobile-app
```
Build

```sh
npx nx build mobile-app
```
# Generate UI lib

```sh
nx g @nx/react-native:lib ui
```
# Add a component
```sh
nx g \
@nx/react-native:component \
ui/src/lib/button
```