export function pushToDataLayer(data: Object) {
  if (typeof window !== "undefined") {
    if (!("dataLayer" in window)) {
      window.dataLayer = [];
    }
    window.dataLayer?.push(data);
  }
}
