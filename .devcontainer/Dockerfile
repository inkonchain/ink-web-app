FROM --platform=linux/amd64 mcr.microsoft.com/playwright:v1.45.0-jammy

# Install necessary utilities and development tools
RUN apt-get update && apt-get install -y \
# RUN dnf install -y --allowerasing \
    gnupg \
    git \
    openssh-client \
    wget \
    tar \
    xz-utils \
    bash \
    libssl-dev \
    zlib1g-dev 


RUN echo "export GPG_TTY=$(tty)" >> .bashrc \
    echo "export GPG_AGENT_INFO=/root/.gnupg/S.gpg-agent" >> .bashrc \
    echo "export GPG_KEY_ID=$(gpg --list-secret-keys --keyid-format LONG | grep '^sec' | awk '{print $2}' | cut -d'/' -f2)" >> .bashrc \
    git config --global user.signingkey $GPG_KEY_ID \
    git config --global commit.gpgSign true

# Copy `.nvmrc` file into the build context
COPY ../.nvmrc /tmp/.nvmrc

# Load Node.js version from `.nvmrc` and install Node.js directly from binary distributions
RUN NODE_VERSION=$(cat /tmp/.nvmrc) && \
    wget https://nodejs.org/dist/$NODE_VERSION/node-$NODE_VERSION-linux-x64.tar.xz && \
    tar -xJf node-$NODE_VERSION-linux-x64.tar.xz -C /usr/local --strip-components=1 && \
    rm node-$NODE_VERSION-linux-x64.tar.xz

SHELL ["/bin/bash", "-c"]
# Install PNPM
RUN SHELL=/bin/bash && curl -fsSL https://get.pnpm.io/install.sh | bash -

# Add PNPM to the environment path
ENV PNPM_HOME="/root/.local/share/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

# Install Typescript globally
RUN pnpm install -g typescript

# Verify installations
RUN node --version && pnpm --version && git --version && curl --version && tsc --version

WORKDIR /app

COPY .. .

RUN pnpm install

EXPOSE 3000

ENTRYPOINT [ "/bin/bash", "-c", "pnpm dev"]

