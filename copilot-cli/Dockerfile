FROM ubuntu:26.04

RUN apt-get update && apt-get install -y \
    curl \
    git \
    bash \
    build-essential \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

    # Install NVM (Node Version Manager) and a default Node.js version
ENV NVM_VERSION="0.40.8"
ENV NVM_DIR="${HOME:-/root}/.nvm"
ENV NODE_VERSION="24.21.0"

# Download and install nvm
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v${NVM_VERSION}/install.sh | bash

# install node
RUN bash -c "source $NVM_DIR/nvm.sh && nvm install $NODE_VERSION"

RUN bash -c "source $NVM_DIR/nvm.sh && npm install -g @github/copilot"

COPY setup-copilot-cli.sh /usr/local/bin/setup-copilot-cli.sh
RUN chmod u+x /usr/local/bin/setup-copilot-cli.sh

# Set a working directory
WORKDIR /my-project

#ENTRYPOINT ["bash", "-c", "entrypoint.sh"]
# Default command to verify installations
CMD ["bash"]