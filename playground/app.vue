<template>
  <div>
    Nuxt module playground!
  </div>
  <SmartAppBanner 
    @on-dismiss="handleOnDismiss"
    @on-install="handleOnInstall"
    @on-not-shown="handleOnNotShown"
    @on-shown="handleOnShown"
  />
</template>

<script setup>

const handleOnDismiss = (platform, appId) => {
  console.log(`handleOnDismiss ${platform} ${appId}`)
}
const handleOnInstall = (platform, appId) => {
  console.log(`handleOnInstall ${platform} ${appId}`)
}
const handleOnNotShown = (platform, appId, reason) => {
  console.log(`handleOnNotShown ${platform} ${appId} ${reason}`)
}
const handleOnShown = (platform, appId) => {
  console.log(`handleOnShown ${platform} ${appId}`)
}

</script>
