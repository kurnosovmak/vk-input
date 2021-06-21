<template>
  <div style="margin-bottom: -20px;">
    <div class="container" style="margin-bottom: -20px;">
      <div class="tab-content" ref="emojiTab" id="myTabContent" @scroll="sckrollHandler">
        <div class="fade" :class="{ 'active show': isActiveTab('Home') }" id="home">
          <div v-if="emojiA !='undefined'">
            <div v-for="(item, index) in emojiA" :key="index">
              <h3>{{ item.title }}</h3>
              <Emodji @emoji-click="emojiClick" v-for="(item, index2) in emojiA[index].items" :key="index2"
                      :emoji="item"/>
            </div>
          </div>
        </div>
        <div class="fade" :class="{ 'active show': isActiveTab('Second') }" id="profile">
          <h3>Часто используемые</h3>
          <div v-if="emojiOffen.length >=1">
            <Emodji @emoji-click="emojiClickOffen" v-for="index in (emojiOffen.length)" :key="index"
                    :emoji="emojiOffen[emojiOffen.length-index]"/>
          </div>
        </div>
      </div>
      <ul class="tabs">
        <li class="nav-item" @click="setActiveTab('Home')" :class="{ active: isActiveTab('Home') }">
          <img width="24" height="24" src="@/assets/icons/emodji/smile.svg">
        </li>
        <li class="nav-item" @click="setActiveTab('Second')" :class="{ active: isActiveTab('Second') }">
          <img width="24" height="24" src="@/assets/icons/emodji/timer.svg">
        </li>
      </ul>

    </div>
    <img class="after-right-icon" src="@/assets/icons/arrou.svg" @click="emojiBtnClick">
  </div>
</template>

<script>
import Emodji from "@/components/input/Emoji";
import EmojiService from "@/api/EmojiService";

export default {
  name: "EmojiPicker",
  components: {Emodji},
  emits: ["emoji-click"],
  data() {
    return {
      activeItem: 'Home',
      emojiA: [],
      emojiOffen: [],

      page: 0,
      errored: false,
      loading: false
    };
  },
  mounted() {
    if (localStorage.emojiOffen) {

      this.emojiOffen = JSON.parse(localStorage.emojiOffen);
    }

    this.getEmojis()


  },
  methods: {

    saveEmojiOffen(){
      localStorage.emojiOffen = JSON.stringify(this.emojiOffen);
    },

    sckrollHandler() {
    },

    emojiClickOffen(emoji) {
      this.$emit('emoji-click', emoji)
    },
    emojiClick(emoji) {

      let index = this.emojiOffen.findIndex(item => item === emoji);
      // if emoji is exit
      if (index != -1) {
        this.emojiOffen.splice(index, 1)
        this.emojiOffen.push(emoji)
      } else {
        // if emoji is not exit
        if (this.emojiOffen.length <= 25) {
          this.emojiOffen.push(emoji)
        } else {
          this.emojiOffen.splice(0, 1)
          this.emojiOffen.push(emoji)
        }
      }
      this.saveEmojiOffen()
      this.$emit('emoji-click', emoji)
    },

    async getEmojis() {
      if (this.loading != true) {
        this.loading = true
        const emojis = await EmojiService.getAllEmoji()
            .catch((err) => {
              console.log(err)
              this.errored = true
            })
            .finally(() => {
              this.loading = false
            })

        if (typeof emojis === 'undefined') {
          this.loading = false
          console.log("error")
          return
        }


        // console.log(emojis.data)
        if (emojis.data.length != 0) {
          this.emojiA = emojis.data;


        } else {
          this.errored = true
          console.log("error")
        }
        this.loading = false
      }

    },

    isActiveTab(menuItem) {
      return this.activeItem === menuItem
    },
    setActiveTab(menuItem) {
      this.activeItem = menuItem
    }
  },
}
</script>


<style scoped>


.after-right-icon {
  position: relative;
  bottom: -9px;

  left: calc(100% - 30px);
}

.container {
  margin-left: calc(100% - 290px);
  border-radius: 4px;
  max-width: 290px;
  border: #C5D0DB 1px solid;
}


.tab-content {

  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  padding: 10px 6px 7px 4px;
  box-sizing: border-box;
  height: 300px;
  overflow-y: scroll
}

h3 {
  padding: 0;
  margin: 0;
  margin-left: 5px;
  color: #939393;
  font-size: 13px;
}


.tabs {
  background-color: #EDEEF0;
  height: 36px;
  padding: 0;
  margin: 0;
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;

}

.tabs li {
  display: inline-block;
  width: 36px;
  height: 36px;
  padding: 6px;
  box-sizing: border-box;


}

.tabs li:first-child {
  border-bottom-left-radius: 4px;
}

.tabs li:last-child {
  border-bottom-right-radius: 4px;
}

.tabs li .active {
  background-color: #FFFFFF;
}

.active {
  background-color: #FFFFFF;
}

.fade {
  display: none;
}

.show {
  display: block;
}
</style>