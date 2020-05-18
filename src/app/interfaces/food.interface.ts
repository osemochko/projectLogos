export interface IDish {
    id: number;
    group: string;
    nameDish: string;
    img: string;
    exitDish: number;
    description: string;
    price: number;
    available: boolean;
}

export interface ICart {
    dish: IDish;
    quantity: number;
  }

export interface ICartResponse{
    basket: ICart[];
  }

