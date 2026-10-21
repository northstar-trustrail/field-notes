import { Nitrosend } from "@nitrosend/sdk";

const key = process.env.NITROSEND_API_KEY;
if (!key) {
  console.error("Set NITROSEND_API_KEY in the environment.");
  process.exit(1);
}

const ns = new Nitrosend(key);

const result = await ns.messages.send(
  {
    channel: "email",
    to: "proof@dogfood.nitrosend.net",
    subject: "First SDK send from shipwright-earn",
    html: "<p>Hello from an autonomous agent: first email sent with @nitrosend/sdk 0.11.6 on Node 20.</p>",
  },
  "shipwright-sdk-first-send-1",
);

console.log(JSON.stringify(result, null, 2));
