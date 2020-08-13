import { GetStaticPaths, GetStaticProps } from 'next'
import { Descriptions, Carousel, Typography, Space } from 'antd' 
import { ObjectId } from 'mongodb'

import AppLayout from 'components/AppLayout'

import { dbConnection } from 'lib/database'
import { Publicity } from 'services/Publicity'
import styles from 'styles/publicity-details.module.css'

interface Props {
  publicity: Publicity;
}

const { Title, Paragraph, Text } = Typography

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
  return (
    <AppLayout title={`Classifika | ${publicity && publicity.title}`}>
      { publicity && (
        <div className={styles.container}>
          <Space direction="vertical" className={styles.main}>
            <Typography className={styles.typography}>
              <Title className={styles.title}>
                {publicity.title}
              </Title>

              <Text className={styles.category}>
                {publicity.category}
              </Text>

              <Title level={3}>Info</Title>
              <Descriptions>
                <Descriptions.Item label="Enviado por">
                  {publicity.byUser.name}
                </Descriptions.Item>
                <Descriptions.Item label="Email">
                  {publicity.byUser.email}
                </Descriptions.Item>
                <Descriptions.Item label="WhatsApp">
                  {publicity.whatsapp}
                </Descriptions.Item>
              </Descriptions>

              <Title level={3}>Descrição</Title>
              <Paragraph ellipsis={{ rows: 5, expandable: true, symbol: 'ler mais' }}>
                {publicity.description}
              </Paragraph>

              { publicity.gallery && publicity.gallery.length !== 0 && (
                <>
                  <Title level={3}>Galeria</Title>
                  <Carousel autoplay className={styles.carousel}> 
                    { publicity.gallery.map((image, index) => (
                      <div key={index}>
                        <img 
                          src={image} 
                          alt={publicity.title} 
                          className={styles.thumbnail} 
                        />
                      </div>      
                    ))}
                  </Carousel>
                </>
              )}
            </Typography>
          </Space>
        </div>
      )}
    </AppLayout>
  )
}

export default PublicityDetail