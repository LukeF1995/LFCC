export interface IComments {
  id: number;
  by: string;
  parent: number;
  text: string;
  time: number;
  type: string;
  kids?: number[];
}
