import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';

interface FileDownloaderProps {
    url: string,
    filename: string,
    asButton?: boolean
    buttonText?: string,
    disabled?: boolean
}
function FileDownloader({
    url,
    filename,
    asButton = false,
    disabled = false,
    buttonText = 'Download'
}: FileDownloaderProps) {
    const [fileData, setFileData] = useState<any>(null);
    const [loading, setLoading] = useState(false)

    const handleDownload = async () => {
        if (url) {
            setLoading(true)
            try {
                const response = await axios.get(`/api/download-v2?url=${url}`, {
                    responseType: 'blob'
                });
                const blobUrl = window.URL.createObjectURL(response.data);
                setFileData({ blobUrl, filename: filename });

                var a = document.createElement('a');
                a.download = filename;
                a.href = blobUrl;
                document.body.appendChild(a);
                a.click();
                a.remove();

            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            } finally {
                setLoading(true)
            }
        }
    };

    useEffect(() => {
        return () => {
            // Cleanup function
            if (fileData) {
                window.URL.revokeObjectURL(fileData.blobUrl);
            }
        };
    }, [fileData]);
    if (!asButton) {
        return (
            <a href={disabled ? "#" : url} target="_blank" rel="noopener noreferrer" className='p-2 underline'>
                Download
            </a>
        )
    }
    return (
        <a href={disabled ? "#" : url} target="_blank" rel="noopener noreferrer" className='transparent max-lg:w-full'>
            <Button
                type='button'
                // loading={loading}
                // onClick={handleDownload}
                disabled={disabled}
                className='not-disabled:cursor-pointer bg-green-600 disabled:bg-green-700 hover:bg-green-700 max-lg:w-full' >
                {buttonText}
            </Button>
        </a>
    )
}

export default FileDownloader;