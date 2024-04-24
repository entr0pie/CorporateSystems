import "dotenv/config";
import { z } from 'zod';

const envSchema = z.object({
    DATABASE_NAME: z.string(),
    DATABASE_USERNAME: z.string(),
    DATABASE_PASSWORD: z.string(),
    DATABASE_HOST: z.string(),
    BCRYPT_SALT_ROUNDS: z.preprocess(x => parseInt(x), z.number().nonnegative()),
    JWT_SECRET:z.string(),
});

export const env = envSchema.parse(process.env);