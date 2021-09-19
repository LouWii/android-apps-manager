# Android Apps Manager

## Requirements

`adb` command ([doc](https://developer.android.com/studio/command-line/adb))

Check status of [this issue](https://github.com/DeviceFarmer/adbkit-monkey/pull/53) so we can use [adbkit](https://www.npmjs.com/package/@devicefarmer/adbkit) to run adb commands. In the meantime, [temporary fix](https://github.com/openstf/adbkit/issues/44#issuecomment-469726755)

## Device info

Using [this package](https://www.npmjs.com/package/android-device-list) which is manually updated. Might need to follow up to make sure it always contain new models.

## Dev

`npm install`

`npm run watch`

## UI

I'd love to use Vuetify but it's not release for Vue 3 [yet](https://next.vuetifyjs.com/en/introduction/roadmap/#v3-0-titan) :(