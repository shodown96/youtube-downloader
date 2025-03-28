import ytdl from "@distube/ytdl-core";
import "server-only";
// import { Agent } from "undici"
import { ipv4 } from 'generate-ip';
// https://www.npmjs.com/package/generate-ip
// Example list of IPv6 addresses
const ipv6Addresses = [
    "2001:2::1",
    "2001:2::2",
    "2001:2::3"
];

let ipIndex = 0;

function getNextIPv6() {
    // Rotate through the available IPs
    const ip = ipv6Addresses[ipIndex];
    ipIndex = (ipIndex + 1) % ipv6Addresses.length;
    return ip;
}

export function createAgentWithRotatingIP() {
    // const agentForARandomIP = ytdl.createAgent(undefined, {
    //     localAddress: getRandomIPv6("2001:2::/48"),
    //   });
    const agentForARandomIP = ytdl.createAgent(undefined, {
        localAddress: ipv4.generate(),
    });
    return agentForARandomIP

    // return new Agent({
    //     localAddress: getNextIPv6()
    // });
}