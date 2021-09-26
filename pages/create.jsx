import clientPromise from '../lib/mongodb'
import { useUser } from '@auth0/nextjs-auth0'
import CampaignBuilder from '../components/CampaignBuilder'
import TopNav from '../components/TopNav'
import LoginRequired from '../components/LoginRequired';
import { StyledLoading } from '../styles/StyledComponents';

export default function create() {
  const { user, isLoading, error } = useUser();

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

  const isConnected = await client.isConnected()

  return {
    props: { isConnected },
  }
}
