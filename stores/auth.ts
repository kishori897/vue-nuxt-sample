import { defineStore } from "pinia"

export const useAuthStore = defineStore(
  "auth",
  () => {
    const token = ref<string | null>(null)
    const applicationID = ref<string | null>(null)
    const user = ref<unknown | null>(null)
    const onWithdraw = ref(false)
    const started = ref(false)
    const deadline = ref(null)
    const loading = ref(true)
    const testLink = ref("")
    const companyLogo = ref(null)
    const callback_url = ref("")

    function getCredentials() {
      return {
        token: token.value,
        applicationID: applicationID.value,
      }
    }

    function setCredentials(newToken: string, newApplicationID: string) {
      token.value = newToken
      applicationID.value = newApplicationID
    }

    function setUser(newUser: unknown) {
      user.value = newUser
    }

    return {
      token,
      applicationID,
      user,
      started,
      loading,
      testLink,
      companyLogo,
      callback_url,
      deadline,
      onWithdraw,
      getCredentials,
      setCredentials,
      setUser,
    }
  },
  {
    persist: {
      storage: persistedState.sessionStorage,
    },
  },
)
