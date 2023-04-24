"use client"
import Link from 'next/link';
import { useSearchParams } from "next/navigation";


interface Props {
  text: string;
  queryParam: {[key: string]: string}
}

export const SideBarLink: React.FunctionComponent<Props> = ({ text, queryParam }) => {
  const queryParams = useSearchParams();
  const currentQueries = Object.fromEntries(queryParams.entries())

  return (
    <Link 
      href={{ pathname: 'search', query: {...currentQueries, ...queryParam}}} 
      className="font-light text-reg capitalize block"
      >
      {text}
    </Link>
  )
}
