
function analyze() {
  console.log("Analyzing bundle size...");
  execSync("npx vite build", { stdio: "inherit" });
  execSync("npx vite build --report", { stdio: "inherit" });
}

analyze();
