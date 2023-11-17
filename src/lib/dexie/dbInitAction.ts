// src/lib/dexie/dbInitAction.ts
import { db } from "./db";
import { initializeSampleData } from "./dbInitSampleData";

export const dbInitAction = () => {
    db.open()
      .then(() => {
        initializeSampleData().catch((err) => {
          console.error(`Failed to initialize sample data: ${err.stack}`);
        });
      })
      .catch((err) => {
        console.error(`Open failed: ${err.stack}`);
      });
};
