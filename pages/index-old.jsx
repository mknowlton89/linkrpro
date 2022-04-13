import HomeNav from '../components/HomeNav';
import ProductCard from '../components/ProductCard';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

// This is just temporary - eventually this page will be the homepage. Doing this just for demos

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
