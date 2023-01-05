export interface BrowzineSettings {
  api: string;
  apiKey: string;
  journalCoverImagesEnabled: boolean;
  journalBrowZineWebLinkTextEnabled: boolean;
  journalBrowZineWebLinkText: string;
  articleBrowZineWebLinkTextEnabled: false;
  articleBrowZineWebLinkText: string;
  articlePDFDownloadLinkEnabled: boolean;
  articlePDFDownloadLinkText: string;
  articleLinkEnabled: boolean;
  articleLinkText: string;
  printRecordsIntegrationEnabled: boolean;
  unpaywallEmailAddressKey: string;
  articlePDFDownloadViaUnpaywallEnabled: boolean;
  articlePDFDownloadViaUnpaywallText: string;
  articleLinkViaUnpaywallEnabled: boolean;
  articleLinkViaUnpaywallText: string;
  articleAcceptedManuscriptPDFViaUnpaywallEnabled: boolean;
  articleAcceptedManuscriptPDFViaUnpaywallText: string;
  articleAcceptedManuscriptArticleLinkViaUnpaywallEnabled: boolean;
  articleAcceptedManuscriptArticleLinkViaUnpaywallText: string;
}
