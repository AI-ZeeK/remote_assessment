export interface NavTypes {
  id: string;
  head: string;
  link: string;
}

export interface footerTypes {
  id: string;
  head: string;
  links: linkTypes[];
}
export interface linkTypes {
  id: string;
  desc: string;
  link: string;
}

