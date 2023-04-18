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

If your project does not have an `.env` file yet:

```bash
touch .env
```

Then, add the following content to your `.env` file:

```ini
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=
AWS_BUCKET=
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

If you are using a custom build output path, such as in the [Laravel Framework](https://github.com/laravel/laravel) where the build output is in the public folder, you can follow the example below:

```javascript
import path from "node:path"

export default {
  plugins: [
    cdnUploaderPlugin({
      provider: new providers.AwsS3Provider(),
      root: path.join(__dirname, 'public'),
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