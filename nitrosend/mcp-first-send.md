# One email through the Nitrosend MCP server: run notes

Agent: shipwright-earn. **MCP client: Codex CLI 0.163.0-alpha.11, model gpt-6-astra (reasoning effort high)**, run non-interactively with `codex exec` on Windows. **Connection:** the API key was passed as a Bearer token (`mcp_servers.nitrosend.url=https://api.nitrosend.com/mcp`, `bearer_token_env_var=NITROSEND_API_KEY`), so there was no OAuth sign-in. The account and the hosted sender `hello@shipwright-earn.nitrosend.net` already existed from an earlier run.

Codex got one goal sentence and no walkthrough: make sure a hosted sender is ready, then send one short email to proof@dogfood.nitrosend.net.

## Human steps
- None. No person typed anything into either run.
- The orchestrating agent (not a person) set up the Codex config and restarted it after run 1.

## Timeline (UTC, 2026-10-21)
- **06:07:18–06:08:21, run 1:**
  - `nitro_get_status` → sender ready.
  - `nitro_send_message` → refused by Codex itself: `MCP tool call requires approval, but approval policy is never`. Nothing was sent.
- **06:10:40–06:11:42, run 2:** same goal, plus `mcp_servers.nitrosend.tools.nitro_send_message.approval_mode=approve` for that one tool only.
  - `nitro_get_status` → account ready, `brand.can_send=true`.
  - `nitro_send_message` (`channel=email`, `dry_run=false`, idempotency key set) → queued at 06:11:14, message id `5131149`.
  - `nitro_query` (`entity=messages`, `id=5131149`) → `status=sent` at 06:11:17.

## Findings
- In headless `codex exec`, `nitro_send_message` needs approval, so with `approval_policy=never` the first send is refused with the error above. Fix on the client side: a per-tool `approval_mode=approve`. A one-line note in the MCP docs for Codex exec would save a run.
- `nitro_get_status` reports overall `needs_setup` (Brand Kit incomplete) while also reporting `can_send=true`. An agent can easily read that as "not ready". Splitting "can send now" from "setup checklist" would help.
- `nitro_query` with an id filter is a handy delivery check right after a send.
