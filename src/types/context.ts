import { ToastMessage, Warning } from "./components";
import { BasketItem, User } from "./global";

export type AppContextProps = {
  isLoggedIn: boolean;
  pushToast: (toastMessage: ToastMessage) => void;
  showWarning: (warning: Warning) => void;
  user?: User
}

export type ShopContextProps = {
  search: string,
  setSearch: React.Dispatch<React.SetStateAction<string>>
  basket: BasketItem[];
  pushToCart: ({ id, quantity, title, price }: { id: number, quantity?: number, title: string, price: number }) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  cleanCart: () => void;
}