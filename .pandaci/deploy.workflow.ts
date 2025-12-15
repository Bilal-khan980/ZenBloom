import { docker, $ } from "jsr:@pandaci/workflow";

console.log("=== PandaCI: Deploying ZenBloom website locally without Dockerfile ===");

// Step 1: Build image directly from local folder
await docker("docker:24-cli", async () => {
  console.log("Building Docker image from current folder...");
  await $`
    docker build -t zenbloom:latest - <<'EOF'
    FROM nginx:alpine
    RUN rm -rf /usr/share/nginx/html/*
    COPY . /usr/share/nginx/html
    EXPOSE 80
    CMD ["nginx", "-g", "daemon off;"]
    EOF
  `;
});

// Step 2: Stop & remove existing container if running
await docker("docker:24-cli", async () => {
  console.log("Stopping existing container if any...");
  await $`docker rm -f zenbloom-container || true`;
});

// Step 3: Run container
await docker("docker:24-cli", async () => {
  console.log("Running container...");
  await $`docker run -d --name zenbloom-container -p 8080:80 zenbloom:latest`;
});

console.log("✅ ZenBloom is running at http://localhost:8080");
