
import type { GetStaticProps, NextPage } from 'next'
import Header from '../components/layout/Header'
import ProductCard from '../components/product/ProductCard'

export interface HomeProps {
  products: any
}
const Home = ({ products }: HomeProps) => {
  console.log(products);

  return (
    <>
      <Header></Header>
      <main className='page-main'>
        <div className="product-block flex">
          {
            products.map((product: any) =>
              <ProductCard key={product.id} product={product}></ProductCard>
            )
          }

        </div>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch('https://dummyjson.com/products/')
  const data = (await res.json());
  return {
    props: {
      products: data.products
    }
  }
}

export default Home
