interface Entry {
  updated: {
    $t: string;
  };
  title: {
    type: string;
    $t: string;
  };
  content: {
    type: string;
    $t: string;
  };
}

/**
 * JSONP response from Blogger feed.
 * See: https://developers.google.com/gdata/docs/json
 */
export interface BloggerFeed {
  feed: {
    entry: Entry[];
  };
}
