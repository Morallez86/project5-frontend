import React from 'react'

function SearchChatRows() {
  return (
    <div
    className="flex flex-row py-4 px-2 justify-center items-center border-b-2"
    >
    <div className="w-1/4">
        <img
        src="https://source.unsplash.com/_7LbC5J-jw4/600x600"
        className="object-cover h-12 w-12 rounded-full"
        alt=""
        />
    </div>
    <div className="w-full">
                    <div className="text-lg font-semibold">Luis1994</div>
        <span className="text-gray-500">Pick me at 9:00 Am</span>
    </div>
    </div>
  )
}

export default SearchChatRows