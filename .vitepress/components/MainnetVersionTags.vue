<template>
  <table>
    <tr>
      <th>Software</th>
      <th>Version</th>
    </tr>
    <tr>
      <td>lyfebloc-core</td>
      <td>
        <a 
          :href="`https://github.com/lyfeblocnetwork/lyfebloc-core/releases/tag/${mainnetVersions['node-latest-tag']}`"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ mainnetVersions['node-latest-tag'] }}
        </a>
      </td>
    </tr>
  </table>
</template>

<script>
import mainnetVersions from "/.vitepress/constants/mainnet_versions.js";
import constants from "/.vitepress/constants/constants.js";

export default {
  name: 'MainnetVersionTags',
  data() {
    return {
      mainnetVersions,
      constants
    };
  }
}
</script>