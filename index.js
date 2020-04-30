import React from "react";
import {
  FlagshipProvider as ReactFlagshipProvider,
  useFsModifications,
  useFsActivate,
  useFsSynchronize,
  useFlagship,
} from "@flagship.io/react-sdk";

import { generateFlagshipId, checkValidityPatternForEnvId } from "./FSTools";
import ErrorBoundary from "./ErrorBoundary";

const FlagshipProvider = ({ children, ...otherProps }) => {
  const {
    visitorData,
    envId,
    config,
    onInitStart,
    onInitDone,
    onError,
    loadingComponent,
  } = otherProps;

  /// Check the Envid
  if (!checkValidityPatternForEnvId(envId)) {
    console.log("Flagship sdk - The format of your EnvId is not valid");

    if (onError) {
      onError();
    }
    return <ErrorBoundary>{children}</ErrorBoundary>;
  }

  return (
    <ReactFlagshipProvider
      envId={envId}
      config={config}
      onInitStart={() => {
        console.log("Flagship SDK : Starting ....");

        if (onInitStart) {
          onInitStart();
        }
      }}
      onInitDone={() => {
        console.log("Flagship SDK : Init is Done");
        if (onInitDone) {
          onInitDone();
        }
      }}
      visitorData={{
        /// Check the visitor id is null ?
        id: visitorData.id == null ? generateFlagshipId() : visitorData.id,
        context: visitorData.context,
      }}
      loadingComponent={loadingComponent}
    >
      {children}
    </ReactFlagshipProvider>
  );
};

/// Activate
export { useFsActivate, useFsModifications, useFsSynchronize, useFlagship };

/// Provider
export default FlagshipProvider;
