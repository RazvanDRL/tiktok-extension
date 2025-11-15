import { useReducer } from "react"
import { Download } from "lucide-react"

export const CountButton = () => {
  const [count, increase] = useReducer((c) => c + 1, 0)

  return (
    <button type="button" className="flex items-center justify-center w-12 h-12 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-800 hover:text-slate-900">
      <Download className="w-6 h-6" />
    </button>
  )
}
