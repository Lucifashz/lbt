import React from "react"


export default function TableMatchList(props) {
   return (
      <div className="flex w-full flex-col gap-12">
         {props.children}
      </div>
   )
}
