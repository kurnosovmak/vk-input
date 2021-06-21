<template>
  <div class="emoji" @click="emojiClick" >{{emoji}}</div>
</template>

<script>
export default {
  name: "Emodji",
  props:{
    emoji: {
      // type: Object,
      required: true
    },
  },
  methods:{
    emojiClick(){

      this.$emit('emoji-click',this.emoji)
    }
  }
}
</script>

<style scoped>

.emoji{
  cursor: pointer;
  display: inline-block;
  width: 22px;
  height: 22px;
  margin: 5px;
  font-size: 16px;
  box-sizing: border-box;
  text-align: center;
  vertical-align: center;
}
.emoji:hover{
  background-color: #d3d8e0;
  border-radius: 4px;
}

</style>