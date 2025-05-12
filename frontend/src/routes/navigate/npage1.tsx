import { Button } from '@chakra-ui/react'
import { createFileRoute, Link, useRouter } from '@tanstack/react-router'

export const Route = createFileRoute('/navigate/npage1')({
    component: RouteComponent,

    // 元の検索パラメータの解析,戻りタイプはルータの残りの部分に推定されます
    validateSearch: (param: { data: { name: string, age: number } }) => {
        console.log("validateSearch" + JSON.stringify(param))
        return {
            data: {
                name: param.data.name as string || '',
                age: param.data.age as number || 0,
            }
        }
    },

    // loaderDepsに含まれる検索属性が変化した場合にloaderを実行する
    loaderDeps: ({ search }) => (
        {
            name: search.data.name,
            age: search.data.age
        }
    ),

    // コンポーネントをレンダリングする前にデータをロードする
    loader: ({ deps }) => {
        return {
            name: deps.name,
            age: deps.age
        }
    },
    errorComponent: () => <div>error</div>,
    pendingComponent: () => <div>pending</div>,
    staleTime: 1000 * 60 * 5,

})

function RouteComponent() {
    const data = Route.useLoaderData()
    const router = useRouter()
    return (<>
        <Link to='/page1'>戻る</Link>
        <Button onClick={() => {
            router.invalidate({
                filter(d) {
                    console.log(d)
                    return d.fullPath == Route.fullPath
                },
            })
        }}>reroad</Button>
        <h1>name:{data.name}, age:{data.age}</h1>
    </>)
}

