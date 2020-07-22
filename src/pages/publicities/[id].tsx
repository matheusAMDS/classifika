import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { PageHeader, Descriptions, Carousel, Tabs } from 'antd' 

import AppLayout from 'components/AppLayout'

import PublicityService, { Publicity } from 'services/Publicity'
import publicityDetails from 'styles/publicity-details.module.css'

interface Props {
  publicity: Publicity;
}

export const getStaticPaths:GetStaticPaths = async () => {
  const paths = await PublicityService.paths()

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps:GetStaticProps = async ({ params }) => {
  const result = await PublicityService.show(params.id as string)
  const publicity = result.data
  
  return {
    props: {
      publicity
    }
  }
}

const PublicityDetail:React.FC<Props> = ({ publicity }) => {
  const router = useRouter()

  return (
    <AppLayout>
      <div className={publicityDetails.container}>
        <PageHeader
          ghost={false}
          onBack={() => router.back()}
          title={publicity.title}
          subTitle={publicity.category}
        >
          <Descriptions column={3} >
            <Descriptions.Item label="Publicado por">
              {publicity.byUser.name}
            </Descriptions.Item>
            <Descriptions.Item label="Whatsapp">
              {publicity.whatsapp}
            </Descriptions.Item>
            <Descriptions.Item label="Email">
              {publicity.byUser.email}
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
    </AppLayout>
  )
}

export default PublicityDetail