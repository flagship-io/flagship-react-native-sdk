# Flagship REACT NATIVE SDK - Release notes

## ➡️ Version 2.0.0

### Breaking changes ⚠️

-   `config` prop is not supported anymore.

### New features 🎉

-   Now supports Bucketing behavior:
    -   `decisionMode` prop added, value is either "API" or "Bucketing".
    -   `pollingInterval` prop added, value is a number. Must be specified when `decisionMode=Bucketing`.

## ➡️ Version 1.1.0

### New features 🎉

-   `onUpdate` prop's first argument, has a new attribute `config`. It gives you ability to check current React SDK config during an update.

-   useFlagship hook now returns a new node `getModificationInfo`.

### Breaking changes ⚠️

-   When sending a hit "Item", the attribute `ic`(="item code") is now **required** (was optional before). If you do not specify it, the hit won't be send and an error log will be display.

-   Safe mode is now disable by default because we're working on some improvements. You can still give it a try by enabling it with:

```
<FlagshipProvider
    enableSafeMode={true}
/>
```
