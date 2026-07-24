/**
 * Utility helper to build URL string with updated query parameters
 */
export function buildUrlWithParams(
  basePath: string,
  existingParams: Record<string, any> = {},
  updates: Record<string, string | number | undefined | null> = {}
): string {
  const params = new URLSearchParams();

  // Copy existing non-empty params
  Object.entries(existingParams).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      params.set(key, String(value));
    }
  });

  // Apply updates
  Object.entries(updates).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') {
      params.delete(key);
    } else {
      params.set(key, String(value));
    }
  });

  const queryString = params.toString();
  return queryString ? `${basePath}?${queryString}` : basePath;
}
