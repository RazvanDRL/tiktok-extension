import { Button } from "~components/ui/button"
import AuthForm from "~components/AuthForm"
import useFirebaseUser from "~firebase/useFirebaseUser"

import "~style.css"

function IndexPopup() {
  const { user, isLoading, onLogout } = useFirebaseUser()

  return (
    <div className="flex flex-col items-center justify-center min-h-16 w-80 p-4 bg-slate-900 text-slate-100">
      {isLoading && (
        <div className="flex items-center justify-center h-16">
          <span className="text-sm text-slate-300">Checking session...</span>
        </div>
      )}
      {!isLoading && !user && <AuthForm />}
      {!isLoading && user && (
        <div className="w-full space-y-2">
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
