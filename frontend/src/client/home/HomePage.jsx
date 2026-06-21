import { Container} from '@mantine/core';
import ProductList from '../../dashboard/product/components/ProductList';
import HeroSlider from './components/HeroSlider';

export default function CustomerHome() {
  return (
    <Container size="xl" py="md">
      <HeroSlider />
      <ProductList />
    </Container>
  );
}