import HomeNav from '../components/HomeNav';
import ProductCard from '../components/ProductCard';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

export default function Home() {

  const goToLogin = () => {
    router.push('api/auth/login')
  }

  return (
    <>
      <HomeNav />
      <h1>Hello from home</h1>
      <ProductCard />
    </>
  )
}
