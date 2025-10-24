export interface IPosts {
  id: number;
  by: string;
  descendamts: number;
  score: number;
  time: number;
  title: string;
  type: string;
  url: string;
  kids?: number[];
}
