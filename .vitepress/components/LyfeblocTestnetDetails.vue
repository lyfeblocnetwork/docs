<template>
  <table>
    <tr>
      <th>Detail</th>
      <th>Value</th>
    </tr>
    <tr>
      <td>Chain ID</td>
      <td><code>{{ constants.testnetChainId }}</code></td>
    </tr>
    <tr>
      <td>Genesis hash</td>
      <td><code>B93BBE20A0FBFDF955811B6420F8433904664D45DB4BF51022BE4200C1A1680D</code></td>
    </tr>
    <tr>
      <td>Genesis file</td>
      <td>
        <a 
          :href="`https://github.com/lyfeblocnetwork/networks/blob/master/${constants.testnetChainId}/genesis.json`"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://github.com/lyfeblocnetwork/networks/blob/master/{{constants.testnetChainId}}/genesis.json
        </a>
      </td>
    </tr>
    <tr>
      <td>Peers file</td>
      <td>
        <a 
          :href="`https://github.com/lyfeblocnetwork/networks/blob/master/${constants.testnetChainId}/peers.txt`"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://github.com/lyfeblocnetwork/networks/blob/master/{{constants.testnetChainId}}/peers.txt
        </a>
      </td>
    </tr>
      <tr>
      <td>Validators</td>
      <td>
        100
      </td>
    </tr>
  </table>
</template>

<script>
import constants from "/.vitepress/constants/constants.js";

export default {
  name: 'TestnetTestnetDetails',
  data() {
    return {
      constants
    };
  }
}
</script>