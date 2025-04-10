"use client"
import FileDownloader from "@/components/custom/file-downloader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { useDownloadStore, Values } from "@/lib/store";
import { formatTime, getLimitedText, isValidYoutubeURL } from "@/lib/utils";
import axios from "axios";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";

// TODO: PROCESS LARGE DOWNLOADS, COMBINE HIGHEST AUDIOS AND HIGHEST VIDEOS
export default function Home() {
  const {
    values,
    setValues,
    details,
    formats,
    setDetails,
    setFormats
  } = useDownloadStore()

  const [loading, setLoading] = useState(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setValues(({
      [id as keyof Values]: value
    }))
  }

  const onValueChange = (value: string) => {
    console.log(value)
    setValues({ downloadURL: value })
  }

  const handleReset = async () => {
    setValues({
      url: "",
      downloadURL: ""
    })
    setDetails(null)
    setFormats([])
  }

  const getInfo = async () => {
    if (!isValidYoutubeURL(values.url)) {
      toast.error("Please enter a valid youtube URL");
      return
    }

    setLoading(true)
    try {
      const result = await axios.get(`/api/get-info?url=${values.url}`)
      if (result.status === 200) {
        const info = result.data.info
        const formats = result.data.formats
        console.log(result.data)
        setDetails(info.videoDetails)
        setFormats(formats)
      }
    } catch (error) {
      toast.error("Could not get video info. Please check back later.")

    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-between min-h-screen p-20 max-lg:p-10 gap-10">
      <main className="flex flex-col gap-6 sm:w-[500px] lg:w-[700px] flex-1 transition-all">
        <div className="text-center mt-6 lg:mt-20">
          <h1 className="text-3xl font-semibold text-gray-800">YouTube Downloader</h1>
          <p className="text-sm text-gray-500">Still a work in progress, for educational purposes only 🫣</p>
        </div>
        <div className="flex flex-col lg:flex-row gap-4 items-center">
          <Input
            id={"url"}
            value={values.url}
            placeholder="Enter a URL here"
            className="flex-1 p-3 lg:p-5"
            onChange={handleChange} />
          <Button
            className="not-disabled:cursor-pointer min-w-[150px] p-5 max-lg:w-full"
            onClick={getInfo}
            loading={loading}
            disabled={!values.url}>Get info</Button>
        </div>

        {details ? (
          <div className="p-3 border border-gray-300 rounded flex gap-4 lg:flex-row flex-col max-lg:items-center">
            <Image
              alt=""
              width={320}
              height={64}
              objectFit="cover"
              src={details.thumbnails?.[details.thumbnails.length - 1]?.url} />
            <div className="flex flex-col justify-between">
              <div>
                <div>{getLimitedText(details.title)}</div>
                <div className="text-sm text-gray-500 my-1">
                  {formatTime(Number(details.lengthSeconds))}
                </div>
              </div>
              <div className="flex gap-4 flex-wrap items-center">
                <Select onValueChange={onValueChange}>
                  <SelectTrigger className="flex-1 p-3 m-0 rounded" >
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Formats</SelectLabel>
                      {formats.filter(x => x.hasAudio && x.hasVideo).map((v, i) => (
                        <SelectItem
                          key={i}
                          value={v.url}>
                          {v.height} - {v.quality} - {v.container}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {/* <Button>Download</Button> */}
                <FileDownloader
                  asButton
                  url={values.downloadURL}
                  filename={details.title}
                  disabled={!values.downloadURL} />
              </div>
            </div>
          </div>
        ) : null}
        {values.url ? (<Button onClick={handleReset} className="cursor-pointer">Reset</Button>) : null}
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://www.elijahsoladoye.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          <div className="flex gap-2">
            <span>My website</span>
            <ChevronRight />
          </div>
        </a>
      </footer>
    </div>
  );
}



{/* {values.url ? (<Button onClick={handleReset} className="cursor-pointer">
  <RefreshCw />
</Button>) : null} */}
