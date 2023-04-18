# Vite CDN Uploader Plugin 🚀

The Vite CDN Uploader Plugin is a handy utility to automatically upload build files from Vite projects to various CDN providers. It currently supports Amazon S3 and Custom Providers.

## Installation 💻

Install the plugin via npm or yarn:

```bash
npm install --save-dev vite-cdn-uploader
```

or

```bash
yarn add -D vite-cdn-uploader
```

## Usage 🛠

First, import the plugin in your Vite configuration file:

```javascript
import { cdnUploaderPlugin, providers } from "vite-cdn-uploader"
```

Then, add the plugin to the `plugins` array in your Vite configuration:

```javascript
export default {
  plugins: [
    cdnUploaderPlugin({
      provider: new providers.AwsS3Provider(),
    }),
  ],
};
```

### Custom Provider 🎛

Create a custom provider by defining a class with a `config` method and an `upload` method:

```javascript
class CustomProvider {
    config() {
        // Provider Configs
        return {};
    }
    async upload(file, filePath) {
        // Upload Process
    }
}
```

### Vite Configuration 📝

Include your custom provider in your Vite configuration:

```javascript
export default {
  plugins: [
    cdnUploaderPlugin({
      provider: new CustomProvider(),
    }),
  ],
};
```

## License 📄

MIT