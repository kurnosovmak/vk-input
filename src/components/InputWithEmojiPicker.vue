<template>
  <EmojiPicker @emoji-click="emojiClick" v-if="showEmojiPicker"/>
  <!--  <TextAria :text="text" @input:text="text = $event"  @emoji-btn-click="emojiBtnClick"  />-->
  <img class="pre-right-icon" src="@/assets/icons/smile.svg" @click="emojiBtnClick"
       data-title="Tab для быстрого доступа"/>
  <textarea @keydown.enter.exact.prevent @keyup.enter.exact="enter" @keydown.tab.exact.prevent @keyup.tab.exact="tab"
            placeholder="Ваше сообщение" v-model="text" ref="textarea" @input="updateText($event.target.text)"
            rows="1"></textarea>
</template>

<script>

import EmojiPicker from "@/components/input/EmojiPicker";

export default {
  name: "InputWithEmojiPicker",
  mounted() {
    this.updateText();
  },
  emits: ["submit-input"],
  data() {
    return {
      showEmojiPicker: false,
      text: ""
    };
  },
  methods: {

    tab() {
      this.showEmojiPicker = !this.showEmojiPicker
    },
    enter() {
      if (this.text != "") {
        this.$emit('submit-input', this.text)
        this.text = ""
        this.$refs.textarea.text = ""
        this.updateText()
      }
    },

    emojiBtnClick() {
      this.showEmojiPicker = !this.showEmojiPicker;
    },

    emojiClick(emoji) {
      this.text += emoji
      this.updateText()
    },

    updateText() {

      var paddings = 9 + 9
      var lineHeight = 18

      var countLines = (this.$refs.textarea.scrollHeight - paddings) / lineHeight

      if (countLines <= 12 && this.text != "") {
        this.$refs.textarea.style.height = "auto";
        this.$refs.textarea.setAttribute(
            "style",
            "height:" + (this.$refs.textarea.scrollHeight ) + "px;overflow-y:hidden;"
        );
      } else if(this.text != ""){
        this.$refs.textarea.style.height = "auto";
        this.$refs.textarea.setAttribute(
            "style",
            "height:" + (12 * 18 + paddings) + "px;"
        );
      }else{
        this.$refs.textarea.style.height = "auto";
        this.$refs.textarea.setAttribute(
            "style",
            "height:" + (36) +"px;overflow-y:hidden;"
        );
      }

    },
  },
  components: {EmojiPicker}
}
</script>

<style scoped>

.pre-right-icon {
  display: inline;
  position: relative;
  top: 34px;
  left: calc(100% - 30px);
}


textarea {
  width: 100%;
  resize: none;
  border-color: #C5D0DB;
  border-radius: 4px;
  padding: 9px;
  padding-right: 27px;
  box-sizing: border-box;
  height: 36px;
  color: #000000;
  font-size: 13px;
  line-height: 18px;

}


textarea:focus {
  outline: none !important;
  border-color: #a6b8c6;
}
</style>