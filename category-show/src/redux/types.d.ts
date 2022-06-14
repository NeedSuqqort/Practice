export interface ICart {
  name: string;
  id: number;
}

export interface ICartActionModel {
  type: string;
  payload: ICart | any;
}