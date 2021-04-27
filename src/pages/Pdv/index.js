import React, { useState } from "react";

import { 
	Layout,
	Button, 
	Row, 
	Col
} from 'antd';
import {
  PlusOutlined
} from '@ant-design/icons';
import 'antd/dist/antd.css';
import '../../global.css';

import HeaderSite from "../../components/Header";
import MenuSite from "../../components/Menu";
import FooterSite from "../../components/Footer";

const { Content } = Layout;

function Pdv() {
	const [expand, setExpand] = useState(false);

	return (
		<div>
			<Layout>
				<MenuSite open={expand} />
		        <Layout className="site-layout">
		          <HeaderSite title={'Ponto de venda'} isListView={true} expandMenu={expand} updateExpandMenu={() => setExpand(!expand)} />
		          <Content className="container-main">
		            

		          </Content>
		          <FooterSite />
		        </Layout>
	      	</Layout>
  		</div>
  	);
}

export default Pdv;
