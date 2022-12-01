import React from 'react';
import { Breadcrumb, Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';

const { Header, Content, Footer } = Layout;
const LayoutW = ({ children }) => {


    return (
        <Layout className="layout"
            style={{
                // textAlign: 'center',
                marginTop: 'auto',
                minHeight: '98vh'
            }}
        >
            <Header className="header"
                style={{
                    // textAlign: 'center',
                    display: 'flex',
                    justifyContent: 'flex-start'

                }}
            >
                <Link to='/appointment/' style={{ color: 'white', fontSize: '2rem' }}>Make Appointment</Link>

            </Header>
            <Content
                style={{
                    marginTop: "2rem",
                    padding: '0 50px',
                }}
            >

                <div className="site-layout-content">{children}</div>

            </Content>
            <Footer
                style={{
                    textAlign: 'center',
                    marginTop: 'auto'
                }}
            >
                SWE
            </Footer>
        </Layout>
    )
};
export default LayoutW;