import clientPromise from '../lib/mongodb'
import { useUser } from '@auth0/nextjs-auth0'
import CampaignBuilder from '../components/CampaignBuilder'
import TopNav from '../components/TopNav'
import LoginRequired from '../components/LoginRequired';
import { StyledLoading } from '../styles/StyledComponents';

export default function Home({ isConnected }) {
  const { user, isLoading, error } = useUser();

  const goToLogin = () => {
    router.push('api/auth/login')
  }

  if (isLoading) return <StyledLoading><div>Loading...</div></StyledLoading>;
  if (error) return <div>{error.message}</div>;

  return (
    user ? (
      <>
        <TopNav />
        <CampaignBuilder />
        {/* <LinkHistory /> */}
      </>
    ) :
      <LoginRequired />
  )
}

export async function getServerSideProps(context) {
  const client = await clientPromise

  // client.db() will be the default database passed in the MONGODB_URI
  // You can change the database by calling the client.db() function and specifying a database like:
  // const db = client.db("myDatabase");
  // Then you can execute queries against your database like so:
  // db.find({}) or any of the MongoDB Node Driver commands

  const isConnected = await client.isConnected()

  return {
    props: { isConnected },
  }
}
