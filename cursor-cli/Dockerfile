FROM ubuntu:26.04

RUN apt-get update && apt-get install -y \
    curl \
    git \
    bash \
    build-essential \
    ca-certificates \
    jq \
    && rm -rf /var/lib/apt/lists/*

# Install Cursor CLI (cursor-agent)
# The official installation script places binaries under ~/.local/bin
RUN curl https://cursor.com/install -fsS | bash

# Add Cursor CLI to PATH (usually installed at ~/.local/bin)
ENV PATH="/root/.local/bin:$PATH"

# Install NVM (Node Version Manager) and a default Node.js version
ENV NVM_VERSION="0.40.8"
ENV NVM_DIR="${HOME:-/root}/.nvm"
ENV NODE_VERSION="24.21.0"

# Download and install nvm
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v${NVM_VERSION}/install.sh | bash

# install node
RUN bash -c "source $NVM_DIR/nvm.sh && nvm install $NODE_VERSION"

RUN git clone https://github.com/langfuse/cursor-observability-plugin /root/.cursor/plugins/local/langfuse-observability
#RUN bash -c "source $NVM_DIR/nvm.sh && npm install -g /root/.cursor/plugins/local/langfuse-observability"

COPY setup-langfuse-plugin.sh /usr/local/bin/setup-langfuse-plugin.sh
RUN chmod u+x /usr/local/bin/setup-langfuse-plugin.sh
COPY langfuse.default.json /root/.cursor/langfuse.default.json

# Set a working directory
WORKDIR /my-project

# Default command to verify installations
CMD ["bash"]