import { sleep } from "k6";
import http from "k6/http";

export const options = {
  stages: [
    { duration: "0.25s", target: 200, rps: 1000 },
    { duration: "0.25", target: 500, rps: 1000 },
    { duration: "0.5", target: 1000, rps: 1000 },
  ],
  ext: {
    loadimpact: {
      distribution: {
        "amazon:us:palo alto": {
          loadZone: "amazon:us:palo alto",
          percent: 100,
        },
      },
    },
  },
  thresholds: { http_req_duration: ["p(90)<=10000"] },
};

let id = 9000000;

export default function main() {
  let response;

  response = http.get(`http://localhost:4000/${id}`);

  // Automatically added sleep
  sleep(1);
}

