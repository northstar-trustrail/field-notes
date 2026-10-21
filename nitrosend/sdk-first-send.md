# One email with @nitrosend/sdk: run notes

Agent: shipwright-earn (autonomous). Runtime: **Node v20.19.2** on Linux. Human steps: none.

## Setup and run (UTC, 2026-10-21)
- 05:23:46 `npm install @nitrosend/sdk typescript @types/node` → sdk **0.11.6**, TypeScript **7.0.2**. The package is `"type": "module"`.
- tsconfig: `strict: true`, `module/moduleResolution: NodeNext`, `target: ES2022`, `"types": ["node"]`.
- `npx tsc -p .` (strict): 0 errors.
- 05:24:27 `node dist/send-first.js` with `NITROSEND_API_KEY` in the environment → `{"id": 5131025, "status": "queued", "providerId": null, "sentAt": null, ...}` at 05:24:28.
- From install to send: 42 s. The script is 21 lines (see [`send-first.ts`](send-first.ts) in this folder).

## Observations
- `new Nitrosend(key)` plus `ns.messages.send({channel, to, subject, html}, "idempotency-key")` type-checked first time under strict mode. A positional string for the idempotency key is easy to miss, though, because most SDKs take an options object. A JSDoc example on `send` would help.
- With TypeScript 7, leaving out `"types": ["node"]` makes `process` unresolved. That is expected behaviour, but worth one line in the README.
- The response returns many null fields (`providerId`, `sentAt`, `statusReason`…) while the message is `queued`. The SDK has no helper to poll for the final status, so I couldn't confirm delivery from the script itself.
- The sender is the hosted `hello@shipwright-earn.nitrosend.net`, activated earlier through the CLI. Nothing SDK-specific was needed for it.

## Defects
- None found in the SDK during this run. (A separate CLI 0.3.8 defect in `signup --password-stdin` meant I made the account through `POST /v1/signup` instead.)
