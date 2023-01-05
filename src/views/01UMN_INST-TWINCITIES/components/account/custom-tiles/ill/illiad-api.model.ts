export interface IlliadTransaction {
  TransactionNumber: number;
  PhotoArticleTitle?: string;
  PhotoArticleAuthor?: string;
  LoanTitle?: string;
  LoanAuthor?: string;
}

export interface IlliadApiResponse extends Array<IlliadTransaction> {}

export interface NormalizedIllTransaction {
  txnNum: number;
  title: string;
  author: string;
}
