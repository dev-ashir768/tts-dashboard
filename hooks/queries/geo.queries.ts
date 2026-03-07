import { getCountry } from "@/services/geo.service";
import { useQuery } from "@tanstack/react-query";

export const useGeoQuery = {
  GetCountry: () => {
    return useQuery({
      queryKey: ["geo", "country"],
      queryFn: async () => {
        const data = await getCountry();
        return data;
      },
      staleTime: Infinity,
      retry: 2,
    });
  },
};
