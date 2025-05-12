import { getGyomuKeirekiExcelExcelPost } from '@/client';
import { Button } from '@chakra-ui/react';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/page3')({
    component: RouteComponent,
})

function RouteComponent() {
    const handleDownload = async () => {
        try {
            const res = await getGyomuKeirekiExcelExcelPost({ responseType: 'blob' })
            console.log(res);
            console.log(res.data)
            const url = window.URL.createObjectURL(res.data as Blob);


            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', '業務履歴一覧.xlsx');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('下载失败:', error);
        }
    };
    return <Button marginRight={"5px"} onClick={() => handleDownload()}>ﾃﾞｰﾀ出力</Button>
}
