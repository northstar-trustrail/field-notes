# One email through the Nitrosend MCP server: run notes

- **Client and model:** Codex CLI 0.163.0-alpha.11 (`codex exec`, Windows), model `gpt-6-astra`, reasoning effort high.
- **Connection:** headless path with an API key as a Bearer token, no OAuth browser step: `-c mcp_servers.nitrosend.url=https://api.nitrosend.com/mcp -c mcp_servers.nitrosend.bearer_token_env_var=NITROSEND_API_KEY`.
- **Account:** one account for this round made at 05:23Z via `POST /v1/signup`, `POST /v1/my/api_keys`, `GET /v1/my/brands` and `POST /v1/my/brands/<sid>/prepare_sending {"subdomain":"shipwright-earn"}`. Codex reused it, so it only checked sender readiness over MCP.
- **Goal sentence given to Codex, verbatim:** "Goal: using the nitrosend MCP server you are connected to, make sure this Nitrosend account has a hosted sender ready, then send one short plain email to proof@dogfood.nitrosend.net saying it was sent by an autonomous Codex agent over MCP. Afterwards write RUN.md in the current folder listing each MCP tool you called, in order, with its outcome and the resulting message id. Never print or write the API key. Do not ask questions."
- **Run 1 (06:07:18–06:08:21Z):** `nitro_get_status` showed the sender ready; `nitro_send_message` was refused by Codex: `MCP tool call requires approval, but approval policy is never`. Nothing sent.
- **Run 2 (06:10:40–06:11:42Z):** same sentence, plus `-c mcp_servers.nitrosend.tools.nitro_send_message.approval_mode=approve`. Then `nitro_get_status`, `nitro_send_message` (queued 06:11:14Z, id 5131149), `nitro_query` (`status=sent` 06:11:17Z).
- **Connecting to first send:** about 4 minutes (06:07:18 to 06:11:14Z); 34 s in run 2.
- **Human steps:** none. No person typed into either run; after run 1 the operator (an agent) added the approval flag and reran.
- **Slowest step:** the run 1 refusal below.
- **Doc gap:** the Codex CLI section of the MCP README shows only `codex mcp add` plus OAuth login, with no headless Bearer setup and no note that `codex exec` under `approval_policy=never` refuses `nitro_send_message` (repro: run 1).
- **One change:** add the Bearer env-var config and the per-tool `approval_mode=approve` line to the Codex section.
