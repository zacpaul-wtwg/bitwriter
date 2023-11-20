// src/lib/dexie/dbInitAction.ts
import { initializeSampleData } from "./dbInitSampleData";

export const dbInitAction = () => {
  initializeSampleData()
    .catch((err) => {
      console.error(`Failed to initialize sample data: ${err.stack}`);
    });
};
