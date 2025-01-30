# Use Amazon Linux 2023 as the base image
FROM amazonlinux:2023

# Install necessary utilities and development tools
RUN dnf install -y \
    git \
    openssh \
    bash \
    wget \
    tar \
    xz \
    openssl-devel \
    zlib-devel \
    which

# Set up NVM environment variables
ENV NVM_DIR=/root/.nvm

# Install NVM
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# Copy `.nvmrc` file into the build context
COPY ../.nvmrc /tmp/.nvmrc

# Install Node.js using the version specified in `.nvmrc`
RUN NODE_VERSION=$(cat /tmp/.nvmrc) && \
    . $NVM_DIR/nvm.sh && \
    nvm install $NODE_VERSION && \
    nvm alias default $NODE_VERSION && \
    nvm use default && \
    echo '. $NVM_DIR/nvm.sh' >> "$HOME/.bashrc"

# Install PNPM
RUN curl -fsSL https://get.pnpm.io/install.sh | sh -

# Add PNPM to the environment path
ENV PNPM_HOME="/root/.local/share/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

# Install Typescript globally
RUN . $NVM_DIR/nvm.sh && pnpm install -g typescript

# Verify installations
RUN . $NVM_DIR/nvm.sh && node --version && pnpm --version && git --version && curl --version && tsc --version

WORKDIR /app

COPY .. .

RUN . $NVM_DIR/nvm.sh && pnpm install

EXPOSE 3000

ENTRYPOINT [ "/bin/bash", "-c", "pnpm dev"]
