# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Structure

This is a Sui blockchain hello world application with two main components:

- **Move smart contract** (`/move/hello-world/`): Contains the Sui Move package with a `Greeting` struct and functions to create and update greeting objects
- **React UI** (`/ui/`): Frontend dApp built with React, TypeScript, Vite, and Sui dApp Kit for wallet integration

## Common Commands

### Move Package Development
```bash
# Navigate to Move package directory
cd move/hello-world

# Build the Move package
sui move build

# Publish to testnet (requires Sui CLI setup and wallet funding)
sui client publish --gas-budget 100000000

# Check Move.lock for dependency versions
```

### Frontend Development
```bash
# Navigate to UI directory
cd ui

# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Run ESLint
pnpm lint

# Type check
tsc
```

## Key Architecture Patterns

### Move Contract (`greeting.move`)
- `new()` function creates a new shared `Greeting` object - can be called by anyone at any time
- `update_text()` function allows anyone to modify the greeting text of existing objects
- Uses Sui's shared object pattern - anyone can access but transactions are strictly ordered
- Multiple `Greeting` objects can exist simultaneously

### Frontend Integration
- **Package ID**: Must be updated in `ui/src/constants.ts` after Move package publication
- **Network Config**: Uses `@mysten/dapp-kit`'s `createNetworkConfig` for testnet configuration
- **Transaction Pattern**: Uses `Transaction` class with `moveCall` for smart contract interaction
- **State Management**: React hooks with `@mysten/dapp-kit` for wallet connection and Sui client queries
- **Object Management**: App tracks greeting object IDs via URL hash and local state

### Publication Workflow
1. Publish Move package with `sui client publish`
2. Copy `PackageID` from output to `TESTNET_HELLO_WORLD_PACKAGE_ID` in `constants.ts`
3. Users can create new `Greeting` objects by calling the `new` function
4. Object IDs are obtained from transaction effects and used to interact with specific greetings

## Prerequisites

- Sui CLI installed and configured for testnet
- Testnet wallet address with SUI tokens (from https://faucet.sui.io)
- pnpm for frontend package management

## Development Notes

- The frontend uses Radix UI components for styling
- Transaction execution includes loading states and error handling
- Move package uses Sui Framework testnet branch dependency
- App supports creating multiple greeting objects, each with unique object IDs