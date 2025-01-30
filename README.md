This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

To open this project in a Dev Container using Visual Studio Code:

    Ensure Prerequisites:
        Docker: Install Docker if you haven't already.
        VS Code Dev Containers Extension: Install the Dev Containers Extension.
          https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers


    Docker Desktop on Mac
        Go to Settings > Choose file sharing implementation for your containers > Choose gRPC FUSE

    Set INK_GPG_HOME Environment Variable
        # Add this to your shell rc file
        export INK_GPG_HOME=$(gpgconf --list-dirs agent-socket)
        # OR use this if youre unsure
        echo 'export INK_GPG_HOME=$(gpgconf --list-dirs agent-socket)' >> "$HOME/.$(basename $SHELL)rc"

    Open in VS Code:
        If you haven't already, open this project in Visual Studio Code.

    Reopen in Dev Container:
        Press F1 (or Ctrl+Shift+P).
        Select Dev Containers: Reopen in Container.

        # If you want to open a different directory
        Select Dev Containers: Open Folder in Container

VS Code will now build and open the project in a fully configured Dev Container environment. 🚀

Create `.env.local` file with the follwoing defined `HUB_SPOT_TOKEN_ACCESS=<TOKEN>`
First, run the development server:

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

# Setup

- Define the env variable `INK_DIRECTORY` in your .bashrc or .zshrc file to the directory where Ink specific .gitconfig is stored
