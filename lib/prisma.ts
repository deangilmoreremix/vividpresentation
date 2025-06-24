import { PrismaClient } from '@prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
}

export const client = globalThis.prisma || new PrismaClient().$extends(withAccelerate())

if (process.env.NODE_ENV !== 'production') globalThis.prisma = client as any