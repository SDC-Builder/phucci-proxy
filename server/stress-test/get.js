import { sleep } from "k6";
import http from "k6/http";

export const options = {
  stages: [
    { duration: "1s", target: 1000, rps: 1000 },
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

  response = http.get(`http://localhost:4000/${id + __VU}`);

  // Automatically added sleep
  sleep(1);
}

