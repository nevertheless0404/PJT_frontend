<script>
import axios from 'axios'

export default {
  created() {
    const code = this.$route.query.code
    axios.get(`http://localhost:8000/api/accounts/v1/google/callback/?code=${code}`)
    .then(res => {
        localStorage.setItem('access_token', res.data.access_token)
        localStorage.setItem('refresh_token', res.data.refresh_token)
        this.$store.dispatch('user', response.data.user)
      })
  }
}
</script>