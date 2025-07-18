import mongoose from 'mongoose';
import { config } from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
console.log(__filename);
const __dirname = path.dirname(__filename);

config({ path: path.join(__dirname, '.env') });

console.log("🔌 Connecting to:", process.env.MONGO_URI);

try {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("✅ MongoDB connected!");
  process.exit(0); // Clean exit
} catch (error) {
  console.error("❌ MongoDB connection failed:", error.message);
  process.exit(1); // Exit with error
}
