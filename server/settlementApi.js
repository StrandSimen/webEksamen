import express from "express";

export const settlementApi = express.Router();

const sampleSettlements = [
  { id: 0, department: "furniture", balance: { "1000kr": 3, "200kr": 80 } },
  { id: 1, department: "cafeteria", balance: { "1000kr": 50, "50kr": 60 } },
];

function timeout(millis) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, millis);
  });
}

settlementApi.get("/api/settlements", async (req, res) => {
  await timeout(1500);
  res.json(sampleSettlements);
});
