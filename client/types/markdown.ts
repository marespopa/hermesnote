export type BacklogFile = {
  slug?: string;
  frontMatter: { [key: string]: any };
  content: string;
};

export type FrontMatterGeneric = { [key: string]: any };

export type BacklogFileDescription = {
  slug?: string;
  frontMatter: FrontMatterGeneric;
};

export type FileMetadata = {
  title: string;
  description: string;
  tags: string;
};
