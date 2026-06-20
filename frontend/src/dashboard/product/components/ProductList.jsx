import { SimpleGrid } from "@mantine/core"
//import { mockProducts } from "./data";
import ProductUiCard from "./ProductUiCard";
import { useGetProductsQuery } from "../../../../lib/features/product/productApiSlice";
import ProductLoading from "../../../components/ProductLoading";
import ErrorDisplay from "../../../components/ErrorDisplay";
const ProductList = ({ onEdit }) => {

  const { data: rawData, isLoading, error, refetch } = useGetProductsQuery();

  if (isLoading) return <ProductLoading />;
  if (error) {
  return (
    <ErrorDisplay 
      message={error.data?.message || "Failed to load products."} 
      onRetry={refetch}
    />
  );
}

  return (
      <SimpleGrid cols={{ base: 1, xs: 2, md: 3, lg: 4 }} spacing="sm">
          {rawData?.data?.map((item) => (
            <ProductUiCard key={item._id} product={item} onEdit={onEdit} />
          ))}
      </SimpleGrid>
  )
}

export default ProductList;