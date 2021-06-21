import Api from '@/api/Api'

export default {
  getAllEmoji() {
    return Api().get(`emoji.json`)
  },

}
