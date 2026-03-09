import OrderList from "@/features/order/order-list";

export const metadata = {
  title: "Orders List | TTS Dashboard",
  description: "View and manage your order history",
};

export default function OrderHistoryPage() {
  return <OrderList />;
}
