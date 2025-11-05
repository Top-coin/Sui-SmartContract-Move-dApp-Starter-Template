# Sui Stack Hello World App

A quick-start template built on the Sui Stack. This hello world app demonstrates creating and sharing greeting messages that anyone can edit - like a collaborative document where users can create posts and others can modify the text.


## Quick Start (Try it first!)

Want to see it working immediately? The app comes pre-configured with a published package so you can explore the experience right away:

1. Navigate to [`/ui/`](./ui/) directory
2. Run `pnpm install`
3. Run `pnpm dev` 
4. Visit [http://localhost:5173/](http://localhost:5173/)

This uses existing package IDs so you can experience the app without any setup. To customize the functionality or deploy your own version, follow the steps below.

## Deploy Your Own Version
### Prerequisites: 
- Set up the Sui development environment ([installation guide](https://docs.sui.io/guides/developer/getting-started/sui-install))

### Publish hello-world package
1. Navigate to [`/move/hello-world/`](./move/hello-world/) directory
2. Run `sui client publish` to publish package
3. Copy the `PackageID` found in the list of `Published Objects` in the `Object Changes` section of the output. Paste it in `TESTNET_HELLO_WORLD_PACKAGE_ID` in [`./ui/src/constants.ts`](./ui/src/constants.ts).

### Run frontend
1. Navigate to [`/ui/`](./ui/) directory. 
2. Run `pnpm install`
3. Run `pnpm dev`
4. Visit [http://localhost:5173/](http://localhost:5173/)

## More Information
Visit the hello world docs page for a more detailed guide [placeholder link](placeholder)