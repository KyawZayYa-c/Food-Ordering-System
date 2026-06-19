import { SimpleGrid } from "@mantine/core"
import { mockProducts } from "./data";
import ProductUiCard from "./ProductUiCard";

const ProductList = ({onEdit}) => {
  return (
      <SimpleGrid cols={{ base: 1, xs: 2, md: 3, lg: 4 }} spacing="sm">
          {mockProducts.map((item) => (
            <ProductUiCard key={item._id} product={item} onEdit={onEdit} />
            ))}
      </SimpleGrid>
  )
}

export default ProductList;