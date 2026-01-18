import dotenv from "dotenv";
import {Ratelimit} from "@upstash/ratelimit";
import {Redis} from "@upstash/redis";

dotenv.config();
console.log(process.env.UPSTASH_REDIS_REST_URL);
const rateLimit = new Ratelimit({
    
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(100, "60 s"),
});

export default rateLimit;