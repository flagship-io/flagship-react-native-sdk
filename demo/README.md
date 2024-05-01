# Flagship Demo React Application

Welcome to the Flagship Demo React Application. This application is a demonstration of how to use Flagship for feature flagging and A/B testing in a ReactJs application.

This implementation is based on two use cases:

1. **Fs demo toggle use case**: This feature toggle campaign enables a discount for VIP users.
2. **Fs demo A/B Test use case**: This A/B test campaign allows you to test the color of the 'Add to Cart' button.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- You have installed the latest version of [Node.js](https://nodejs.org/en/download/)
- You have installed [Yarn](https://yarnpkg.com/getting-started/install)
- You have [Docker](https://www.docker.com/products/docker-desktop) installed (optional)
- [Flagship account](https://www.abtasty.com)

## Getting Started

### Running the Application Locally

Follow these steps to get up and running quickly on your local machine:

## Step 1: Install the dependencies

```bash
yarn install
```

## Step 2: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
yarn start
```

## Step 3: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
yarn android
```

### For iOS

```bash
yarn ios
```
