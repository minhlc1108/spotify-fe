import { SVGProps } from "react";

export function MusicFolderSong(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 14 14"
      width="1em"
      height="1em"
      {...props}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4.645 11a.88.88 0 1 0 0-1.759a.88.88 0 0 0 0 1.76Zm3.957-1.099a.88.88 0 1 0 0-1.76a.88.88 0 0 0 0 1.76"></path>
        <path d="M5.525 10.12V6.339l3.957-.932v3.616"></path>
        <path d="M.5 12.25V1.75a1 1 0 0 1 1-1h3.69a1 1 0 0 1 1 .76l.31 1.24h6a1 1 0 0 1 1 1v8.5a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1"></path>
      </g>
    </svg>
  )
}
