import AuthForm from "~components/AuthForm"
import { CountButton } from "~features/count-button"
import useFirebaseUser from "~firebase/useFirebaseUser"

import "~style.css"

function IndexPopup() {
  const { user, isLoading } = useFirebaseUser()

  return (
    <div className="flex flex-col items-center justify-center min-h-16 w-80 p-4">
      {isLoading && (
        <div className="flex items-center justify-center h-16">
          <span className="text-sm text-slate-700">Checking session...</span>
        </div>
      )}
      {!isLoading && !user && <AuthForm />}
      {!isLoading && user && (
        <div className="w-full">
          <p className="text-base font-semibold text-slate-900">
            Signed in as
          </p>
          <p className="text-sm text-slate-800">
            {/* {user.displayName ? user.displayName : "Unnamed"} */}
          </p>
          <p className="text-xs text-slate-600">
            {user.email ?? "No email"}
          </p>
        </div>
      )}
    </div>
  )
}

export default IndexPopup
