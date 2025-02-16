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
          :href="`https://github.com/lyfeblocnetwork/lyfebloc-core/releases/tag/${mochaVersions['node-latest-tag']}`"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{lyfebloctestnetVersions['node-latest-tag'] }}
        </a>
      </td>
    </tr>
  </table>
</template>

<script>
importlyfebloctestnetVersions from "/.vitepress/constants/mocha_versions.js";
import constants from "/.vitepress/constants/constants.js";

export default {
  name: 'TestnetVersionTags',
  data() {
    return {
     lyfebloctestnetVersions,
      constants
    };
  }
}
</script>