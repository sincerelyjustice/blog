export const joinUrlPaths = (path1, path2) => {
  const gotTrailingSlash = path1.endsWith('/');
  const gotLeadingSlash = path2.startsWith('/');
  if (gotTrailingSlash && gotLeadingSlash) {
    return `${path1}${path2.slice(1)}`;
  } else if (!gotTrailingSlash && !gotLeadingSlash) {
    return `${path1}/${path2}`;
  } else {
    return `${path1}${path2}`;
  }
};

export const addPlaceholderPathParams = (baseUrl, ...paramNames) => {
  const path = paramNames.map((name) => `:${name}`).join('/');
  const url = joinUrlPaths(baseUrl, path);
  return url;
};
