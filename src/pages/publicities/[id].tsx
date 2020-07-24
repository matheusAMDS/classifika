import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { PageHeader, Descriptions, Carousel, Tabs } from 'antd' 
import { ObjectId } from 'mongodb'

import AppLayout from 'components/AppLayout'

import { dbConnection } from 'middlewares/database'
import { Publicity } from 'services/Publicity'
import publicityDetails from 'styles/publicity-details.module.css'

interface Props {
  publicity: Publicity;
}

export const getStaticPaths:GetStaticPaths = async () => {
  const db = await dbConnection()
  const publicities = await db.collection('publicities').find()
  const paths = await publicities.map(publicity => ({
    params: {
      id: String(publicity._id)
    }
  })).toArray()

  return {
    paths,
    fallback: true
  }
}

export const getStaticProps:GetStaticProps = async ({ params }) => {
  const id = params.id as string
  const db = await dbConnection()
  const publicity = await db.collection('publicities').findOne({ _id: new ObjectId(id) })
  const byUser = await db.collection('users').findOne({ _id: new ObjectId(publicity.byUser) })
  const serializedPublicity = {
    ...publicity,
    _id: id,
    byUser: {
      ...byUser,
      _id: String(byUser._id)
    }
  }
  
  return {
    props: {
      publicity: serializedPublicity
    }
  }
}

const PublicityDetail:React.FC<Props> = ({ publicity }) => {
  const router = useRouter()

  return (
    <AppLayout title={`Classifika | ${publicity && publicity.title}`}>
      { publicity && (
        <div className={publicityDetails.container}>
          <PageHeader
            ghost={false}
            onBack={() => router.back()}
            title={publicity.title}
            subTitle={publicity.category}
          >
            <Descriptions column={3} >
              <Descriptions.Item label="Publicado por">
                {publicity.byUser && publicity.byUser.name}
              </Descriptions.Item>
              <Descriptions.Item label="Whatsapp">
                {publicity.whatsapp}
              </Descriptions.Item>
              <Descriptions.Item label="Email">
                {publicity.byUser && publicity.byUser.email}
              </Descriptions.Item>
            </Descriptions>
          </PageHeader>
          <div className={publicityDetails.main}>
            <Tabs defaultActiveKey="description">
              <Tabs.TabPane tab="Descrição" key="description">
                <p>{publicity.description}</p>
              </Tabs.TabPane>
              <Tabs.TabPane tab="Galeria" key="gallery">
                <Carousel autoplay>
                {publicity.gallery && publicity.gallery.map((image, index) => (
                  <img 
                    key={index}
                    className={publicityDetails.thumbnail}
                    src={image}
                    alt={publicity.title}
                  />
                ))}
                </Carousel>
              </Tabs.TabPane>
            </Tabs>
          </div>
        </div>
      )}
    </AppLayout>
  )
}

export default PublicityDetail