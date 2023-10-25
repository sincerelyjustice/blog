import { joinUrlPaths } from '@lib/web/url';
import theme from './theme.json';

export const getSiteTitle = () => theme.title;
export const getContactEmail = () => theme.contactEmail;

export const getHomePath = () => theme.pages.home.path;
export const getBlogBasePath = () => theme.pages.blog.basePath;
export const getBlogPathParamName = () => theme.pages.blog.pathParam;
export const getBlogPath = (path) =>
  joinUrlPaths(theme.pages.blog.basePath, path);
export const getNotFoundPath = () => theme.pages[404].path;

export const getLoadingMessage = () => theme.messages.loading;
export const getBlogsErrorMessage = () => theme.messages.blogsError;
export const getNotFoundMessage = () => theme.messages[404];
