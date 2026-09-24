# QA Buddy Recorder — MVP

A Chrome/Edge Manifest V3 extension for recording manual QA reproduction steps in the QA Cat Buddy style.

## MVP scope

- start / pause / resume / stop a recording session
- record the current page when the session starts
- record clicks on buttons, links and other common interactive controls
- record that a form field changed without storing the typed value
- detect URL changes, including basic SPA navigation
- show a floating QA Buddy toolbar on the recorded tab
- persist the current session in `chrome.storage.local`
- keep up to 500 steps per session

## Privacy rule

Typed input values are intentionally not collected. The recorder stores only the field label/name/type and the action that happened.

## Build

```bash
cd extension
npm install
npm run build
```

The unpacked extension will be generated in:

```text
extension/dist
```

## Load in Chrome

1. Open `chrome://extensions`
2. Enable **Developer mode**
3. Choose **Load unpacked**
4. Select `extension/dist`
5. Open a normal http/https page
6. Open **QA Buddy Recorder** and click **Start recording**

## Next milestone

- screenshots per step
- network request capture and suspicious request filters
- console error capture
- generated bug report
- export to Markdown / JSON
- masking rules and per-domain privacy settings
