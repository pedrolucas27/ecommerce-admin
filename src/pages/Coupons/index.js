import React, { useState, useEffect } from "react";
import axios from "axios";

import { 
	Layout,
	Button,
	Form,
	Switch,
	Input,
	Row, 
	Col,
	Table,
	Tooltip,
	Drawer,
	message,
	Spin
} from 'antd';
import {
  DeleteOutlined,
  EditOutlined
} from '@ant-design/icons';
import 'antd/dist/antd.css';
import '../../global.css';

import HeaderSite from "../../components/Header";
import MenuSite from "../../components/Menu";
import FooterSite from "../../components/Footer";

const { Content } = Layout;
const { TextArea } = Input;

const BASE_URL = "http://localhost:4020/";

function Coupons() {
	const [expand, setExpand] = useState(false);
	const [expandEditRow, setExpandEditRow] = useState(false);
	const [idUpdate, setIdUpdate] = useState(null);
	const [form] = Form.useForm();
	const [dataCoupons, setDataCoupons] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		axios.get(BASE_URL+"coupom").then((response) => {
			let array = [];
			response?.data.forEach((coupom) => {
				array.push({
					key: coupom?.id_coupom,
					code: coupom?.code,
					name: coupom?.name_coupom,
					description: coupom?.description || "-",
					value_discount: parseFloat(coupom?.value_discount),
					status: coupom?.is_active				
				})
			})
		  	setDataCoupons(array);
		}).catch((error) => {
			console.log("BUGOU: "+ error);
		});
		
	}, []);

	

	const columns = [
	  { title: 'Código', dataIndex: 'code', key: 'code' },
	  { title: 'Nome', dataIndex: 'name', key: 'name' },
	  { title: 'Descrição', dataIndex: 'description', key: 'description' },
	  { title: 'Valor do desconto (R$)', dataIndex: 'value_discount', key: 'value_discount' },
	  { 
	  	title: 'Status', 
	  	dataIndex: 'status', 
	  	key: 'status',
	  	render: (__, record) => {
	  		return(
	  			<div>
	  				{ record?.status ? "Ativo" : "Inativo" }
	  			</div>
	  		);
	  	} 
	  },
  	  {
	    title: 'Ações',
	    dataIndex: '',
	    key: 'x',
	    render: (__, record) => {
	    	return(
	    		<div>
	    			<Tooltip placement="top" title='Deletar cupom' onClick={() => deleteCoupom(record?.key)}>
	    				<DeleteOutlined className="icon-table" />
	    			</Tooltip>
	    			<Tooltip placement="top" title='Editar cupom'>
	    				<EditOutlined className="icon-table" onClick={() => setFildsDrawer(record?.key)} />
	    			</Tooltip>
	    		</div>
	    	)
	    },
  	  },
    ];


    const getCoupons = async () => {
    	axios.get(BASE_URL+"coupom").then((response) => {
			let array = [];
			response?.data.forEach((coupom) => {
				array.push({
					key: coupom?.id_coupom,
					code: coupom?.code,
					name: coupom?.name_coupom,
					description: coupom?.description || "-",
					value_discount: parseFloat(coupom?.value_discount),
					status: coupom?.is_active				
				})
			})
		  	setDataCoupons(array);
		}).catch((error) => {
			console.log("BUGOU: "+ error);
		});
    }


    const deleteCoupom = async (id) => {
    	setLoading(true);
    	
		await axios.delete(BASE_URL+"coupom/"+id).then(response => {
      		if(response?.status === 200){
				getCoupons();
				setLoading(false);
				message.success(response?.data?.message);
			}else{
				setLoading(false);
				message.error(response?.data?.message);
			}
    	}).catch(error => {
    		setLoading(false);
    		message.error(error);
    	});
    }

    const updateCoupom = async (values) => {
    	setLoading(true);
    	if(values?.name_coupom && values?.price){
			const response = await axios.put(BASE_URL+"coupom", 
				{
					id_coupom: idUpdate,  
				  	name_coupom: values?.name_coupom,
				  	description: values?.description,
				  	value_discount: parseFloat(values?.price),
				  	is_active: values?.is_active !== undefined ? values?.is_active:true,
				} 
			);
			
			if(response?.status === 200){
				getCoupons();
				setLoading(false);
				message.success(response?.data?.message);
				setExpandEditRow(!expandEditRow);
			}else{
				setLoading(false);
				message.error(response?.data?.message);
			}

		}else{
			setLoading(false);
			message.error("Informe os campos pedidos, por favor !");
		}

    }



    const setFildsDrawer = (id) => {
    	const line = dataCoupons?.filter((item) => item?.key === id)[0];
    	setIdUpdate(id);

    	form.setFieldsValue({
    		name_coupom: line?.name,
    		price: line?.value_discount,
    		is_active: line?.status,
    		description: line?.description
    	});

    	setExpandEditRow(!expandEditRow);
    }

	return (
		<div>
			<Spin size="large" spinning={loading}>
				<Layout>
					<MenuSite open={expand} />
			        <Layout className="site-layout">
			          <HeaderSite title={'Listagem de cupons'} isListView={true} expandMenu={expand} updateExpandMenu={() => setExpand(!expand)} />
			          <Content className="container-main">
			            <Table
			              size="middle"
						  columns={columns}
						  dataSource={dataCoupons}
						/>
			          </Content>
			          <FooterSite />
			        </Layout>
		      	</Layout>

		      	<Drawer
		          	title="Editar cupom"
		          	width={720}
		          	onClose={() => setExpandEditRow(!expandEditRow)} 
		          	visible={expandEditRow}
		          	bodyStyle={{ paddingBottom: 80 }}>

						<Form layout="vertical" form={form} onFinish={updateCoupom}>   			  
					        <Row gutter={[8, 0]}>

						      <Col span={16}>
								<Form.Item label="Nome" name="name_coupom">
						          <Input className="input-radius" />
						        </Form.Item>
						      </Col>

						      <Col span={4}>
								<Form.Item label="Valor (R$)" name="price">
						          <Input className="input-radius" />
						        </Form.Item>
						      </Col>

						      <Col span={4}>
								<Form.Item label="Status" name="is_active">
						          <Switch defaultChecked />
						        </Form.Item>
						      </Col>

						      <Col span={24}>
						      	<Form.Item label="Descrição" name="description">
						      	  <TextArea rows={4} className="input-radius"/>
						        </Form.Item>
						      </Col>
						      

						      <Col span={24}>
						      	<Button onClick={() => form.submit()} shape="round" className="button ac">
							       Editar
							    </Button>
								<Button onClick={() => {form.resetFields()}} shape="round" className="button-cancel ac">
							       Cancelar
							    </Button>
						      </Col>

						    </Row>
				      	</Form>
		          	
	            </Drawer>
			</Spin>
  		</div>
  	);
}

export default Coupons;