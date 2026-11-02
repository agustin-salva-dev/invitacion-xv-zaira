/**
 * Singleton de Prisma Client para Next.js.
 * Previene múltiples instancias de conexión en desarrollo con Hot Reloading.
 * En producción, siempre crea una única instancia.
 */

import { PrismaClient } from "@prisma/client";

// Declaración global para que TypeScript reconozca la variable en el objeto global
declare global {
  var __prismaClient: PrismaClient | undefined;
}

function createPrismaClient(): PrismaClient {
  return new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["error", "warn"]
        : ["error"],
  });
}

// En desarrollo: reutiliza la instancia global para evitar agotamiento del pool de conexiones.
// En producción: crea una instancia nueva del módulo (singleton natural de Node.js).
const prisma: PrismaClient =
  process.env.NODE_ENV === "production"
    ? createPrismaClient()
    : (globalThis.__prismaClient ?? (globalThis.__prismaClient = createPrismaClient()));

export { prisma };

