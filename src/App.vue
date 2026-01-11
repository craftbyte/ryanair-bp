<script setup lang="ts">
import { ref } from 'vue'
import BoardingPass from './components/BoardingPass.vue'
import type { BoardingPassType } from './types/api'

const data = ref({
  pnr: '',
  email: ''
})
const boardingPasses = ref([] as BoardingPassType[])
const errorText = ref('')

const getBoardingPass = async (event: Event) => {
  event?.preventDefault()
  errorText.value = ''
  const res = await fetch('/boarding-pass', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      recordLocator: data.value.pnr,
      email: data.value.email
    })
  })
  if (!res.ok) {
    switch (res.status) {
      case 400:
        errorText.value = 'Invalid request. Please check your input.'
        break
      case 403:
        errorText.value = 'No booking found with the provided details.'
        break
      default:
        errorText.value = 'An unexpected error occurred. Please try again later.'
    }
    return
  }
  boardingPasses.value = await res.json()
}
</script>

<template>
  <main class="container">
    <h1>Ryanair Boarding Pass Extractor</h1>
    <div>Please enter your booking reference and the email associated with your booking.</div>
    <br>
    <form @submit="getBoardingPass">
      <input type="text" required v-model="data.pnr" placeholder="Booking Reference" maxlength="6" minlength="6" pattern="[A-Za-z0-9]{6}" />
      <input type="email" required v-model="data.email" placeholder="Email Address" />
      <button aria-label="Get Boarding Passes" type="submit">
        Get Boarding Passes
      </button>
    </form>
    <div v-if="boardingPasses.length" class="grid boarding-pass-list">
      <BoardingPass
        v-for="(bp, index) in boardingPasses"
        :key="index"
        :boardingPass="bp"
      />
    </div>
  </main>
</template>

<style scoped lang="scss">
.boarding-pass-list {
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
}
</style>