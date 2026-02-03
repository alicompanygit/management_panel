export interface IVideoConferenceLink {
  links: any[];
  reports: any[];
  isLoadingLinks: boolean;
  isLoadingReports: boolean;
  modals: any;
  linkType: any;
  linkTitle: string;
  adminJoinLink: string;
  total: number;
  totalReports: number;
  currentPage: number;
  isDownloading: boolean;
}
