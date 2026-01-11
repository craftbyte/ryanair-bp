<script setup lang="ts">
import googleWalletBadge from '../assets/google-wallet.svg'
import appleWalletBadge from '../assets/apple-wallet.svg'
import type { BoardingPassType } from '../types/api'
defineProps<{
  boardingPass: BoardingPassType
}>()
const googleWallet = async (boardingPass: BoardingPassType) => {
    let response = await fetch('/google-wallet-pass', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            recordLocator: boardingPass.pnr,
            sequenceNumber: boardingPass.sequence,
            isInfant: boardingPass.paxType === 'INF',
            departureStation: boardingPass.departure.code,
            arrivalStation: boardingPass.arrival.code,
            lang: 'en'
        })
    });
    let json = await response.json();
    let token = json['Token'];
    let url = `https://pay.google.com/gp/v/save/${token}`;
    window.open(url, '_blank');
}
const appleWallet = async (boardingPass: BoardingPassType) => {
    let response = await fetch('/apple-wallet-pass', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            recordLocator: boardingPass.pnr,
            sequenceNumber: boardingPass.sequence,
            isInfant: boardingPass.paxType === 'INF',
            departureStation: boardingPass.departure.code,
            arrivalStation: boardingPass.arrival.code,
            lang: 'en'
        })
    });
    let blob = await response.blob();
    blob = new Blob([blob], { type: 'application/vnd.apple.pkpass' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `boarding-pass-${boardingPass['pnr']}-${boardingPass['departure'].code}-${boardingPass['arrival'].code}-${boardingPass['sequence']}.pkpass`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
}
</script>

<template>
    <article>
        <h2>Boarding Pass</h2>
        <div v-if="boardingPass">
        <p><strong>Passenger Name:</strong> {{ boardingPass.name.title }} {{ boardingPass.name.first }} {{ boardingPass.name.last }}</p>
        <p><strong>Flight Number:</strong> {{ boardingPass.flight.label }}</p>
        <p><strong>Departure:</strong> {{ boardingPass.departure.name }} ({{ boardingPass.departure.code }})</p>
        <p><strong>Arrival:</strong> {{ boardingPass.arrival.name }} ({{ boardingPass.arrival.code }})</p>
        <p><strong>Seat:</strong> {{ boardingPass.seat.designator }} ({{ boardingPass.seat.location }})</p>
        <div class="wallet-buttons">
            <a @click="googleWallet(boardingPass)" class="wallet-button"><img :src="googleWalletBadge" alt="Add to Google Wallet"></a>
            <a @click="appleWallet(boardingPass)" class="wallet-button"><img :src="appleWalletBadge" alt="Add to Apple Wallet"></a>
        </div>
        </div>
        <div v-else>
        <p>No boarding pass data available.</p>
        </div>
    </article>
</template>

<style scoped lang="scss">
    .wallet-button {
        margin-right: 1em;
        cursor: pointer;
        img {
            height: 2.4em;
        }
    }
    .wallet-buttons {
        display: flex;
        :first-child {
            margin-left: auto;
        }
        :last-child {
            margin-right: auto;
        }
    }
</style>