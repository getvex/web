module.exports = {
    apps: [
        {
            name: "vex",
            script: "build/index.js",
            watch: ["build/index.js"],
            watch_delay: 15000,
            env: {
                NODE_ENV: "production",
                HOST: "0.0.0.0",
                ORIGIN: "https://vex.bizo.dev",
                PORT: 4070
            }
        }
    ]
}
