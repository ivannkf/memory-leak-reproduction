# Memory leak reproduction

```
npm install
npm run build
node --trace-gc --inspect --max-old-space-size=600  --loader ts-node/esm server/index.ts
```

To stress test it
```
autocannon --duration 50 http://localhost:8082/en
````
