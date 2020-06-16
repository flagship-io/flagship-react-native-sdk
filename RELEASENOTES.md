# Flagship REACT NATIVE SDK - Release notes

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
