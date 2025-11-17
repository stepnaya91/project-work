import { Profile } from "src/store/types/Profile";

export type Order = {
  id: string;
  products: OrderProduct[];
  user: Profile;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
  commandId: string;
};
