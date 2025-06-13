import { Input } from "../ui/input"
import { Search as SearchIcon } from "lucide-react"

const Search = () => {
  return (
    <div className="flex">
         <div className="relative w-[20vw]">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search markets"
            className="pl-10 bg-gray-800 border-2 rounded-full text-gray-300 
            placeholder-gray-400 border-none focus:border-none"
          />
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">/</span>
        </div>
    </div>
  )
}

export default Search