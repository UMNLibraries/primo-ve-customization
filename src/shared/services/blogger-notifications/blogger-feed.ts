interface Entry {
  updated: {
    $t: string;
  },
  title: {
    type: string;
    $t: string;
  },
  content: {
    type: string;
    $t: string;
  }
}

export default interface BloggerFeed {
  feed: {
    entry: Entry[]
  } 
}
