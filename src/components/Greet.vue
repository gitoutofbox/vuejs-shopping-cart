<template>
  <div class="text-center">{{greet}}</div>
</template>

<script>
export default {
  name: "Greet",
  created() {
    this.greet = this.messages[Math.floor(Math.random() * this.messages.length)];
  },
  data() {
    return {
      greet: "",
      messages: [
        "I was just thinking about you!",
        "You are a great example for others.",
        "You have great ideas.",
        "When I grow up I want to be you!",
        "I appreciate all of your opinions.",
      ],
    };
  },
};
</script>