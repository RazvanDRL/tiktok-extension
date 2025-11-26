import { useEffect, useState } from "react"
import { Storage } from "@plasmohq/storage"
import { Button } from "~components/ui/button"
import AuthForm from "~components/AuthForm"
import useFirebaseUser from "~firebase/useFirebaseUser"

import "~style.css"

const storage = new Storage()
const HIDE_BUTTONS_KEY = "hideContentButtons"

function IndexPopup() {
  const { user, isLoading, onLogout } = useFirebaseUser()
  const [hideButtons, setHideButtons] = useState(false)
  const [settingsLoading, setSettingsLoading] = useState(true)

  useEffect(() => {
    storage.get<boolean>(HIDE_BUTTONS_KEY).then((value) => {
      setHideButtons(value ?? false)
      setSettingsLoading(false)
    })
  }, [])

  const toggleHideButtons = async () => {
    const newValue = !hideButtons
    setHideButtons(newValue)
    await storage.set(HIDE_BUTTONS_KEY, newValue)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-16 w-80 p-4 bg-slate-900 text-slate-100">
      {isLoading && (
        <div className="flex items-center justify-center h-16">
          <span className="text-sm text-slate-300">Checking session...</span>
        </div>
      )}
      {!isLoading && !user && <AuthForm />}
      {!isLoading && user && (
        <div className="w-full space-y-3">
          <div>
            <p className="text-base font-semibold text-slate-100">
              Signed in as
            </p>
            <p className="text-sm text-slate-200">
              {/* {user.displayName ? user.displayName : "Unnamed"} */}
            </p>
            <p className="text-xs text-slate-400">
              {user.email ?? "No email"}
            </p>
          </div>

          <div className="flex items-center justify-between py-2 border-t border-slate-700">
            <label htmlFor="hide-buttons" className="text-sm text-slate-300 cursor-pointer">
              Hide buttons
            </label>
            <button
              id="hide-buttons"
              role="switch"
              aria-checked={hideButtons}
              disabled={settingsLoading}
              onClick={toggleHideButtons}
              className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-slate-900 ${hideButtons ? "bg-emerald-500" : "bg-slate-600"
                } ${settingsLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${hideButtons ? "translate-x-4" : "translate-x-0.5"
                  }`}
              />
            </button>
          </div>

          <Button
            onClick={onLogout}
            variant="outline"
            className="w-full text-sm h-8 bg-slate-800 text-slate-200 hover:bg-slate-700 border-slate-700">
            Sign out
          </Button>
        </div>
      )}
    </div>
  )
}

export default IndexPopup
