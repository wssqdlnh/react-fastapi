import { getGyomuKeirekiExcelExcelPost } from '@/client';
import { Button } from '@chakra-ui/react';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/page3')({
    component: RouteComponent,
})

function RouteComponent() {
    const handleDownload = async () => {
        try {
            const res: any = await getGyomuKeirekiExcelExcelPost({ responseType: 'blob' })
            const headers = res.headers;
            const url = window.URL.createObjectURL(res.data as Blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', headers.get('content-disposition').split('filename=')[1]);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('下载失败:', error);
        }
    };
    return <Button marginRight={"5px"} onClick={() => handleDownload()}>ﾃﾞｰﾀ出力</Button>
}