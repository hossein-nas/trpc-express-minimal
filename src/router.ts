import { initTRPC } from '@trpc/server';
import { z } from 'zod';

const t = initTRPC.create();

const publicProcedure = t.procedure;
const router = t.router;

const helloRouter = router({
  greeting: publicProcedure
    .input(z.object({ name: z.string() }).nullish())
    .query(({ input }) => {
      return `Hello ${input?.name ?? 'World'}`;
    }),
    sum: publicProcedure.input(
      z.object({
        a: z.number(),
        b: z.number()
      })
    )
    .query(({input}) => {
      const {a, b} = input
      return a + b
    })
});

export const appRouter = router({
  hello: helloRouter,
});

export type AppRouter = typeof appRouter;
