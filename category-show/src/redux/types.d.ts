export interface ICart {
  name: string;
  id: string;
  quantity:number;
}

export interface ICartActionModel {
  type: string;
  payload: ICart | any;
}