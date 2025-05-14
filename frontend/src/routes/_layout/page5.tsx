import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

export const Route = createFileRoute('/_layout/page5')({
    component: RouteComponent,
})

function RouteComponent() {
    const userSchema = z.object({
        name: z.string().nonempty(),
        age: z.union([z.number(), z.undefined()]).refine(val => !!val, { message: "必須項目です" }),
        kls: z.array(z.string())
    })
    try {
        const user = userSchema.parse({ name: "1", kls: ['a', 'b'] })
        console.log(user)
    }
    catch (e) {
        console.log(e)
    }
    return <div>Hello "/_layout/page5"!</div>
}
