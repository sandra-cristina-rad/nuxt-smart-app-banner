<script setup lang="ts">
import { useSmartAppBanner } from "../composables/useSmartAppBanner";
import { defineEmits } from "vue";
import { SmartAppBannerNotShownReason, SmartAppBannerPlatform } from "../types";

const emit = defineEmits<{
  (
    event: "onNotShown",
    platform: SmartAppBannerPlatform,
    appId: string,
    reason: SmartAppBannerNotShownReason
  ): void;
  (event: "onShown", platform: SmartAppBannerPlatform, appId: string): void;
  (event: "onInstall", platform: SmartAppBannerPlatform, appId: string): void;
  (event: "onDismiss", platform: SmartAppBannerPlatform, appId: string): void;
}>();

const {
  author,
  buttonText,
  title,
  dismissClick,
  iconStyle,
  inStoreText,
  installClick,
  mainContainerClass,
  showBanner,
  storeLink,
} = useSmartAppBanner(emit);
</script>

<template>
  <div v-cloak v-if="showBanner" :class="showBanner ? 'smartbanner-show' : ''">
    <div :class="mainContainerClass">
      <div class="smartbanner-container">
        <span class="smartbanner-close" @click="dismissClick">&times;</span>
        <span class="smartbanner-icon" :style="iconStyle" />
        <div class="smartbanner-info">
          <div class="smartbanner-title">
            {{ title }}
          </div>
          <div class="smartbanner-author">
            {{ author }}
          </div>
          <span class="smartbanner-instore"> {{ inStoreText }} </span>
        </div>
        <a :href="storeLink" class="smartbanner-button" @click="installClick">
          <span class="smartbanner-button-text">{{ buttonText }} </span>
        </a>
      </div>
    </div>
  </div>
  <p />
</template>

<style scoped>
.smartbanner-show {
  margin-top: 80px;
}

.smartbanner-show .smartbanner {
  display: block;
}

/** Default **/
.smartbanner {
  position: absolute;
  left: 0;
  top: 0;
  display: none;
  width: 100%;
  height: 80px;
  line-height: 80px;
  font-family: "Helvetica Neue", sans-serif;
  background: #f4f4f4;
  z-index: 9998;
  -webkit-font-smoothing: antialiased;
  overflow: hidden;
  -webkit-text-size-adjust: none;
}

.smartbanner-container {
  margin: 0 auto;
  white-space: nowrap;
}

.smartbanner-close {
  display: inline-block;
  vertical-align: middle;
  margin: 0 5px 0 5px;
  font-family: "ArialRoundedMTBold", Arial;
  font-size: 20px;
  text-align: center;
  color: #888;
  text-decoration: none;
  border: 0;
  border-radius: 14px;
  -webkit-font-smoothing: subpixel-antialiased;
}

.smartbanner-close:active,
.smartbanner-close:hover {
  color: #aaa;
}

.smartbanner-icon {
  display: inline-block;
  vertical-align: middle;
  width: 57px;
  height: 57px;
  margin-right: 12px;
  background-size: cover;
  border-radius: 10px;
}

.smartbanner-info {
  display: inline-block;
  vertical-align: middle;
  width: 44%;
  font-size: 11px;
  line-height: 1.2em;
  font-weight: bold;
}

.smartbanner-title {
  font-size: 13px;
  line-height: 18px;
}

.smartbanner-button {
  position: absolute;
  right: 20px;
  top: 0;
  bottom: 0;
  margin: auto 0;
  height: 24px;
  font-size: 14px;
  line-height: 24px;
  text-align: center;
  font-weight: bold;
  color: #6a6a6a;
  text-transform: uppercase;
  text-decoration: none;
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.8);
}

.smartbanner-button:active,
.smartbanner-button:hover {
  color: #aaa;
}

.smartbanner-button-text {
}

.smartbanner-button-text:active,
.smartbanner-button-text:hover {
}

/** iOS **/
.smartbanner-ios {
  background: #f4f4f4;
  background: linear-gradient(to bottom, #f4f4f4, #cdcdcd);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
  line-height: 80px;
}

.smartbanner-ios .smartbanner-close {
  border: 0;
  width: 18px;
  height: 18px;
  line-height: 18px;
  color: #888;
  text-shadow: 0 1px 0 white;
}

.smartbanner-ios .smartbanner-close:active,
.smartbanner-ios .smartbanner-close:hover {
  color: #aaa;
}

.smartbanner-ios .smartbanner-icon {
  background: rgba(0, 0, 0, 0.6);
  background-size: cover;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}

.smartbanner-ios .smartbanner-info {
  color: #6a6a6a;
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.8);
}

.smartbanner-ios .smartbanner-title {
  color: #4d4d4d;
  font-weight: bold;
}

.smartbanner-ios .smartbanner-button {
  padding: 0 10px;
  min-width: 10%;
  color: #6a6a6a;
  background: #efefef;
  background: linear-gradient(to bottom, #efefef, #dcdcdc);
  border-radius: 3px;
  box-shadow: inset 0 0 0 1px #bfbfbf, 0 1px 0 rgba(255, 255, 255, 0.6),
    0 2px 0 rgba(255, 255, 255, 0.7) inset;
}

.smartbanner-ios .smartbanner-button:active,
.smartbanner-ios .smartbanner-button:hover {
  background: #dcdcdc;
  background: linear-gradient(to bottom, #dcdcdc, #efefef);
}

.smartbanner-ios .smartbanner-button-text {
}

.smartbanner-ios .smartbanner-button-text:active,
.smartbanner-ios .smartbanner-button-text:hover {
}

/** Android **/
.smartbanner-android {
  background: #3d3d3d
    url(data:image/gif;base64,R0lGODlhCAAIAIABAFVVVf///yH5BAEHAAEALAAAAAAIAAgAAAINRG4XudroGJBRsYcxKAA7);
  box-shadow: inset 0 4px 0 #88b131;
  line-height: 82px;
}

.smartbanner-android .smartbanner-close {
  border: 0;
  width: 17px;
  height: 17px;
  line-height: 17px;
  margin-right: 7px;
  color: #b1b1b3;
  background: #1c1e21;
  text-shadow: 0 1px 1px #000;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.8) inset,
    0 1px 1px rgba(255, 255, 255, 0.3);
}

.smartbanner-android .smartbanner-close:active,
.smartbanner-android .smartbanner-close:hover {
  color: #eee;
}

.smartbanner-android .smartbanner-icon {
  background-color: transparent;
  box-shadow: none;
}

.smartbanner-android .smartbanner-info {
  color: #ccc;
  text-shadow: 0 1px 2px #000;
}

.smartbanner-android .smartbanner-title {
  color: #fff;
  font-weight: bold;
}

.smartbanner-android .smartbanner-button {
  min-width: 12%;
  color: #d1d1d1;
  padding: 0;
  background: none;
  border-radius: 0;
  box-shadow: 0 0 0 1px #333, 0 0 0 2px #dddcdc;
}

.smartbanner-android .smartbanner-button:active,
.smartbanner-android .smartbanner-button:hover {
  background: none;
}

.smartbanner-android .smartbanner-button-text {
  text-align: center;
  display: block;
  padding: 0 10px;
  background: #42b6c9;
  background: linear-gradient(to bottom, #42b6c9, #39a9bb);
  text-transform: none;
  text-shadow: none;
  box-shadow: none;
}

.smartbanner-android .smartbanner-button-text:active,
.smartbanner-android .smartbanner-button-text:hover {
  background: #2ac7e1;
}
</style>
