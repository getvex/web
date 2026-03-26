import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3"
import { PrismaClient } from "@generated/client"
import { DATABASE_URL } from "$env/static/private"

const adapter = new PrismaBetterSqlite3({ url: DATABASE_URL })

export const db = new PrismaClient({
    adapter
})
