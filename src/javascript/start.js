export function start() {
  console.clear();
  const featureName = 'extended-summary';
  const feature = new Feature();
  // const extendedSummaryEnabled = await feature.getFeatureState(featureName);
  // console.log({ extendedSummaryEnabled });
  feature.getFeatureState(featureName).then((extendedSummaryEnabled) => {
    console.log({ extendedSummaryEnabled });
  });
  feature.getFeatureState('feedback-dialog').then((feedbackDialogEnabled) => {
    console.log({ feedbackDialogEnabled });
  });
  // await new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve();
  //   }, 2000);
  // });
  // const feedbackDialogEnabled = await feature.getFeatureState(
  //   'feedback-dialog'
  // );
  // console.log({ feedbackDialogEnabled });
  // feature.getFeatureState(featureName).then((enabled) => {
  //   console.log(enabled);
  // });
  // const features = ['extended-summary', 'feedback-dialog'];
  // Promise.all(features.map((feature) => getFeatureState(feature))).then(
  //   (enabled) => {
  //     console.log(enabled);
  //   }
  // );
}

/*

1. Not getting 20X 
2. Unexpected result type
3. Feature name not present in the object

 */

function fetchAllFeatures() {
  // in reality, this would have been a `fetch` call:
  // `fetch("/api/features/all")`
  return new Promise((resolve) => {
    console.log('featching all features');
    const sampleFeatures = {
      'extended-summary': true,
      'feedback-dialog': false,
    };
    setTimeout(resolve, 100, sampleFeatures);
  });
}

class Feature {
  featureEnabledMapping;
  requestInProgress = false;
  requestPromise;

  async getFeatureState(featureName, defaultValue = false) {
    if (this.featureEnabledMapping !== undefined) {
      return !!this.featureEnabledMapping[featureName];
    }
    if (!this.requestInProgress) {
      this.requestPromise = new Promise(async (resolve) => {
        try {
          this.requestInProgress = true;
          this.featureEnabledMapping = await fetchAllFeatures();
          this.requestInProgress = false;
          resolve();
          return !!this.featureEnabledMapping[featureName];
        } catch (e) {
          // log the error
          this.requestInProgress = false;
          return defaultValue;
        }
      });
    }
    await this.requestPromise;
    return !!this.featureEnabledMapping[featureName];
    // return getFeatureState(featureName, defaultValue);
  }
}

/** @param {string} featureName */
function getFeatureState(featureName, defaultValue = false) {
  return fetchAllFeatures()
    .then((features) => {
      if (typeof features !== 'object') {
        // log "unexpected type"
        return defaultValue;
      }
      const featureEnabled = features[featureName];
      if (featureEnabled === undefined) {
        // log "bad feature"
        return defaultValue;
      }
      if (typeof featureEnabled !== 'boolean') {
        // log "bad response type"
        return defaultValue;
      }
      return featureEnabled;
    })
    .catch((error) => {
      // log something
      return defaultValue;
    });
}

// src/feature-x/summary.js
// getFeatureState('extended-summary').then(function (isEnabled) {
//   if (isEnabled) {
//     showExtendedSummary();
//   } else {
//     showBriefSummary();
//   }
// });
// // src/feature-y/feedback-dialog.js
// getFeatureState('feedback-dialog').then(function (isEnabled) {
//   if (isEnabled) {
//     makeFeedbackButtonVisible();
//   }
// });
