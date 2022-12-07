<template>
  <a :href="GOOGLE_AUTH_URL">Google Login</a>
</template>

<script>
  const BASE_URL = 'http://localhost:8080/'
  const GOOGLE_CALLBACK_URI = BASE_URL + 'google/callback/'
  const SOCIAL_AUTH_GOOGLE_CLIENT_ID = '409441996370-7iii74jatbk3hkgnortm3ol157oq9k4f.apps.googleusercontent.com'
  const scope = "https://www.googleapis.com/auth/userinfo.email"

  export default {
  data() {
    return {
      GOOGLE_AUTH_URL: `https://accounts.google.com/o/oauth2/v2/auth?client_id=${SOCIAL_AUTH_GOOGLE_CLIENT_ID}&response_type=code&redirect_uri=${GOOGLE_CALLBACK_URI}&scope=${scope}`
    }
  },
  // created() {
  //   setTimeout(() => {
  //     window.location.href = 'http://localhost:8080'
  //   }, 3000);
  // }
}
</script>