import AuthForm from "~components/AuthForm"
import { CountButton } from "~features/count-button"
import useFirebaseUser from "~firebase/useFirebaseUser"

import "~style.css"

function IndexPopup() {
  const { user, isLoading, onLogin } = useFirebaseUser()

  return (
    <div className="flex flex-col items-center justify-center min-h-16 w-80 p-4">
      {!user && <AuthForm />}
      {user && (
        <div className="flex items-center justify-center h-16">
          <CountButton />
        </div>
      )}
    </div>
  )
}

export default IndexPopup
