# Contributing to Flagship - REACT NATIVE SDK

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

## Pull Request Process

// TODO

## Create a .apk file

Troubleshoot:

1.  [Resource and asset merger: Duplicate resources app:mergeReleaseResources](https://github.com/facebook/react-native/issues/22234#issuecomment-437812451)

2.  Add exactly this:

    ```
    doLast {
                    def moveFunc = { resSuffix ->
                        File originalDir = file("$buildDir/generated/res/react/release/drawable-${resSuffix}");
                        if (originalDir.exists()) {
                            File destDir = file("$buildDir/../src/main/res/drawable-${resSuffix}");
                            ant.move(file: originalDir, tofile: destDir);
                        }
                    }
                    moveFunc.curry("ldpi").call()
                    moveFunc.curry("mdpi").call()
                    moveFunc.curry("hdpi").call()
                    moveFunc.curry("xhdpi").call()
                    moveFunc.curry("xxhdpi").call()
                    moveFunc.curry("xxxhdpi").call()
                    moveFunc.curry("raw").call()
                    // moveFunc.curry("values").call()
                    // moveFunc.curry("mipmap").call()
                }
    ```

3.  Run:

    ```
    react-native run-android --variant=release

    ```

4.  The .apk is located in **examples/react-native-cli-demo/android/app/build/outputs/apk/release**
