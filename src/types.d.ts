export interface IInfoForm {
  title: string;
  content: string;
  category?: string;
}

export interface IInfo {
  id: string;
  title: string;
  content: string;
  category?: string;
}

export interface IInfoAPI {
  [id: string]: IInfo;
}
