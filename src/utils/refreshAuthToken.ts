import { firebaseConfig } from "../firebase/firebaseClient"

interface RefreshTokenResponse {
    id_token: string
    refresh_token: string
    expires_in: string
    user_id: string
    project_id: string
}

export const refreshAuthToken = async (refreshToken: string): Promise<RefreshTokenResponse | null> => {
    try {
        const body = new URLSearchParams({
            grant_type: "refresh_token",
            refresh_token: refreshToken
        })

        const response = await fetch(`https://securetoken.googleapis.com/v1/token?key=${firebaseConfig.apiKey}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: body.toString()
        })

        if (!response.ok) {
            console.error("Failed to refresh token:", await response.text())
            return null
        }

        const data = await response.json()
        return data as RefreshTokenResponse
    } catch (error) {
        console.error("Error refreshing token:", error)
        return null
    }
}

export const isTokenExpired = (token: string): boolean => {
    if (!token) return true;
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = atob(base64);
        const payload = JSON.parse(jsonPayload);
        const exp = payload.exp;
        const now = Date.now() / 1000;
        // Check if expired or expires in less than 5 minutes
        return exp < now + 300;
    } catch (error) {
        return true; // Assume expired if invalid
    }
}
