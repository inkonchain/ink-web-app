/**
 * Change the value here to enable/disable a feature flag.
 * You can then use `OnlyWithFeatureFlag`
 */
export const hardcodedFeatureFlags = {
  landingPageV2: false,
  morpheus: false,
  experimental: false,
  language: false,
  mainnet: true,
  prefillAppSubmission: false,
  publicRepo: false,
  fakeEvents: 0,
  verifyPage: false,
  newNav: false,
};

export type FeatureFlagKey = keyof typeof hardcodedFeatureFlags;

export function getFeatureFlags() {
  return {
    ...hardcodedFeatureFlags,
  };
}
