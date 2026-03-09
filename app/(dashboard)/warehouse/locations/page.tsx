import WarehouseList from "@/features/warehouse/warehouse-list";

export const metadata = {
  title: "Location Mapping | TTS Dashboard",
  description: "View and manage your warehouse mappings",
};

export default function WarehouseLocationsPage() {
  return <WarehouseList />;
}
